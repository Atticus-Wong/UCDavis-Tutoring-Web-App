import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { getDocs } from 'firebase/firestore';
import { serverBackupsCol } from '../utils/firebase';
import { useSelectedServer } from '../utils/atom';
// import { getUserServers } from '../pages/api/discord';
// import { useSession } from 'next-auth/react';


export default function ServerSelect() {
  const [selectedServer, setSelectedServer] = useSelectedServer();
  const [servers, setServers] = useState<Server[]>();
  //  const [userServers, setUserServers] = useState<Server[]>([]);
  // const { data: session } = useSession();
  /*
  useEffect(() => {
    if (session) {
      const fetchUserServers = async () => {
        try {
          const userServers = await getUserServers(session.accessToken as string);
          console.log('User Servers:', userServers);
        } catch (error) {
          console.error('Error fetching user servers:', error);
        }
        setUserServers(userServers);
      };

      fetchUserServers();
    }
  }, []);
  */
  useEffect(() => {
    const getFirebaseData = async () => {
      await getDocs(serverBackupsCol).then(snapshot => {
        const servers: Server[] = [];
        snapshot.docs.forEach(doc =>
          servers.push({
            id: doc.id,
            server: doc.data()
          })
        );
        setServers(servers);
        setSelectedServer(servers[0]);
      });
    };

    getFirebaseData();
  }, [setSelectedServer]);

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedServer(servers?.find(server => server.id === event.target.value));
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Server</InputLabel>
        {selectedServer && (
          <Select
            labelId="server-select-label"
            id="server-select"
            value={selectedServer.id}
            label="Server"
            onChange={handleChange}
          >
            {servers &&
              servers.map(server => (
                <MenuItem key={server.id} value={server.id}>
                  {server.server.serverName}
                </MenuItem>
              ))}
          </Select>
        )}
      </FormControl>
    </Box>
  );
}

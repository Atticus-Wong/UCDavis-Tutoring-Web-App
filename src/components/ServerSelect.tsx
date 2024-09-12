import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { getDocs } from 'firebase/firestore';
import { serverBackupsCol } from '../utils/firebase';
import { useSelectedServer } from '../utils/atom';
import axios from 'axios';
import { useSession } from 'next-auth/react';


export default function ServerSelect() {
  const { data: session, status } = useSession();
  const [userGuildIds, setUserGuildIds] = useState<string[]>();
  const [selectedServer, setSelectedServer] = useSelectedServer();
  const [firebaseServers, setFirebaseSetServers] = useState<Server[]>();
  const [filteredServers, setFilteredServers] = useState<Server[]>();

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
        setFirebaseSetServers(servers);
        setSelectedServer(servers[0])
      });
    };

    getFirebaseData();
  }, []);

  useEffect(() => {
    const getUserGuilds = async () => {
      try {
        if (!session) {
          return;
        }
        const response = await axios('/api/userServers', 
          {
            method: 'GET',
            headers: {
            Authorization: `Bearer ${session.accessToken}`,
            'Content-Type': 'application/json'
          }
        });
        setUserGuildIds(response.data);

      } catch (err) {
        console.error('test', err);
      }
    };

    getUserGuilds();
  }, [session]);

  useEffect(() => {
    if (!Array.isArray(userGuildIds) || userGuildIds.length === 0 || !firebaseServers) {
      return;
    }
    const serversWithBot: Server[] = firebaseServers.filter(server => 
      userGuildIds.includes(server.id)
    );
    setFilteredServers(serversWithBot)
    // setFilteredServers(serversWithBot);
    // if (!selectedServer || !serversWithBot.some(s => s.id === selectedServer.id)) {
    //   setSelectedServer(serversWithBot[0] || null);
    // }
  }, [userGuildIds, firebaseServers, selectedServer, setSelectedServer])

  useEffect(() => {
    console.log('userGuildIds:', userGuildIds);
    console.log('firebaseServers:', firebaseServers);
    console.log('filteredServers:', filteredServers);
  }, [userGuildIds, firebaseServers, filteredServers]);


  const handleChange = (event: SelectChangeEvent) => {
    setSelectedServer(firebaseServers?.find(server => server.id === event.target.value));
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
            {firebaseServers &&
              firebaseServers.map(server => (
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
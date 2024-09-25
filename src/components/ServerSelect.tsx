import { useEffect, useState, useMemo } from 'react';
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

interface UserGuildIds {
  guildIds: string[];
}

export default function ServerSelect() {
  const { data: session, status } = useSession();
  const [userGuildIds, setUserGuildIds] = useState<UserGuildIds>({ guildIds: [] });
  const [selectedServer, setSelectedServer] = useSelectedServer();
  const [firebaseServers, setFirebaseServers] = useState<Server[]>([]);

  // Compute filteredServers based on firebaseServers and userGuildIds
  const filteredServers = useMemo(() => {
    return firebaseServers.filter(server => userGuildIds.guildIds.includes(server.id));
  }, [firebaseServers, userGuildIds.guildIds]);

  useEffect(() => {
    const getFirebaseData = async () => {
      try {
        const snapshot = await getDocs(serverBackupsCol);
        const servers: Server[] = snapshot.docs.map(doc => ({
          id: doc.id,
          server: doc.data()
        }));
        setFirebaseServers(servers);
      } catch (error) {
        console.error('Error fetching Firebase data:', error);
      }
    };

    getFirebaseData();
  }, []);

  useEffect(() => {
    const getUserGuilds = async () => {
      if (!session) return;

      try {
        const response = await axios.get<UserGuildIds>('/api/userServers', {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
            'Content-Type': 'application/json'
          }
        });
        if (response.data && Array.isArray(response.data.guildIds)) {
          setUserGuildIds(response.data);
        } else {
          console.error('Unexpected response data format:', response.data);
          setUserGuildIds({ guildIds: [] });
        }
      } catch (err) {
        console.error('Error fetching user guilds:', err);
        setUserGuildIds({ guildIds: [] });
      }
    };

    getUserGuilds();
  }, []);

  // Update selectedServer when filteredServers changes
  useEffect(() => {
    if (filteredServers.length > 0) {
      if (!selectedServer || !filteredServers.some(s => s.id === selectedServer.id)) {
        setSelectedServer(filteredServers[0]);
      }
    } 
  }, [filteredServers, selectedServer, setSelectedServer]);

  const handleChange = (event: SelectChangeEvent) => {
    const newServer = filteredServers.find(server => server.id === event.target.value);
    if (newServer) {
      setSelectedServer(newServer);
    }
  };

  useEffect(() => {
    console.log(filteredServers)

  }, [])

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="server-select-label">Server</InputLabel>
        {filteredServers.length > 0 && (
          <Select
            labelId="server-select-label"
            id="server-select"
            value={selectedServer?.id || ''}
            label="Server"
            onChange={handleChange}
          >
            {filteredServers.map(server => (
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
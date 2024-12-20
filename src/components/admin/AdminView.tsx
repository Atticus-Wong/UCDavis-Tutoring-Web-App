import { Typography, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { getDocs } from 'firebase/firestore';
import { attendanceCol, helpSessionsCol } from '@/src/utils/firebase';
import { useSelectedServer, useSetHelpSessionEntries } from '@/src/utils/atom';
import AdminSelect from '../AdminSelect';
import Dashboard from './Dashboard';
import { useSetDataEntries } from '@/src/utils/atom';
import AttendanceTable from '../tables/AttendanceTable';
import HelpSessionTable from '../tables/HelpSessionsTable';



export default function AdminView() {
  const [selectedServer] = useSelectedServer();
  const [attendanceEntries, setAttendanceEntries] = useSetDataEntries();
  const [helpSessionEntries, setHelpSessionEntries] = useSetHelpSessionEntries();
  const [selectedView, setSelectedView] = useState('tables');

  useEffect(() => {
    const getFirebaseData = async () => {
      const attendanceSnapshot = await getDocs(attendanceCol);
      attendanceSnapshot.docs.forEach(doc => {

        if (doc.id === selectedServer?.id) {
          const data = doc.data();
          if (data && data.entries) {
            setAttendanceEntries(data.entries);
          }
        }
      });
      const helpSessionsSnapshot = await getDocs(helpSessionsCol);
      helpSessionsSnapshot.docs.forEach(doc => {
        if (doc.id === selectedServer?.id) {
          const data = doc.data();
          if (data && data.entries) {
            setHelpSessionEntries(data.entries);
          }
        }
      });
    };

    getFirebaseData();


  }, [setAttendanceEntries, setHelpSessionEntries, selectedServer]);

  useEffect(() => {
    setAttendanceEntries(attendanceEntries);
    setHelpSessionEntries(helpSessionEntries);
  }, [setAttendanceEntries, setHelpSessionEntries, attendanceEntries, helpSessionEntries])

  return (
    <>
      <AdminSelect 
        selectedView={selectedView}
        setSelectedView={setSelectedView}
      />
      <Typography fontWeight="bold" fontSize="2rem" textAlign="center">
        Admin View
      </Typography>
      {selectedView === 'tables' ? (
        <>
          <AttendanceTable entries={attendanceEntries} />
          <HelpSessionTable entries={helpSessionEntries} />

        </>
      ) : (
        <Box>
          <Dashboard 
            attendance={attendanceEntries}
            helpSession={helpSessionEntries}
          />
        </Box>
      )}
      <Box textAlign="center"></Box>
    </>
  );
}

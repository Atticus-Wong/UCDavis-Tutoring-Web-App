'use client';
import { Typography, Box } from '@mui/material';
import AttendanceTable from '../tables/AttendanceTable';
import { useEffect, useState } from 'react';
import { getDocs } from 'firebase/firestore';
import { attendanceCol, helpSessionsCol } from '@/src/utils/firebase';
import HelpSessionsTable from '../tables/HelpSessionsTable';
import { useSelectedServer } from '@/src/utils/atom';

export default function AdminView() {
  const [selectedServer] = useSelectedServer();
  const [attendanceEntries, setAttendanceEntries] = useState<Attendance[]>([]);
  const [helpSessionEntries, setHelpSessionEntries] = useState<HelpSession[]>([]);

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


  }, [selectedServer]);

  return (
    <>
      <Typography fontWeight="bold" fontSize="2rem" textAlign="center">
        Admin View
      </Typography>
      <AttendanceTable entries={attendanceEntries} />
      <HelpSessionsTable entries={helpSessionEntries} />
      <Box textAlign="center">
      </Box>
    </>
  );
}

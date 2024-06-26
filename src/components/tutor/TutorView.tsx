import { attendanceCol, helpSessionsCol } from '@/src/utils/firebase';
import { Typography } from '@mui/material';
import { getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import TutorAttendanceTable from '../tables/Tutor_AttendanceTable';
import TutorHelpSessionsTable from '../tables/Tutor_HelpSessionsTable';
import { useSelectedServer } from '@/src/utils/atom';

type TutorViewProps = {
  userId: string;
};

export default function TutorView({ userId }: TutorViewProps) {
  const [selectedServer] = useSelectedServer();
  const [attendanceEntries, setAttendanceEntries] = useState<Attendance[]>([]);
  const [helpSessionEntries, setHelpSessionEntries] = useState<HelpSession[]>([]);

  useEffect(() => {
    const getFirebaseData = async () => {
      const attendanceSnapshot = await getDocs(attendanceCol);
      attendanceSnapshot.docs.forEach(doc => {
        if (doc.id == selectedServer?.id) {
          setAttendanceEntries(doc.data().entries.filter(entry => entry.helper.id === userId)
          );
        }
      })
      const helpSessionsSnapshot = await getDocs(helpSessionsCol);
      helpSessionsSnapshot.docs.forEach(doc => {
        if (doc.id === selectedServer?.id) {
          setHelpSessionEntries(doc.data().entries.filter(entry => entry.helper.id === userId)
          );
        }
      })
    };

    getFirebaseData();
  }, [userId, selectedServer]);

  return (
    <>
      <Typography fontWeight="bold" fontSize="2rem" textAlign="center">
        Tutor View
      </Typography>
      <TutorAttendanceTable entries={attendanceEntries} />
      <TutorHelpSessionsTable entries={helpSessionEntries} />
    </>
  );
}

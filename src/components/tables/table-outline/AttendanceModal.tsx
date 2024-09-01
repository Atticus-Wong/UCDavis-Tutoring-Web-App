import React, { useState } from 'react';
import { Box, Paper, Typography, Button, TextField, IconButton } from '@mui/material';
import { DesktopDateTimePicker } from '@mui/x-date-pickers';
import CloseIcon from '@mui/icons-material/Close';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { attendanceCol } from '@/src/utils/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { useSelectedServer } from '@/src/utils/atom';
import dayjs, { Dayjs } from 'dayjs';
import { dayAndTimeToUnixMs } from '@/src/utils/utils';
import Overlay from '../../Overlay';
import { SetStateAction } from 'jotai';

type AttendanceFormModalProps = {
  entries: Attendance[]
  entry: Attendance
  setData: React.Dispatch<SetStateAction<Attendance[]>>
};

type FloatingFormProps = {
  onClose: () => void,
  data: Attendance[],
  entry: Attendance,
  setData: React.Dispatch<React.SetStateAction<Attendance[]>>
};
/* 
 * @param data: all attendance entries from the selectedServer
 * @param entry: the attendance entry that the user wants to edit
  */
function FloatingForm({ onClose, data, entry, setData }: FloatingFormProps) {

  // entryIndex: determines which entry in firebase is displayed by selected row
  const entryIndex = data.findIndex(item => (
    item.activeTimeMs === entry.activeTimeMs &&
    item.helpStartUnixMs === entry.helpStartUnixMs &&
    item.helpEndUnixMs === entry.helpEndUnixMs &&
    item.helper === entry.helper &&
    item.helpedMembers == entry.helpedMembers
  ));

  const [helpStart, setHelpStart] = useState<Dayjs | null | undefined>(dayjs(new Date(entry.helpStartUnixMs)));
  const [helpEnd, setHelpEnd] = useState<Dayjs | null | undefined>(dayjs(new Date(entry.helpEndUnixMs)));
  const [helpedMembers, setHelpedMembers] = useState<string>(entry.helpedMembers.map(member => member.displayName).join(', '));
  const [helper, setHelper] = useState<string>(entry.helper.displayName);
  const [selectedServer] = useSelectedServer();


  const updateFirebaseAttendance = async () => {
    const attendanceRef = doc(attendanceCol, `/${selectedServer?.id}`);
    const updatedEntry = {
      ...data[entryIndex],
      activeTimeMs: entry.activeTimeMs,
      helpStartUnixMs: dayAndTimeToUnixMs(helpStart),
      helpEndUnixMs: dayAndTimeToUnixMs(helpEnd),
      helpedMembers: helpedMembers.split(', ').map(name => ({ displayName: name, id: '0' })),
      helper: { displayName: helper, id: entry.helper.id }
    };

    const updatedEntries = [...data];
    updatedEntries[entryIndex] = updatedEntry;

    try {
      await updateDoc(attendanceRef, { entries: updatedEntries });
      setData(updatedEntries);
      alert('Successfully updated');
    } catch (err) {
      console.error(err);
    }
  };

  const handleFormSubmit = () => {
    updateFirebaseAttendance();
    onClose();
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        padding: 3,
        boxShadow: 24,
        zIndex: 1000,
        width: '90%',
        maxWidth: '1200px',
        borderRadius: 1,
      }}
    >
      <Paper sx={{ p: 3, position: 'relative' }}>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" textAlign="center" mb={2} sx={{ fontSize: '1.25rem' }}>
          Edit Data
        </Typography>
        <form noValidate autoComplete="off">
          <DesktopDateTimePicker
            label="Help Start Date"
            value={helpStart}
            onChange={(e) => { setHelpStart(e); }}
            sx={{
              width: "100%"
            }}
          />
          <Box marginY='1rem'></Box>
          <DesktopDateTimePicker
            value={helpEnd}
            onChange={(e) => setHelpEnd(e)}
            label="Help End Date"
            sx={{
              width: '100%'
            }}
          />
          <TextField
            fullWidth
            value={helpedMembers}
            label="Helped Members"
            margin="normal"
            variant="outlined"
            onChange={e => setHelpedMembers(e.target.value)}
          />
          <TextField
            fullWidth
            value={helper}
            label="Helper"
            margin="normal"
            variant="outlined"
            onChange={e => setHelper(e.target.value)}
          />
          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button
              onClick={handleFormSubmit}

              variant="contained"
              color="primary"
              sx={{
                fontSize: '0.875rem',
                mr: 1
              }}
            >
              Submit
            </Button>
            <Button variant="outlined" color="secondary" onClick={onClose} sx={{ fontSize: '0.875rem' }}>
              Cancel
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}

function AttendanceModal({ entries, entry, setData }: AttendanceFormModalProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleEditClick = () => {
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  return (
    <div>
      <Button color="primary" onClick={handleEditClick}>
        <ModeEditIcon />
      </Button>
      {isFormOpen && (
        <>
          <Overlay isVisible={isFormOpen} />
          <FloatingForm onClose={handleCloseForm} data={entries} entry={entry} setData={setData} />
        </>
      )}
    </div>
  );
}

export default AttendanceModal;

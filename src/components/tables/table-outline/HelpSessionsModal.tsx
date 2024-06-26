import React, { useState } from 'react';
import { Box, Paper, Typography, Button, TextField, IconButton } from '@mui/material';
import { DesktopDateTimePicker } from '@mui/x-date-pickers';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import CloseIcon from '@mui/icons-material/Close';
import dayjs, { Dayjs } from 'dayjs';
import { helpSessionsCol } from '@/src/utils/firebase';
import { useSelectedServer, useServersFromFirebase } from '@/src/utils/atom';
import { doc, updateDoc } from 'firebase/firestore';
import { dayAndTimeToUnixMs } from '@/src/utils/utils';
import handler from '@/src/pages/api/protected';
type FloatingFormProps = {
  onClose: () => void
  data: HelpSession[],
  entry: HelpSession
}
function FloatingForm({ onClose, data, entry }: FloatingFormProps) {

  const entryIndex = data.findIndex(item => (
    item.helper === entry.helper &&
    item.student === entry.student &&
    item.waitStart === entry.waitStart &&
    item.sessionStartUnixMs === entry.sessionStartUnixMs &&
    item.queueName === entry.queueName &&
    item.sessionEndUnixMs === entry.sessionEndUnixMs &&
    item.waitTimeMs === entry.waitTimeMs
  ));

  const [sessionStart, setSessionStart] = useState<Dayjs | null | undefined>(dayjs(new Date(entry.sessionStartUnixMs)));
  const [sessionEnd, setSessionEnd] = useState<Dayjs | null | undefined>(dayjs(new Date(entry.sessionEndUnixMs)));
  const [waitStart, setWaitStart] = useState<Dayjs | null | undefined>(dayjs(new Date(entry.waitStart)));
  const [queueName, setQueueName] = useState<string>(entry.queueName);
  const [student, setStudent] = useState<string>(entry.student.displayName);
  const [helper, setHelper] = useState<string>(entry.helper.displayName);
  const [servers = []] = useServersFromFirebase();

  const [selectedServer, setSelectedServer] = useSelectedServer();
  const updateFirebaseHelpSessions = async () => {
    const helpSessionsRef = doc(helpSessionsCol, `/${selectedServer?.id}`);
    const updatedEntry = {
      ...data[entryIndex],
      helper: { id: '0', displayName: helper },
      queueName: queueName,
      sessionEndUnixMs: dayAndTimeToUnixMs(sessionEnd),
      sessionStartUnixMs: dayAndTimeToUnixMs(sessionStart),
      student: { id: '0', displayName: student },
      waitStart: dayAndTimeToUnixMs(waitStart),
      waitTimeMs: dayAndTimeToUnixMs(sessionEnd) - dayAndTimeToUnixMs(sessionStart)
    }

    const updatedEntries = [...data];
    updatedEntries[entryIndex] = updatedEntry;

    try {
      await updateDoc(helpSessionsRef, { entries: updatedEntries });
      alert('Successfully Updated');
    } catch (err) {
      console.error(err);
    }

  }
  const handleFormSubmit = () => {
    updateFirebaseHelpSessions();
    onClose();
    const temp = selectedServer;
    setSelectedServer(servers[servers.length]);
    setTimeout(() => {
      setSelectedServer(temp);

    }, 0);
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
            label="Session Start"
            value={sessionStart}
            onChange={() => setSessionStart(sessionStart)}
            sx={{
              width: '100%',
            }}
          />
          <Box marginY='1rem'></Box>
          <DesktopDateTimePicker
            label="Session End"
            value={sessionEnd}
            onChange={() => setSessionEnd(sessionEnd)}
            sx={{
              width: '100%',
            }}
          />
          <Box marginY='1rem'></Box>
          <DesktopDateTimePicker
            label="Wait Start"
            value={waitStart}
            onChange={() => setWaitStart(waitStart)}
            sx={{
              width: '100%',
            }}
          />
          <TextField
            fullWidth
            label="Queue"
            margin="normal"
            variant="outlined"
            value={queueName}
            onChange={(e) => setQueueName(e.target.value)}
          />
          <TextField
            fullWidth
            label="Student"
            margin="normal"
            variant="outlined"
            value={student}
            onChange={(e) => setStudent(e.target.value)}
          />
          <TextField
            fullWidth
            label="Helper"
            margin="normal"
            variant="outlined"
            value={helper}
            onChange={e => setHelper(e.target.value)}
          />
          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleFormSubmit}
              sx={{ fontSize: '0.875rem', mr: 1 }}
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


function HelpSessionModal({ entries, entry }: HelpSessionFormModalProps) {
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
      {isFormOpen && <FloatingForm onClose={handleCloseForm} data={entries} entry={entry} />}
    </div>
  );
}

export default HelpSessionModal;

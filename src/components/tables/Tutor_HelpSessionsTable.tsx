import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { millisecondsToMinutesSeconds } from '@/src/utils/utils';
import { Box, Typography } from '@mui/material';
import SessionStats from './SessionStats';
const columns: GridColDef<HelpSession>[] = [
  { 
    field: 'sessionTime',
    headerName: 'Session Time',
    width: 150,
    valueGetter: (value, row) => {
      const { minutes, seconds } = millisecondsToMinutesSeconds(
        row.sessionEndUnixMs - row.sessionStartUnixMs
      );
      return `${minutes} min. ${seconds} sec.`;
    }
  },
  { field: 'sessionStart', 
    headerName: 'Session Start', 
    width: 275,
    valueGetter: (value, row) => {
      const date = new Date(row.sessionStartUnixMs);
      return `${date.toDateString()} - ${date.toLocaleTimeString()}`;
    }
  },
  { field: 'sessionEnd', 
    headerName: 'Session End', 
    width: 275,
    valueGetter: (value, row) => {
      const date = new Date(row.sessionEndUnixMs);
      return `${date.toDateString()} - ${date.toLocaleTimeString()}`;
    }

  },
  { field: 'waitTime', 
    headerName: 'Wait Time', 
    width: 150, 
    valueGetter: (value, row) => {
      const { minutes, seconds } = millisecondsToMinutesSeconds(row.waitTimeMs);
      return `${minutes} min ${seconds} sec`;
    }
  },
  { field: 'waitStart', 
    headerName: 'Wait Start', 
    sortable: false,
    width: 275, 
    valueGetter: (value, row) => {
      const date = new Date(row.waitStart);
      return `${date.toDateString()} - ${date.toLocaleTimeString()}`;
    }
  },
  { field: 'queue', 
    headerName: 'Queue', 
    width: 100, 
    valueGetter: (value, row) => {
      return row.queueName
    }
  },
  { field: 'student', 
    headerName: 'Student', 
    width: 100, 
    valueGetter: (value, row) => {
      return row.student.displayName
    }
  },
  { field: 'helper', 
    headerName: 'Helper', 
    width: 100, 
    valueGetter: (value, row) => {
      return row.helper.displayName
    }
  },
];

const paginationModel = { page: 0, pageSize: 5 };

type DataTableProps = {
  entries: HelpSession[];
}

export default function TutorHelpSessionsTable({ entries }: DataTableProps) {
  return (
    <>
      <Box marginTop={20}></Box>
      <Typography
        fontWeight="bold"
        fontSize="1.5rem"
        textAlign="center"
        marginBottom={2}
        marginTop={2}
      >
        Help Sessions
      </Typography>
      <SessionStats entries={entries} />
      <Paper  sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={entries}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10, 20, 50, 100]}
          getRowId={(row) => row.sessionStartUnixMs}
        />
      </Paper>
      <Box marginBottom={20}></Box>
    </>
  )
}
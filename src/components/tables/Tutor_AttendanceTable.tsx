import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { millisecondsToMinutesSeconds } from '@/src/utils/utils';
import { Typography } from '@mui/material';
import SessionStats from './SessionStats';
const columns: GridColDef<Attendance>[] = [
  { 
    field: 'sessionTime',
    headerName: 'Session Time',
    width: 175,
    valueGetter: (value, row) => {
      const { minutes, seconds } = millisecondsToMinutesSeconds(
        row.helpEndUnixMs - row.helpStartUnixMs
      );
      return `${minutes} min. ${seconds} sec.`;
    }
  },
  { field: 'HelpStartDate', 
    headerName: 'Help Start Date', 
    type: 'dateTime',
    width: 275,
    valueGetter: (value, row) => {
      const date = new Date(row.helpStartUnixMs);
      return date
    }
  },
  { field: 'HelpEndDate', 
    headerName: 'Help End Date', 
    type: 'dateTime',
    width: 275,
    valueGetter: (value, row) => {
      const date = new Date(row.helpEndUnixMs);
      return date
    }

  },
  { field: 'ActiveTime', 
    headerName: 'Active Time', 
    width: 175, 
    valueGetter: (value, row) => {
      const { minutes, seconds } = millisecondsToMinutesSeconds(row.activeTimeMs);
      return `${minutes} min ${seconds} sec`;
    }
  },
  { field: 'HelpedMembers', 
    headerName: 'Helped Members', 
    sortable: false,
    width: 350, 
    valueGetter: (value, row) => {
      return row.helpedMembers.map(member => member.displayName).join(', ');
    }
  },
  { field: 'Helper', 
    headerName: 'Helper', 
    width: 130, 
    valueGetter: (value, row) => {
      return row.helper.displayName
    }
  },
];

const paginationModel = { page: 0, pageSize: 5 };

type DataTableProps = {
  entries: Attendance[];
}

export default function TutorAttendanceTable({ entries }: DataTableProps) {
  return (
    <>
      <Typography
        fontWeight="bold"
        fontSize="1.5rem"
        textAlign="center"
        marginBottom={2}
        marginTop={2}
      >
        Attendance
      </Typography>
      <SessionStats entries={entries} />
      <Paper  sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={entries}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10, 20, 50, 100]}
          getRowId={(row) => row.helpStartUnixMs}
        />
      </Paper>
    </>
  )
}
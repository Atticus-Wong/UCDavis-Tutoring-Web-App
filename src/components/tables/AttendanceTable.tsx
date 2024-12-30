import * as React from 'react';
import dynamic from 'next/dynamic';
import { 
  DataGrid,
  GridActionsCellItem, 
  GridColDef, 
  GridEventListener, 
  GridRowEditStopReasons, 
  GridRowId, 
  GridRowModel, 
  GridRowModes, 
  GridRowModesModel,
  GridRowsProp 
        } 
from '@mui/x-data-grid'
import SaveIcon from '@mui/icons-material/Save'
import EditIcon from '@mui/icons-material/Edit'
import CancelIcon from '@mui/icons-material/Cancel'
import Paper from '@mui/material/Paper';
import { millisecondsToMinutesSeconds } from '@/src/utils/utils';
import { Typography, Snackbar, Alert } from '@mui/material';
import SessionStats from './SessionStats';
import { attendanceCol } from '@/src/utils/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { useSelectedServer, useTutorIds } from '@/src/utils/atom';
const paginationModel = { page: 0, pageSize: 5 };
type DataTableProps = {
  entries: Attendance[];
}

interface ValidationError {
  message: string,
  field: string
}
// https://mui.com/x/react-data-grid/editing/
// mui x-data-grid requires unique id's of type number
interface AttendanceRow extends Attendance {
  id: number;
}

// Dynamically import DataGrid
// const DataGrid = dynamic(
//   () => import('@mui/x-data-grid').then((mod) => mod.DataGrid),
//   {
//     loading: () => (
//       <Box display="flex" justifyContent="center" p={4}>
//         <CircularProgress />
//       </Box>
//     ),
//     ssr: false // Disable server-side rendering
//   }
// );

export default function AttendanceTable({ entries }: DataTableProps) {
  const [editedEntries, setEditedEntries] = React.useState(entries);
  const [selectedServer] = useSelectedServer();
  const [tutorIds] = useTutorIds();
  const [rows, setRows] = React.useState<AttendanceRow[]>(
    entries.map((entry, index) => ({
      ...entry,
      id: index
    }))
  );
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
  const [error, setError] = React.useState<ValidationError | null>(null);

  const validateRow = (row: GridRowModel<AttendanceRow>): ValidationError | null => {
    if (!row.helpStartUnixMs) {
      return { message: 'Help start cannot be empty', field: 'helpStart'}
    }
    if (!row.helpEndUnixMs) {
      return { message: 'Help end cannot be empty', field: 'helpEnd'}
    }
    if (row.helpEndUnixMs < row.helpStartUnixMs) {
      return { message: 'Help end time must come after help start time', field: 'helpEnd'}
    }
    return null;
  }

  React.useEffect(() => {
    setRows(entries.map((entry, index) => ({
      ...entry,
      id: index
    })));
  }, [entries]);


  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true }
    });
  };

  const handleCloseError = () => {
    setError(null);
  };

  const processRowUpdate = async (newRow: GridRowModel<AttendanceRow>) => {
    const isError = validateRow(newRow);
    if (isError) {
      setError(isError)
      throw new Error(isError.message)
    } else {
      setError(null)
    }

    try {
      const updatedRow = { ...newRow } as AttendanceRow;
      setRows(rows.map((row) => 
        row.id === newRow.id ? updatedRow : row));
      await updateFirebaseAttendance(newRow);
      return updatedRow;
    } catch (error) {
      console.error('Failed to update row:', error);
      throw error;
    }
  };
  // NOTE: asynchronous setState causing issues <- reasoning for using 'first' bool
  const [first, setFirst] = React.useState(true)
  let updatedEntries = []
  const updateFirebaseAttendance = async (row: AttendanceRow) => {
    try {
      const attendanceRef = doc(attendanceCol, `/${selectedServer?.id}`);

      const updatedEntry: Attendance = {
        ...editedEntries[row.id],
        activeTimeMs: row.activeTimeMs,
        helpStartUnixMs: row.helpStartUnixMs,
        helpEndUnixMs: row.helpEndUnixMs,
        helpedMembers: row.helpedMembers,
        helper: { displayName: row.helper.displayName, id: tutorIds.find(member => member.displayName === row.helper.displayName)?.id ?? ''}
      }
      if (first) {
        updatedEntries = [...entries]
        setFirst(false)
      } else {
        updatedEntries = [...editedEntries]
        
      }
      updatedEntries[row.id] = updatedEntry;
      setEditedEntries(updatedEntries);
      await updateDoc(attendanceRef, { entries: updatedEntries})
    } catch (error) {
      console.error('Error updating attendanceCol: ', error);
      throw new Error('Firebase UpdateDoc Failed');
    }
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleProcessRowUpdateError = React.useCallback((row: GridRowModel<AttendanceRow>) => {
    const isError = validateRow(row)
    return isError
  }, []);

  const columns: GridColDef[] = [
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
      width: 275,
      type: 'dateTime',
      editable: true,
      valueGetter: (value, row) => {
        const date = new Date(row.helpStartUnixMs);
        return date
      },
      valueSetter: (value, row) => {
        return {
          ...row,
          helpStartUnixMs: value ? value.getTime() : null
        }
      }
    },
    { field: 'HelpEndDate', 
      headerName: 'Help End Date', 
      width: 275,
      type: 'dateTime',
      editable: true,
      valueGetter: (value, row) => {
        const date = new Date(row.helpEndUnixMs);
        return date
      },
      valueSetter: (value, row) => {
        return {
          ...row,
          helpEndUnixMs: value ? value.getTime() : null
        }
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
    editable: false,
    width: 350, 
    valueGetter: (value, row) => {
      return row.helpedMembers.map((member: { id: string, displayName: string }) => member.displayName).join(', ');
    }, 
  },
    { field: 'Helper', 
      headerName: 'Helper', 
      type: 'singleSelect',
      valueOptions: tutorIds.map(member => member.displayName),
      editable: true,
      width: 130, 
      valueGetter: (value, row) => {
        return row.helper.displayName
      },
      valueSetter: (value, row) => {
        const id = tutorIds.find(member => member.displayName === value)?.id;
        return {
          ...row,
          helper: {
            id: id,
            displayName: value
          }
        }
      }
    },
      {
        field: 'actions',
        type: 'actions',
        headerName: 'Actions',
        width: 100,
        cellClassName: 'actions',
        getActions: ({ id }) => {
          const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

          if (isInEditMode) {
            return [
              <GridActionsCellItem
                icon={<SaveIcon />}
                key='save'
                label="Save"
                sx={{
                  color: 'primary.main',
                }}
                onClick={handleSaveClick(id)}
              />,
              <GridActionsCellItem
                icon={<CancelIcon />}
                key='cancel'
                label="Cancel"
                className="textPrimary"
                onClick={handleCancelClick(id)}
                color="inherit"
              />,
            ];
          }

          return [
            <GridActionsCellItem
              icon={<EditIcon />}
              key='edit'
              label="Edit"
              className="textPrimary"
              onClick={handleEditClick(id)}
              color="inherit"
            />,
          ];
        },
      }
  ];

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
            rows={rows}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10, 20, 50, 100]}
            editMode='row'
            rowModesModel={rowModesModel}
            onRowModesModelChange={handleRowModesModelChange}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            onProcessRowUpdateError={handleProcessRowUpdateError}
          />
        </Paper> 
        <Snackbar
          open={error !== null}  
          autoHideDuration={5000}
          onClose={handleCloseError}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        >
          <Alert onClose={handleCloseError} severity='error' sx={{ width: '100%'}}>
            {error?.message}
          </Alert>
        </Snackbar>
    </>
  )
}
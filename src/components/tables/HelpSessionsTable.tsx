import { useCallback, useEffect, useState } from 'react';
import { DataGrid, 
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
from '@mui/x-data-grid';
import SaveIcon from '@mui/icons-material/Save'
import EditIcon from '@mui/icons-material/Edit'
import CancelIcon from '@mui/icons-material/Cancel'
import Paper from '@mui/material/Paper';
import { millisecondsToMinutesSeconds } from '@/src/utils/utils';
import { Box, Typography, Snackbar, Alert } from '@mui/material';
import SessionStats from './SessionStats';
import { doc, updateDoc } from 'firebase/firestore';
import { helpSessionsCol } from '@/src/utils/firebase';
import { useSelectedServer, useTutorIds } from '@/src/utils/atom';


const paginationModel = { page: 0, pageSize: 5 };

type DataTableProps = {
  entries: HelpSession[];
}

// https://mui.com/x/react-data-grid/editing/
// mui x-data-grid requires unique id's of type number
// other option: using waitStart as a unique identifier
interface HelpSessionRow extends HelpSession {
  id: number;
}

interface ValidationError {
  message: string,
  field: string
}

export default function HelpSessionTable({ entries }: DataTableProps) {
  const [editedEntries, setEditedEntries] = useState<HelpSession[]>(entries);
  const [tutorIds] = useTutorIds();
  const [selectedServer] = useSelectedServer();
  const [rows, setRows] = useState<HelpSessionRow[]>(
    entries.map((entry, index) => ({
      ...entry,
      id: index
    }))
  );
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  const [error, setError] = useState<ValidationError | null>(null);

  const validateRow = (row: GridRowModel<HelpSessionRow>): ValidationError | null => {
    if (!row.sessionStartUnixMs) {
      return { message: 'Session start cannot be empty', field: 'sessionStart'};
    }
    if (!row.sessionEndUnixMs) {
      return { message: 'Session end cannot be empty', field: 'sessionEnd'};
    }
    if (!row.waitStart) {
      return { message: 'Wait start cannot be empty', field: 'waitStart'};
    }
    if (row.sessionEndUnixMs < row.sessionStartUnixMs) {
      return { message: 'Session end time must come after session start time', field: 'sessionEnd'}
    }
    if (row.waitStart > row.sessionStartUnixMs) {
      return { message: 'Wait start time must be before session start time', field: 'waitStart'}
    }
    return null;
  }


  useEffect(() => {
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

  const processRowUpdate = async (newRow: GridRowModel<HelpSessionRow>) => {
    const isError = validateRow(newRow);
    if (isError) {
      setError(isError);
      throw new Error(isError.message);
    } else {
      setError(null);
    }

    try {
      const updatedRow = { ...newRow } as HelpSessionRow;
      setRows(rows.map((row) => 
        row.id === newRow.id ? updatedRow : row));
      await updateFirebaseHelpSession(newRow);
      return updatedRow;
    } catch (error) {
      console.error('Failed to update row:', error);
      throw error;
    }
  };
  const [first, setFirst] = useState(true);
  let updatedEntries = []
  const updateFirebaseHelpSession = async (row: HelpSessionRow) => {
    const helpSessionRef = doc(helpSessionsCol, `/${selectedServer?.id}`)
    if (editedEntries.length === 0) {
      setEditedEntries(entries)
    }
    const updatedEntry: HelpSession = {
      ...editedEntries[row.id],
      sessionStartUnixMs: row.sessionStartUnixMs,
      sessionEndUnixMs: row.sessionEndUnixMs,
      waitStart: row.waitStart,
      waitTimeMs: row.waitTimeMs,
      queueName: row.queueName,
      helper: { displayName: row.helper.displayName, id: tutorIds.find(member => member.displayName === row.helper.displayName)?.id ?? '' },
      student: { displayName: row.student.displayName, id: entries[row.id].student.id }
    }
    let updatedEntries = [];
    // NOTE: asynchronous setState causing issues <- reasoning for using 'first' bool
    if (first) {
      updatedEntries = [...entries];
      setFirst(false)
    } else {
      updatedEntries = [...editedEntries];
    }
    console.log(updatedEntries);
    updatedEntries[row.id] = updatedEntry;
    setEditedEntries(updatedEntries)
    try {
      await updateDoc(helpSessionRef, { entries: updatedEntries });
    } catch (err) {
      console.error('Error updating HelpSessionsCol: ', err);
      throw new Error('Firebase UpdateDoc Failed');
      
    }
  }
  
  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleProcessRowUpdateError = useCallback((row: GridRowModel<HelpSessionRow>) => {
    const isError = validateRow(row)
    return isError
  }, []);

  const columns: GridColDef[] = [
    { 
      field: 'sessionTime',
      headerName: 'Session Time',
      width: 150,
      valueGetter: (value, row) => {
        const { minutes, seconds } = millisecondsToMinutesSeconds(
          row.sessionEndUnixMs - row.sessionStartUnixMs
        );
        return `${minutes} min. ${seconds} sec.`;
      },
    },
    { field: 'sessionStart', 
      headerName: 'Session Start', 
      type: 'dateTime',
      editable: true,
      width: 275,
      valueGetter: (value, row) => {
        const date = new Date(row.sessionStartUnixMs);
        return date
      },
      valueSetter: (value, row) => {
        return {
          ...row,
          sessionStartUnixMs: value ? value.getTime() : null
        }
      }
    },
    { field: 'sessionEnd', 
      headerName: 'Session End', 
      type: 'dateTime',
      editable: true,
      width: 275,
      valueGetter: (value, row) => {
        const date = new Date(row.sessionEndUnixMs);
        return date
      },
      valueSetter: (value, row) => {
        return {
          ...row,
          sessionEndUnixMs: value ? value.getTime() : null
          
        }
      }
    },
    { field: 'waitTime', 
      headerName: 'Wait Time', 
      width: 150, 
      valueGetter: (value, row) => {
        const { minutes, seconds } = millisecondsToMinutesSeconds(row.sessionStartUnixMs - row.waitStart);
        return `${minutes} min ${seconds} sec`;
      }
    },
    { field: 'waitStart', 
      headerName: 'Wait Start', 
      type: 'dateTime',
      sortable: false,
      editable: true,
      width: 275, 
      valueGetter: (value, row) => {
        const date = new Date(row.waitStart);
        return date
      },
      valueSetter: (value, row) => {
        return {
          ...row,
          waitStart: value ? value.getTime() : null
        }
      }
      
    },
    { field: 'queue', 
      headerName: 'Queue', 
      type: 'string',
      editable: true,
      width: 100, 
      valueGetter: (value, row) => {
        return row.queueName;
      },
      valueSetter: (value, row) => {
        return {
          ...row,
          queueName: value
        }
      }
    },
    { field: 'student', 
      headerName: 'Student', 
      type: 'string',
      editable: true,
      width: 100, 
      valueGetter: (value, row) => {
        return row.student.displayName
      },
      valueSetter: (value, row) => {
        return {
          ...row,
          student: {
            ...row.student,
            displayName: value
          }
        }
      }
    },
    { field: 'helper', 
      headerName: 'Helper', 
      type: 'singleSelect',
      valueOptions: tutorIds.map((member) => member.displayName),
      editable: true,
      width: 100, 
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
    },
  ];

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
      <Box marginBottom={20}></Box>
    </>
  )
}
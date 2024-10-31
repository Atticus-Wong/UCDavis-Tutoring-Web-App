import { useEffect, useState } from 'react';
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
import { Box, Typography } from '@mui/material';
import SessionStats from './SessionStats';
import { doc, updateDoc } from 'firebase/firestore';
import { attendanceCol, helpSessionsCol } from '@/src/utils/firebase';
import { useSelectedServer } from '@/src/utils/atom';

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

export default function HelpSessionTable({ entries }: DataTableProps) {
  const [selectedServer] = useSelectedServer();
  const [rows, setRows] = useState<HelpSessionRow[]>(
    entries.map((entry, index) => ({
      ...entry,
      id: index
    }))
  );
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  useEffect(() => {
    setRows(entries.map((entry, index) => ({
      ...entry,
      id: index
    })));
    console.log(rows);
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

  const processRowUpdate = async (newRow: GridRowModel<HelpSessionRow>) => {
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

  const updateFirebaseHelpSession = async (row: HelpSessionRow) => {
    const helpSessionRef = doc(helpSessionsCol, `/${selectedServer?.id}`)

    const updatedEntry: HelpSession = {
      ...entries[row.id],
      sessionStartUnixMs: row.sessionStartUnixMs,
      sessionEndUnixMs: row.sessionEndUnixMs,
      waitStart: row.waitStart,
      waitTimeMs: row.waitTimeMs,
      queueName: row.queueName,
      helper: { displayName: row.helper.displayName, id: entries[row.id].helper.id },
      student: { displayName: row.student.displayName, id: entries[row.id].student.id }
    }

    const updatedEntries = [...entries];
    updatedEntries[row.id] = updatedEntry;
    try {
      await updateDoc(helpSessionRef, { entries: updatedEntries });
    } catch (err) {
      console.error('Error updating attendanceCol: ', err);
      throw new Error('Firebase UpdateDoc Failed');
      
    }
  }
  
  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

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
          sessionStartUnixMs: value.getTime()
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
          sessionEndUnixMs: value.getTime()
          
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
          waitStart: value.getTime()
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
      type: 'string',
      editable: true,
      width: 100, 
      valueGetter: (value, row) => {
        return row.helper.displayName
      },
      valueSetter: (value, row) => {
        return {
          ...row,
          helper: {
            ...row.helper,
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
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
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
        />
      </Paper>
      <Box marginBottom={20}></Box>
    </>
  )
}
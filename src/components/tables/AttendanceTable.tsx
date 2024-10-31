import * as React from 'react';
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
from '@mui/x-data-grid'
import SaveIcon from '@mui/icons-material/Save'
import EditIcon from '@mui/icons-material/Edit'
import CancelIcon from '@mui/icons-material/Cancel'
import Paper from '@mui/material/Paper';
import { millisecondsToMinutesSeconds } from '@/src/utils/utils';
import { Typography } from '@mui/material';
import SessionStats from './SessionStats';
import { attendanceCol } from '@/src/utils/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { useSelectedServer } from '@/src/utils/atom';


const paginationModel = { page: 0, pageSize: 5 };

type DataTableProps = {
  entries: Attendance[];
}

interface AttendanceRow extends Attendance {
  id: number;
}

export default function AttendanceTable({ entries }: DataTableProps) {
  const [selectedServer] = useSelectedServer();
  const [rows, setRows] = React.useState<AttendanceRow[]>(
    entries.map((entry, index) => ({
      ...entry,
      id: index
    }))
  );
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});

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

  const processRowUpdate = async (newRow: GridRowModel<AttendanceRow>) => {
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
  
  const updateFirebaseAttendance = async (row: AttendanceRow) => {
    try {
      const attendanceRef = doc(attendanceCol, `/${selectedServer?.id}`);

      const updatedEntry: Attendance = {
        activeTimeMs: row.activeTimeMs,
        helpStartUnixMs: row.helpStartUnixMs,
        helpEndUnixMs: row.helpEndUnixMs,
        helpedMembers: row.helpedMembers,
        helper: { displayName: row.helper.displayName, id: entries[row.id].helper.id }
      }

      const updatedEntries = [...entries];
      updatedEntries[row.id] = updatedEntry;
      await updateDoc(attendanceRef, { entries: updatedEntries})
    } catch (error) {
      console.error('Error updating attendanceCol: ', error);
      throw new Error('Firebase UpdateDoc Failed');
    }
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

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
          helpStartUnixMs: value.getTime()
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
          helpEndUnixMs: value.getTime()
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
      editable: true,
      width: 130, 
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
        />
      </Paper> 
    </>
  )
}
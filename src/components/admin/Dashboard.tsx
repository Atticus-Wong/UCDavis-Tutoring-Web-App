import { Typography, Box, Paper } from "@mui/material";
import { getLastSunday, getLastSundayMilliseconds, getTodaysDateInMilliseconds } from "@/src/utils/utils";
import { millisecondsToMinutesSeconds, millisecondsToHourMinutes } from "@/src/utils/utils";
import LineGraph from "../charts/Line";
import { DataGrid, GridColDef } from '@mui/x-data-grid';

type DashboardProps = {
  attendance: Attendance[],
  helpSession: HelpSession[]
}

type TutorHours = {
  displayName: string,
  hours: number,
  minutes: number
}

const Dashboard: React.FC<DashboardProps> = ({ attendance, helpSession }) => {
  let averageWaitTime: number = 0;
  let totalHoursTutoredThisWeek: number = 0; 
  let studentsTutoredTodayGraph: number[] = new Array(24).fill(0);
  let studentsTutorWeekGraph: number[] = new Array(7).fill(0);

  const tutorHours = new Map<string, number>();
  const helperNames = new Map<string, string>();
  helpSession.forEach((session) => {
    if (session.sessionStartUnixMs > getLastSundayMilliseconds()) {
      averageWaitTime += session.sessionEndUnixMs - session.sessionStartUnixMs;
      
    }
    if (session.sessionStartUnixMs >= getTodaysDateInMilliseconds() && session.sessionStartUnixMs < getTodaysDateInMilliseconds() + 86400000) { // 86400000 = number of milliseconds in a day
      const todayTime = session.sessionStartUnixMs - getTodaysDateInMilliseconds();
      studentsTutoredTodayGraph[millisecondsToHourMinutes(todayTime).hours]++;
    }
  })

  attendance.forEach((session) => {
    if (session.helpStartUnixMs > getLastSundayMilliseconds()) {
      totalHoursTutoredThisWeek += session.helpEndUnixMs - session.helpStartUnixMs;
      
      helperNames.set(session.helper.id, session.helper.displayName);
      
      const sessionDuration = session.helpEndUnixMs - session.helpStartUnixMs;
      
      const currentDuration = tutorHours.get(session.helper.id) || 0;
      tutorHours.set(session.helper.id, currentDuration + sessionDuration);
    }

    if (session.helpStartUnixMs >= getLastSundayMilliseconds() && session.helpStartUnixMs < getLastSundayMilliseconds() + (86400000 * 7)) {
      const newDate = new Date(session.helpStartUnixMs);
      studentsTutorWeekGraph[newDate.getDay()] += session.helpedMembers.length;
    }
  });

  const tutorHoursData: TutorHours[] = Array.from(tutorHours.entries()).map(([helperId, milliseconds]) => ({
    id: helperId,
    displayName: helperNames.get(helperId) || 'Unknown',
    hours: millisecondsToHourMinutes(milliseconds).hours,
    minutes: millisecondsToHourMinutes(milliseconds).minutes,
    totalTime: `${millisecondsToHourMinutes(milliseconds).hours}h ${millisecondsToHourMinutes(milliseconds).minutes}m`
  }));

  const columns: GridColDef[] = [
    {
      field: 'displayName',
      headerName: 'Tutor Name',
      flex: 1,
      minWidth: 200,
    },
    {
      field: 'totalTime',
      headerName: 'Total Hours',
      flex: 1,
      minWidth: 150,
    }
  ];


  return (
    <Box sx={{ p: 2 }}>
      <Box>
        <Typography variant="h3" gutterBottom>
          Average wait time: <strong>{millisecondsToMinutesSeconds(averageWaitTime / helpSession.length).minutes} min {millisecondsToMinutesSeconds(averageWaitTime / helpSession.length).seconds} sec </strong>
        </Typography>
        <Typography variant="h3" gutterBottom>
        Hours tutored since <em>{getLastSunday().getMonth()+1}/{getLastSunday().getDate()}</em>: <strong>{millisecondsToHourMinutes(totalHoursTutoredThisWeek).hours} hrs {millisecondsToHourMinutes(totalHoursTutoredThisWeek).minutes} min </strong>
        </Typography>
        <Box sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'center',
            gap: '20px',
            width: '100%',
            mb: 4
            }}>
            <Box sx={{ flex: '1 1 0', minWidth: { xs: '100%', md: '45%' } }}>
              <LineGraph 
                title='Students Tutored Today' 
                entries={studentsTutoredTodayGraph.slice(8, 21)}
                labels={[ '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00' ]}/>
            </Box>
            <Box sx={{ flex: '1 1 0', minWidth: { xs: '100%', md: '45%' } }}>
              <LineGraph 
                title="Students tutored this week" 
                entries={studentsTutorWeekGraph.slice(1, 6)}
                labels={[ 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] }/>
            </Box>
        </Box>
      </Box>
      <Box>
        <Typography
          fontWeight="bold"
          textAlign="center"
          variant='h2'
          marginBottom={2}
          marginTop={2}
          >
          Tutor Hours ({getLastSunday().getMonth()+1}/{getLastSunday().getDate()})
        </Typography>
        <Paper sx={{ height: 500 }}>
          <DataGrid
            rows={tutorHoursData}
            columns={columns}
            pageSizeOptions={[5, 10, 25]}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            sx={{
              '& .MuiDataGrid-cell': {
                fontSize: { xs: '0.875rem', sm: '1rem', md: '1rem' }
              },
              '& .MuiDataGrid-columnHeader': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
                fontWeight: 'bold'
              }
            }}
            disableRowSelectionOnClick
          />
        </Paper>
      </Box>
    </Box>
  )
}

export default Dashboard;
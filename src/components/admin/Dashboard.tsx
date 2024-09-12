import React, { useMemo, useState } from 'react';
import { Typography, Box, Paper, TextField } from "@mui/material";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
  ColumnFiltersState,
  getFilteredRowModel,
} from '@tanstack/react-table';
import { getLastSunday, getLastSundayMilliseconds, getTodaysDateInMilliseconds } from "@/src/utils/utils";
import { millisecondsToMinutesSeconds, millisecondsToHourMinutes } from "@/src/utils/utils";
import LineGraph from "../charts/Line";
import { BRAND_COLOR } from '@/src/utils/constants';
import TutorFilter from '../tables/DashboardFilter';

type DashboardProps = {
  attendance: Attendance[],
  helpSession: HelpSession[]
}

type HelperType = {
  id: string,
  displayName: string
}

type TutorHours = {
  displayName: string,
  hours: number,
  minutes: number
}

const Dashboard: React.FC<DashboardProps> = ({ attendance, helpSession }) => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  let averageWaitTime: number = 0;
  let totalHoursTutoredThisWeek: number = 0; 
  let studentsTutoredTodayGraph: number[] = new Array(24).fill(0);
  let studentsTutorWeekGraph: number[] = new Array(7).fill(0);
  const tutorHours = new Map<HelperType, number>();

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
    }
    if (session.helpStartUnixMs >= getLastSundayMilliseconds() && session.helpStartUnixMs < getLastSundayMilliseconds() + (86400000 * 7)) {
      const newDate = new Date(session.helpStartUnixMs);
      studentsTutorWeekGraph[newDate.getDay()] += session.helpedMembers.length;

      if (tutorHours.has(session.helper)) {
        tutorHours.set(session.helper, tutorHours.get(session.helper)! + session.helpEndUnixMs - session.helpStartUnixMs);
      } else {
        tutorHours.set(session.helper, session.helpEndUnixMs - session.helpStartUnixMs);
      }
    }
  })

  const tutorHoursData: TutorHours[] = Array.from(tutorHours, ([helper, milliseconds]) => ({
    displayName: helper.displayName,
    hours: millisecondsToHourMinutes(milliseconds).hours,
    minutes: millisecondsToHourMinutes(milliseconds).minutes
  }));

  const columns: ColumnDef<TutorHours>[] = useMemo(() => [
    {
      id: 'displayName',
      accessorKey: 'displayName',  // Change accessorFn to accessorKey
      header: 'Tutor Name',
      cell: info => info.getValue(),
      filterFn: (row, columnId, filterValue) => {
        const cellValue = row.getValue(columnId) as string;
        return cellValue.toLowerCase().includes((filterValue as string).toLowerCase());
      }
    },
    {
      id: 'hoursTutored',
      header: 'Hours Tutored',
      accessorFn: (row) => `${row.hours} hrs ${row.minutes} min`,
    },
  ], []);

  const table = useReactTable({
    columns,
    data: tutorHoursData,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),  // Add this line
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    filterFns: {
      fuzzy: (row, columnId, filterValue) => {
        const cellValue = row.getValue(columnId) as string;
        return cellValue.toLowerCase().includes((filterValue as string).toLowerCase());
      }
    }
  });

  return (
    <Box sx={{ p: 2 }}>
      <Box>
      <Typography variant="body1" gutterBottom>
        Average wait time: <strong>{millisecondsToMinutesSeconds(averageWaitTime / helpSession.length).minutes} min {millisecondsToMinutesSeconds(averageWaitTime / helpSession.length).seconds} sec </strong>
      </Typography>
      <Typography variant="body1" gutterBottom>
        Hours tutored since <em>{getLastSunday().getMonth()+1}/{getLastSunday().getDate()}</em>: <strong>{millisecondsToHourMinutes(totalHoursTutoredThisWeek).hours} hrs {millisecondsToHourMinutes(totalHoursTutoredThisWeek).minutes} min </strong>
      </Typography>
      <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'center',
          gap: '20px',
          width: '100%',
          mb: 4
        }}
      >
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
      {/* Add TutorFilter component here if needed */}
      <Box sx={{ marginTop: '10vh', overflowX: 'auto', overflowY: 'auto', maxHeight: '32rem', fontSize: { xs: '0.875rem', sm: '1rem', md: '1.25rem' } }}>
        <Typography
          fontWeight="bold"
          textAlign="center"
          marginBottom={2}
          marginTop={2}
        >
          Tutor Hours ({getLastSunday().getMonth()+1}/{getLastSunday().getDate()})
        </Typography>
        <table
          style={{
            borderCollapse: 'collapse',
            width: '100%',
            minWidth: '300px',
            marginBottom: 8,
            marginTop: 8,
            borderRadius: '8px',
            overflow: 'hidden',
          }}
        >
          <thead style={{ position: 'sticky', top: 0, backgroundColor: BRAND_COLOR }}>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    style={{
                      fontWeight: 600,
                      textAlign: 'center',
                      padding: '16px'
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell, index) => (
                  <td
                    key={cell.id}
                    style={{
                      padding: '16px',
                      textAlign: 'center',
                      borderRight: index === row.getVisibleCells().length - 1 ? 'none' : '1px solid gray',
                      wordWrap: 'break-word',
                      whiteSpace: 'pre-wrap',
                      maxWidth: '300px'
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
    </Box>
  )
}

export default Dashboard;
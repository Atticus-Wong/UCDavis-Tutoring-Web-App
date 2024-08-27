import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
  getFilteredRowModel,
  FilterFn,
  ColumnFiltersState,
} from '@tanstack/react-table';
import { useMemo, useEffect, useState } from 'react';
import { millisecondsToMinutesSeconds } from '../../utils/utils';
import { Typography, TextField } from '@mui/material';
import SessionStats from './SessionStats';
import AttendanceModal from './table-outline/AttendanceModal';
import { BRAND_COLOR } from '@/src/utils/constants';
import { useSetDataEntries } from '@/src/utils/atom';
import { DateTimePicker } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';
import Filters from './Filters';

type AttendanceTableProps = {
  entries: Attendance[];
}

type HelperType = {
  id: string,
  displayName: string
}

export default function AttendanceTable({ entries }: AttendanceTableProps) {
  const [setDataEntries, setSetDataEntries] = useSetDataEntries();
  const [columnFilters, setColumnFilter] = useState<ColumnFiltersState>([]);

  // Ensure state is updated when entries prop changes
  useEffect(() => {
    setSetDataEntries(entries);
  }, [entries]);

  const columns: ColumnDef<Attendance>[] = useMemo(() => [
    {
      id: 'sessionTime',
      header: 'Session Time',
      accessorFn: (row) => {
        const { minutes, seconds } = millisecondsToMinutesSeconds(
          row.helpEndUnixMs - row.helpStartUnixMs
        );
        return `${minutes} min. ${seconds} sec.`;
      },
    },
    {
      id: 'helpStartUnixMs',
      header: 'Help Start Date',
      accessorFn: (row) => row.helpStartUnixMs,
      cell: ({ getValue }) => {
        const date = new Date(getValue<number>());
        return `${date.toDateString()} - ${date.toLocaleTimeString()}`;
      },
      filterFn: (row, columnId, filterValue) => {
        if (!filterValue) return true;
        const cellValue = row.getValue<number>(columnId);
        return cellValue >= filterValue;
      }
    },
    {
      id: 'helpEndUnixMs',
      header: 'Help End Date',
      accessorFn: (row) => row.helpEndUnixMs,
      cell: ({ getValue }) => {
        const date = new Date(getValue<number>());
        return `${date.toDateString()} - ${date.toLocaleTimeString()}`;
      },
      filterFn: (row, columnId, filterValue) => {
        if (!filterValue) return true;
        const cellValue = row.getValue<number>(columnId);
        return cellValue <= filterValue;
      }
    },
    {
      id: 'activeTimeMs',
      header: 'Active Time',
      accessorFn: (row) => row.activeTimeMs,
      cell: ({ getValue }) => {
        const { minutes, seconds } = millisecondsToMinutesSeconds(getValue<number>());
        return `${minutes} min. ${seconds} sec.`;
      },
    },
    {
      id: 'helpedMembers',
      header: 'Helped Members',
      accessorFn: (row) => row.helpedMembers,
      cell: ({ getValue }) => {
        return getValue<{ displayName: string; id: string }[]>()
          .map(member => member.displayName)
          .join(', ');
      },
      filterFn: 'arrIncludes'
    },
    {
      id: 'helper',
      header: 'Helper',
      accessorFn: (row) => row.helper,
      cell: ({ getValue }) => <p>{getValue<{ displayName: string; id: string }>().displayName}</p>,
      filterFn: (row, columnId, filterValue: HelperType) => {
        const cellValue = row.getValue<HelperType>(columnId);
        return cellValue.displayName.toLowerCase().includes(filterValue.displayName.toLowerCase());
      },

    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const currentEntry: Attendance = {
          activeTimeMs: row.original.activeTimeMs,
          helpEndUnixMs: row.original.helpEndUnixMs,
          helpStartUnixMs: row.original.helpStartUnixMs,
          helpedMembers: row.original.helpedMembers,
          helper: row.original.helper,
        };
        return (
          <AttendanceModal
            entries={setDataEntries}
            entry={currentEntry}
            setData={setSetDataEntries}
          />
        );
      }
    }
  ], [setDataEntries]);

  const table = useReactTable({
    columns,
    data: setDataEntries,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters: columnFilters
    },
    onColumnFiltersChange: setColumnFilter
  });

  if (!setDataEntries.length) {
    return (
      <Typography
        fontWeight="bold"
        fontSize="1.5rem"
        textAlign="center"
        marginBottom={8}
        marginTop={8}
      >
        No attendance entries.
      </Typography>
    );
  }

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
      <SessionStats entries={setDataEntries} />
      <Filters
        filter1='helpStartUnixMs'
        filter2='helpEndUnixMs'
        filter3='helper'
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilter}
      />
      <div style={{ overflowY: 'scroll', height: '32rem', padding: 4, fontSize: '1.5rem' }}>
        <table
          style={{
            borderCollapse: 'collapse',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginBottom: 8,
            marginTop: 8,
            borderRadius: '8px',
            overflow: 'hidden',
            width: '100%',
            boxSizing: 'border-box'
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
                      paddingLeft: '16px',
                      paddingRight: '16px',
                      paddingTop: '8px',
                      paddingBottom: '8px',
                      textAlign: 'center',
                      fontSize: '1.25rem',
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
      </div>
    </>
  );
}

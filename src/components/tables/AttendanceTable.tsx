import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef
} from '@tanstack/react-table';
import { useMemo, useState, useEffect } from 'react';
import { millisecondsToMinutesSeconds } from '../../utils/utils';
import { Typography } from '@mui/material';
import SessionStats from './SessionStats';
import AttendanceModal from './table-outline/AttendanceModal';

type AttendanceTableProps = {
  entries: Attendance[];
}

export default function AttendanceTable({ entries }: AttendanceTableProps) {
  const [setDataEntries, setSetDataEntries] = useState<Attendance[]>([]);

  // Ensure state is updated when entries prop changes
  useEffect(() => {
    setSetDataEntries(entries);
  }, [entries]);

  const columns: ColumnDef<Attendance>[] = useMemo(() => [
    {
      id: 'sessionTime',
      header: 'Session Time',
      accessorFn: row => {
        const { minutes, seconds } = millisecondsToMinutesSeconds(
          row.helpEndUnixMs - row.helpStartUnixMs
        );

        return `${minutes} min. ${seconds} sec.`;
      },
    },
    {
      id: 'helpStartUnixMs',
      header: 'Help Start Date',
      accessorKey: 'helpStartUnixMs',
      cell: ({ getValue }) => {
        const date = new Date(getValue<number>());
        return `${date.toDateString()} - ${date.toLocaleTimeString()}`;
      }
    },
    {
      id: 'helpEndUnixMs',
      header: 'Help End Date',
      accessorKey: 'helpEndUnixMs',
      cell: ({ getValue }) => {
        const date = new Date(getValue<number>());
        return `${date.toDateString()} - ${date.toLocaleTimeString()}`;
      }
    },
    {
      id: 'activeTimeMs',
      header: 'Active Time',
      accessorKey: 'activeTimeMs',
      cell: ({ getValue }) => {
        const { minutes, seconds } = millisecondsToMinutesSeconds(getValue<number>());
        return `${minutes} min. ${seconds} sec.`;
      }
    },
    {
      id: 'helpedMembers',
      header: 'Helped Members',
      accessorKey: 'helpedMembers',
      cell: ({ getValue }) => {
        return getValue<{ displayName: string; id: string }[]>()
          .map(member => member.displayName)
          .join(', ');
      }
    },
    {
      id: 'helper',
      header: 'Helper',
      accessorKey: 'helper',
      cell: ({ getValue }) => <p>{getValue<{ displayName: string; id: string }>().displayName}</p>
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
      <div style={{ overflowY: 'scroll', height: '32rem', padding: 4 }}>
        <table
          style={{
            borderCollapse: 'collapse',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginBottom: 8,
            marginTop: 8
          }}
        >
          <thead style={{ position: 'sticky', top: 0 }}>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id} style={{ fontWeight: 600 }}>
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
                {row.getVisibleCells().map(cell => (
                  <td
                    key={cell.id}
                    style={{
                      border: '1px solid white',
                      padding: 16,
                      textAlign: 'center'
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

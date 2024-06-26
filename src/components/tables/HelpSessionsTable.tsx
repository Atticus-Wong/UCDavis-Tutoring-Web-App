import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef
} from '@tanstack/react-table';
import { useMemo } from 'react';
import { millisecondsToMinutesSeconds } from '../../utils/utils';
import { Typography } from '@mui/material';
import SessionStats from './SessionStats';
import HelpSessionModal from './table-outline/HelpSessionsModal';

const columnHelper = createColumnHelper<HelpSession>();

type HelpSessionsTableProps = {
  entries: HelpSession[];
};

export default function HelpSessionsTable({ entries }: HelpSessionsTableProps) {
  const columns: ColumnDef<HelpSession>[] = useMemo(() => [
    {
      id: 'sessionTime',
      header: 'Session Time',
      accessorFn: row => {
        const { minutes, seconds } = millisecondsToMinutesSeconds(
          row.sessionEndUnixMs - row.sessionStartUnixMs
        );

        return `${minutes} min. ${seconds} sec.`;
      },
    },
    {
      id: 'sessionStartUnixMs',
      header: 'Session Start',
      accessorKey: 'sessionStartUnixMs',
      cell: ({ getValue }) => {
        const date = new Date(getValue<number>());
        return `${date.toDateString()} - ${date.toLocaleTimeString()}`;
      }
    },
    {
      id: 'sessionEndUnixMs',
      header: 'Session End',
      accessorKey: 'sessionEndUnixMs',
      cell: ({ getValue }) => {
        const date = new Date(getValue<number>());
        return `${date.toDateString()} - ${date.toLocaleTimeString()}`;
      }
    },
    {
      id: 'waitTimeMs',
      header: 'Wait Time',
      accessorKey: 'waitTimeMs',
      cell: ({ getValue }) => {
        const { minutes, seconds } = millisecondsToMinutesSeconds(getValue<number>());
        return `${minutes} min. ${seconds} sec.`;
      }
    },
    {
      id: 'waitStart',
      header: 'Wait Start',
      accessorKey: 'waitStart',
      cell: ({ getValue }) => {
        const date = new Date(getValue<number>());
        return `${date.toDateString()} - ${date.toLocaleTimeString()}`;
      }
    },
    {
      id: 'queueName',
      header: 'Queue',
      accessorKey: 'queueName',
      cell: ({ getValue }) => getValue<string>()
    },
    {
      id: 'helper',
      header: 'Helper',
      accessorKey: 'helper',
      cell: ({ getValue }) => <p>{getValue<{ id: string; displayName: string }>().displayName}</p>
    },
    {
      id: 'student',
      header: 'Student',
      accessorKey: 'student',
      cell: ({ getValue }) => <p>{getValue<{ id: string; displayName: string }>().displayName}</p>
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        const currentEntry: HelpSession = {
          helper: row.original.helper,
          queueName: row.original.queueName,
          sessionEndUnixMs: row.original.sessionEndUnixMs,
          sessionStartUnixMs: row.original.sessionStartUnixMs,
          student: row.original.student,
          waitStart: row.original.waitStart,
          waitTimeMs: row.original.waitTimeMs
        };
        return (
          <HelpSessionModal
            entries={entries}
            entry={currentEntry}
          />
        );
      }
    }
  ], [entries]);
  const table = useReactTable({
    columns,
    data: entries,
    getCoreRowModel: getCoreRowModel()
  });

  if (!entries.length) {
    return (
      <Typography
        fontWeight="bold"
        fontSize="1.5rem"
        textAlign="center"
        marginBottom={8}
        marginTop={8}
      >
        No help session entries.
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
        Help Sessions
      </Typography>
      <SessionStats entries={entries} />
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

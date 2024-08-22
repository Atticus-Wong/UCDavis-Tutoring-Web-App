import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef
} from '@tanstack/react-table';
import { useState, useMemo, useEffect } from 'react';
import { millisecondsToMinutesSeconds } from '../../utils/utils';
import { Typography } from '@mui/material';
import SessionStats from './SessionStats';
import HelpSessionModal from './table-outline/HelpSessionsModal';
import { BRAND_COLOR } from '@/src/utils/constants';

type HelpSessionsTableProps = {
  entries: HelpSession[];
};

export default function HelpSessionsTable({ entries }: HelpSessionsTableProps) {
  const [dataEntries, setDataEntries] = useState<HelpSession[]>([]);

  useEffect(() => {
    setDataEntries(entries);
  }, [entries]);

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
      id: 'waitTime',
      header: 'Wait Time',
      accessorFn: row => {
        const { minutes, seconds } = millisecondsToMinutesSeconds(
          row.sessionStartUnixMs - row.waitStart
        );
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
        return (
          <HelpSessionModal
            entries={dataEntries}
            entry={row.original}
            setData={setDataEntries}
          />
        );
      }
    }
  ], [dataEntries]);

  const table = useReactTable({
    columns,
    data: dataEntries,
    getCoreRowModel: getCoreRowModel()
  });

  if (!dataEntries.length) {
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
      <SessionStats entries={dataEntries} />
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
            boxSizing: 'border-box',
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
                      padding: '16px',
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
                      maxWidth: '300px',
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

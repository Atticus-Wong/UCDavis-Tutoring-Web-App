import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions
} from 'chart.js';
import { Typography, Box } from '@mui/material';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type LineGraphProps = {
  title: string,
  entries: number[],
  labels: string[]
}

const LineGraph: React.FC<LineGraphProps> = ({ title, entries, labels }) => {
  const tempdata: ChartData<'line'> = {
    labels: labels,
    datasets: [
      {
        label: title,
        data: entries,
        borderColor: 'rgb(189, 159, 49)',
        backgroundColor: 'rgba(189, 159, 49, 0.5)',
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
      },
    },
  };

  return (
    <>
    <Box sx={{ width: '100%', maxWidth: '100%'}}>
      <Line options={options} data={tempdata} />
    </Box>
    </>
  );
};

export default LineGraph;
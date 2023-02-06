import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
);

export default function LineChart({label, labels, data}) {
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          }
        },
        hover: {
            mode: "nearest",
            intersect: true,
        },
    };

    const chartData = {
    labels,
    datasets: [
            {
            label: label,
            data: data,
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    return <Line options={options} data={chartData} />;
}

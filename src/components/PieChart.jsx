import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Items by Department',
        font: {
          size: 16,
        },
      },
    },
  };

  const colors = [
    '#0A2A5E',
    '#1B2A4A',
    '#2E4A7C',
    '#4169A8',
    '#6B7280',
    '#9CA3AF',
    '#D1D5DB',
  ];

  const chartData = {
    labels: data.map(item => item.name),
    datasets: [
      {
        label: 'Items',
        data: data.map(item => item.count),
        backgroundColor: colors.slice(0, data.length),
        borderColor: '#ffffff',
        borderWidth: 2,
      },
    ],
  };

  return <Pie options={options} data={chartData} />;
};

export default PieChart;

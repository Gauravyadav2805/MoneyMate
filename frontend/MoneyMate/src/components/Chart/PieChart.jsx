import React from 'react'
import { Pie } from 'react-chartjs-2'

function PieChart({data,label}) {
    const chartData = {
        labels: Object.keys(data),
        datasets: [
          {
            label: label,
            data: Object.values(data),
            backgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#4BC0C0',
              '#9966FF',
              '#FF9F40',
            ],
            hoverBackgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#4BC0C0',
              '#9966FF',
              '#FF9F40',
            ],
          },
        ],
      };
  return (
    <div>
        <Pie data={chartData}/>
    </div>
  )
}

export default PieChart
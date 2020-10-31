import React from 'react';
import './LinePlot.css';

import { Line } from 'react-chartjs-2'


function LinePlot({countryData, countryName, caseType}) {
    let fillColor = 'rgba(255, 99, 132, 0.2)';
    if(caseType === 'recovered'){
      fillColor = 'rgba(53, 155, 53, 0.2)'
    }

    const data = {
        labels: countryData.dates,
        datasets: [
          {
            data: countryData.values,
            fill: true,
            backgroundColor: fillColor,
            borderColor: 'rgba(70, 67, 67, 0.2)',
            showLine: true,
            borderWidth:1,
            pointBorderWidth:5,
            pointRadius:1,
            maintainAspectRatio: false
          },
        ],
      }
      
    const options = {
    scales: {
        yAxes: [
        {
            ticks: {
            beginAtZero: true,
            },
        },
        ],
    },
    }

    return (
        <div className='lineplot'>
            <h3>{countryName? countryName : 'Worldwide'} new cases</h3>
            <Line data={data} options={options} legend={false} height={180}/>
        </div>
    )
}

export default LinePlot;

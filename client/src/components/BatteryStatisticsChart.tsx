import React, { FC, useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const BatteryStatisticsChart:FC<any> = ({ batteryStatistics }) => {
  const [chartOptions, setChartOptions] = useState<any>(null);

  useEffect(() => {

    const newChartOptions = {
      chart: {
        type: 'pie',
      },
      labels: [
        'Total Watt Capacity',
        'Average Watt Capacity',
      ],
      series: [batteryStatistics.totalWattCapacity, batteryStatistics.averageWattCapacity],
      colors: ['#36A2EB', '#FFCE56'],
      legend: {
        show: true,
        position: 'bottom',
        horizontalAlign: 'center',
        markers: {
          fillColors: ['#36A2EB', '#FFCE56'],
        },
        formatter: function (seriesName: string, opts: any) {
          return opts.w.globals.series[opts.seriesIndex] + ' - ' + seriesName;
        },
      },
      plotOptions: {
        pie: {
          donut: {
            size: '70%',
          },
        },
      },
    };

    setChartOptions(newChartOptions);
  }, [batteryStatistics]);

  return (
    <div>
      {chartOptions ? (
        <ReactApexChart
          options={chartOptions}
          series={chartOptions.series}
          type={chartOptions.chart.type}
          height={350}
        />
      ) : null}
    </div>
  );
};

export default BatteryStatisticsChart;

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
  } from 'chart.js';
  ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    ChartDataLabels
  );
  import { Pie } from 'react-chartjs-2';
  import type { ChartOptions } from 'chart.js';
  import ChartDataLabels from 'chartjs-plugin-datalabels';
const PieChart = ({ labels, title, data, bgColors, borderColors }) => {
    const chartData = {
        labels,
        datasets: [
          {
            label: title ?? '',
            data,
            backgroundColor: bgColors,
            borderColor: borderColors,
            borderWidth: 1,
          },
        ],
      };    
    const options: ChartOptions<'pie'> = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top' as const,
          },
          title: {
            display: Boolean(title),
            text: title ?? '',
          },
          datalabels: {
            color: '#fff',           
            anchor: 'center', 
            align: 'center',
            font: {
              weight: 'bold',
              size: 14
            },
            formatter: (value) => {
                return value
            }
          }
        },
      };
    
      return <Pie data={chartData} options={options} />;
}
export default PieChart
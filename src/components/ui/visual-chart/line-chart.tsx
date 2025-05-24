import { Line } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement, 
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  ChartJS.unregister(ChartDataLabels);
const LineChart = ({data, title}) => {
      const chartData = {
         datasets: data?.map(set => ({
           label: set?.labels || set?.label,
           data: set?.data,
           fill: false,                    
           tension: 0.4,   
           borderWidth: 2,
           backgroundColor: 'rgba(75,192,192,0.4)',
           borderColor: 'rgba(75,192,192,1)',
           pointRadius: 3,
           pointHoverRadius: 6,
         })),
       };
       const options = {
         responsive: true,
         plugins: {
           legend: { position: 'top' as const },
           title:  { display: Boolean(title), text: title ?? '' },
         },
         scales: {
           x: {               
             display: true,
             title: { display: true, text: 'Month' },
           },
           y: {
             beginAtZero: true,
             title: { display: true, text: 'Value' },
           },
         },
       };
     
       return <Line data={chartData} options={options} />;
}
export default LineChart
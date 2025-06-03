import { Bar } from 'react-chartjs-2';
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
  const AgentBarChart = ({labels, data, title, chartRef}) => {
      const chartData = {
          labels,
          datasets: [
            {
              label: title || 'Dataset',
              data, 
              backgroundColor: 'rgba(54, 162, 235, 0.5)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
            },
          ],
        };
        const options = {
          responsive: true,
          plugins: {
            legend: { position: 'top' as const},
            title:  { display: !!title, text: title },
          },
          scales: {
            y: { beginAtZero: true },
          },
        };
      
        return <Bar ref={chartRef} data={chartData} options={options} />;
  }
  export default AgentBarChart
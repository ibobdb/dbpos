import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
export default function SalesPerYear({ data }) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Perbandingan tiap tahun',
      },
    },
  };

  const labels = data && data.map((item => item.tahun));
  const dataChart = {
    labels,
    datasets: [
      {
        label: 'Penjualan',
        data: data && data.map((item => item.total_sale)),
        backgroundColor: 'rgba(255, 99, 132, 0.8)',
      },
      {
        label: 'Modal',
        data: data && data.map((item => item.total_cost)),
        backgroundColor: 'rgba(54, 162, 235, 0.8)',
      },
      {
        label: 'Margin',
        data: data && data.map((item => item.margin)),
        backgroundColor: 'rgba(255, 206, 86, 0.8)',
      },
    ],
  };
  return (
    <div>
      <Bar options={options} data={dataChart} />
    </div>
  )
}
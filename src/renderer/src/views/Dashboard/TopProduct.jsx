import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);
export default function TopProduct({ data }) {
  const label = [];
  const qtyArr = [];
  data && data.map(item => {
    label.push(item.product_name);
    qtyArr.push(item.total);
  })
  const dataChart = {
    labels: label,
    datasets: [
      {
        label: '# Total',
        data: qtyArr,
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',   // Merah
          'rgba(54, 162, 235, 0.8)',    // Biru
          'rgba(255, 206, 86, 0.8)',    // Kuning
          'rgba(75, 192, 192, 0.8)',    // Hijau tosca
          'rgba(153, 102, 255, 0.8)',   // Ungu
          'rgba(255, 159, 64, 0.8)',    // Jingga
          'rgba(0, 128, 0, 0.8)',       // Hijau
          'rgba(255, 0, 255, 0.8)',     // Magenta
          'rgba(128, 0, 128, 0.8)',     // Ungu tua
          'rgba(0, 128, 128, 0.8)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 0.1)',   // Merah
          'rgba(54, 162, 235, 0.1)',    // Biru
          'rgba(255, 206, 86, 0.1)',    // Kuning
          'rgba(75, 192, 192, 0.1)',    // Hijau tosca
          'rgba(153, 102, 255, 0.1)',   // Ungu
          'rgba(255, 159, 64, 0.1)',    // Jingga
          'rgba(0, 128, 0, 0.1)',       // Hijau
          'rgba(255, 0, 255, 0.1)',     // Magenta
          'rgba(128, 0, 128, 0.1)',     // Ungu tua
          'rgba(0, 128, 128, 0.1)'
        ],
        borderWidth: 1,
      },
    ],
  }
  return (
    <div>
      <Pie data={dataChart} />
    </div>
  )
}
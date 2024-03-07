import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { getRandomColor } from '../../common/colors';
import axios from 'axios';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
export default function SalesStat({ year }) {
  const [data, setData] = useState([])
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Statistik Penjualan',
      },
    },
  };
  const labels = ['January', 'February', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  const recommendedColors = [
    'rgba(255, 99, 132, 0.8)',   // Merah
    'rgba(54, 162, 235, 0.8)',    // Biru
    'rgba(255, 206, 86, 0.8)',    // Kuning
    'rgba(75, 192, 192, 0.8)',    // Hijau tosca
    'rgba(153, 102, 255, 0.8)',   // Ungu
    'rgba(255, 159, 64, 0.8)',    // Jingga
    'rgba(0, 128, 0, 0.8)',       // Hijau
    'rgba(255, 0, 255, 0.8)',     // Magenta
    'rgba(128, 0, 128, 0.8)',     // Ungu tua
    'rgba(0, 128, 128, 0.8)'      // Biru hijau
  ];
  const getData = async () => {
    try {
      await axios.get(`${import.meta.env.RENDERER_VITE_BASE_URL}/dashboard/stat?year=${year}`).then(response => {
        setData(response.data.results);
      })
    } catch (error) {
      throw error
    }
  }
  const costArr = () => {
    const Arr = Array.from({ length: 12 }).fill(0);
    data && data.map((item) => {
      const bulan = parseInt(item.bulan);
      if (bulan >= 1 && bulan <= 12) {
        // Masukkan total_cost ke indeks yang sesuai dengan bulan (indeks dimulai dari 0)
        Arr[bulan - 1] = item.total_cost;
      }
    })
    return Arr;
  }
  const salesArr = () => {
    const Arr = Array.from({ length: 12 }).fill(0);
    data && data.map((item) => {
      const bulan = parseInt(item.bulan);
      if (bulan >= 1 && bulan <= 12) {
        // Masukkan total_cost ke indeks yang sesuai dengan bulan (indeks dimulai dari 0)
        Arr[bulan - 1] = item.total_sale;
      }
    })
    return Arr;
  }
  const marginArr = () => {
    const Arr = Array.from({ length: 12 }).fill(0);
    data && data.map((item) => {
      const bulan = parseInt(item.bulan);
      if (bulan >= 1 && bulan <= 12) {
        // Masukkan total_cost ke indeks yang sesuai dengan bulan (indeks dimulai dari 0)
        Arr[bulan - 1] = item.margin;
      }
    })
    return Arr;
  }

  useEffect(() => {
    getData()
  }, [year])

  const dataChart = {
    labels,
    datasets: [
      {
        label: 'Penjualan',
        data: salesArr(),
        borderColor: recommendedColors[0],
        backgroundColor: recommendedColors[0]
      },
      {
        label: 'Modal',
        data: costArr(),
        borderColor: recommendedColors[1],
        backgroundColor: recommendedColors[1]
      },
      {
        label: 'Margin',
        data: marginArr(),
        borderColor: recommendedColors[2],
        backgroundColor: recommendedColors[2]
      }
    ]
  }
  return (
    <div>
      <Line options={options} data={dataChart} />
    </div>
  )
}
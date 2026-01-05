import { useEffect, useState } from "react";
import { Bar, Pie, Doughnut, Line, PolarArea, Radar } from "react-chartjs-2";
import Sidebar from "../organisms/Sidebar";
import Navbar from "../organisms/Navbar";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  RadialLinearScale,
  Tooltip,
  Legend,
  Title,
  Filler,
} from "chart.js";

// Registrasi semua elemen termasuk RadialLinearScale untuk Radar & Polar
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  RadialLinearScale,
  Tooltip,
  Legend,
  Title,
  Filler
);

export default function MultiChart() {
  const [dataChart, setDataChart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/menu/rekap/kategori")
      .then((res) => res.json())
      .then((data) => {
        setDataChart(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Gagal mengambil data:", err);
        setIsLoading(false);
      });
  }, []);

  const labels = dataChart.map((item) => item.kategori);
  const counts = dataChart.map((item) => item.jumlah);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Jumlah",
        data: counts,
        backgroundColor: [
          "rgba(59, 130, 246, 0.7)",
          "rgba(16, 185, 129, 0.7)",
          "rgba(245, 158, 11, 0.7)",
          "rgba(239, 68, 68, 0.7)",
          "rgba(139, 92, 246, 0.7)",
          "rgba(236, 72, 153, 0.7)",
          "rgba(20, 184, 166, 0.7)",
          "rgba(100, 116, 139, 0.7)",
        ],
        borderColor: "white",
        borderWidth: 2,
      },
    ],
  };

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "bottom", labels: { boxWidth: 10, font: { size: 10 } } },
    },
  };

  const scalarOptions = {
    ...commonOptions,
    scales: {
      y: { beginAtZero: true, grid: { color: "#f1f5f9" } },
      x: { grid: { display: false } },
    },
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar />
      <div className="ml-64 flex flex-col flex-1 h-full overflow-hidden">
        <Navbar />
        <div className="p-6 overflow-y-auto h-full">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-800">Analitik Data</h2>
            <p className="text-slate-500">8 Visualisasi data berdasarkan kategori menu.</p>
          </div>

          {/* Grid: 2 Kolom */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-20">
            
            {/* 1. Bar Chart Vertical */}
            <ChartCard title="Vertical Bar Chart">
              <Bar data={{ ...chartData, datasets: [{ ...chartData.datasets[0], borderRadius: 8 }] }} options={scalarOptions} />
            </ChartCard>

            {/* 2. Horizontal Bar Chart */}
            <ChartCard title="Horizontal Bar Chart">
              <Bar data={chartData} options={{ ...scalarOptions, indexAxis: "y" }} />
            </ChartCard>

            {/* 3. Area Chart */}
            <ChartCard title="Area Chart">
              <Line data={{ ...chartData, datasets: [{ ...chartData.datasets[0], fill: true, tension: 0.4, backgroundColor: "rgba(59, 130, 246, 0.2)", borderColor: "#3b82f6" }] }} options={scalarOptions} />
            </ChartCard>

            {/* 4. Radar Chart */}
            <ChartCard title="Radar Chart">
              <Radar data={{ ...chartData, datasets: [{ ...chartData.datasets[0], backgroundColor: "rgba(139, 92, 246, 0.2)", borderColor: "#8b5cf6" }] }} options={commonOptions} />
            </ChartCard>

            {/* 5. Doughnut Chart */}
            <ChartCard title="Doughnut Chart">
              <Doughnut data={chartData} options={commonOptions} />
            </ChartCard>

            {/* 6. Pie Chart */}
            <ChartCard title="Pie Chart">
              <Pie data={chartData} options={commonOptions} />
            </ChartCard>

            {/* 7. Polar Area Chart */}
            <ChartCard title="Polar Area Chart">
              <PolarArea data={chartData} options={commonOptions} />
            </ChartCard>

            {/* 8. Stepped Line Chart */}
            <ChartCard title="Stepped Line Chart">
              <Line data={{ ...chartData, datasets: [{ ...chartData.datasets[0], stepped: true, borderColor: "#10b981", borderWidth: 3 }] }} options={scalarOptions} />
            </ChartCard>

          </div>
        </div>
      </div>
    </div>
  );
}

function ChartCard({ title, children }) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
      <h3 className="text-sm font-bold mb-4 text-slate-600 uppercase tracking-wider">{title}</h3>
      <div className="h-[280px]">{children}</div>
    </div>
  );
}
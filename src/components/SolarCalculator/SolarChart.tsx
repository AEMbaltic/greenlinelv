import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

interface SolarChartProps {
  withoutPanels: number[];
  withPanels: number[];
  withBattery: number[];
}

const SolarChart = ({ withoutPanels, withPanels, withBattery }: SolarChartProps) => {
  const labels = Array.from({ length: 26 }, (_, i) => `${i}`);

  const data = {
    labels,
    datasets: [
      {
        label: "Bez paneļiem",
        data: withoutPanels,
        borderColor: "hsl(0, 70%, 55%)",
        backgroundColor: "hsla(0, 70%, 55%, 0.05)",
        borderWidth: 2.5,
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 5,
      },
      {
        label: "Tikai paneļi",
        data: withPanels,
        borderColor: "hsl(82, 100%, 35%)",
        backgroundColor: "hsla(82, 100%, 35%, 0.08)",
        borderWidth: 2.5,
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 5,
      },
      {
        label: "Paneļi + Akumulators",
        data: withBattery,
        borderColor: "hsl(200, 85%, 50%)",
        backgroundColor: "hsla(200, 85%, 50%, 0.05)",
        borderWidth: 2.5,
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          padding: 20,
          font: {
            family: "'Plus Jakarta Sans', sans-serif",
            size: 13,
            weight: 600 as const,
          },
        },
      },
      tooltip: {
        backgroundColor: "hsl(210, 20%, 16%)",
        titleFont: { family: "'Plus Jakarta Sans', sans-serif", size: 13 },
        bodyFont: { family: "'Plus Jakarta Sans', sans-serif", size: 12 },
        padding: 12,
        cornerRadius: 10,
        callbacks: {
          label: (context: any) => `${context.dataset.label}: €${context.parsed.y.toLocaleString("lv-LV")}`,
          title: (items: any) => `Gads ${items[0].label}`,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Gadi",
          font: { family: "'Plus Jakarta Sans', sans-serif", size: 13, weight: 600 as const },
          color: "hsl(210, 10%, 50%)",
        },
        grid: { display: false },
        ticks: {
          font: { family: "'Plus Jakarta Sans', sans-serif", size: 11 },
          color: "hsl(210, 10%, 60%)",
        },
      },
      y: {
        title: {
          display: true,
          text: "Kumulatīvās izmaksas (€)",
          font: { family: "'Plus Jakarta Sans', sans-serif", size: 13, weight: 600 as const },
          color: "hsl(210, 10%, 50%)",
        },
        grid: {
          color: "hsl(210, 15%, 94%)",
        },
        ticks: {
          font: { family: "'Plus Jakarta Sans', sans-serif", size: 11 },
          color: "hsl(210, 10%, 60%)",
          callback: (value: any) => `€${(value / 1000).toFixed(0)}k`,
        },
      },
    },
  };

  return (
    <div className="h-[350px] sm:h-[420px]">
      <Line data={data} options={options} />
    </div>
  );
};

export default SolarChart;

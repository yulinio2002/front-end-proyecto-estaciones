import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

interface Props {
  tipo: string;
  variable: string;
}

const ChartSection: React.FC<Props> = ({ tipo, variable }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    const datos = Array.from({ length: 24 }, (_, i) => ({
      x: `${i}:00`,
      y: +(Math.random() * 100).toFixed(2),
    }));

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    if (chartRef.current) {
      chartInstance.current = new Chart(chartRef.current.getContext('2d')!, {
        type: tipo as any,
        data: {
          labels: datos.map((d) => d.x),
          datasets: [
            {
              label: variable,
              data: datos.map((d) => d.y),
              borderWidth: 1,
              borderColor: 'blue',
              backgroundColor:
                tipo === 'bar' ? 'rgba(59, 130, 246, 0.7)' : undefined,
              fill: tipo === 'line',
              tension: tipo === 'line' ? 0.4 : 0,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [tipo, variable]);

  return <canvas ref={chartRef} height={100} className="w-full" />;
};

export default ChartSection;

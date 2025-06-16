import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import type { Medicion, Parametro } from '../types';

interface ChartSectionProps {
  tipo: 'line' | 'bar'
  variable: string
  data: Medicion[]    
  parametros: Parametro[]         // ← acepta el array de mediciones
}

// const ChartSection: React.FC<ChartSectionProps> = ({ tipo, variable,data }) => {
//   const chartRef = useRef<HTMLCanvasElement | null>(null);
//   const chartInstance = useRef<Chart | null>(null);

//   useEffect(() => {
//     const labels = data.map(d => d.fecha);
//     const valores = data.map(d => d.valor);

//     if (chartInstance.current) {
//       chartInstance.current.destroy();
//     }

//     if (chartRef.current) {
//     chartInstance.current = new Chart(chartRef.current.getContext('2d')!, {
//       type: tipo as any,
//       data: {
//         labels,
//         datasets: [
//           {
//             label: variable,
//             data: valores,
//             borderWidth: 1,
//             borderColor: 'blue',
//             backgroundColor:
//               tipo === 'bar' ? 'rgba(59, 130, 246, 0.7)' : undefined,
//             fill: tipo === 'line',
//             tension: tipo === 'line' ? 0.4 : 0,
//           },
//         ],
//       },
//       options: {
//         responsive: true,
//         scales: {
//           y: {
//             beginAtZero: true,
//           },
//         },
//       },
//     });
//   }
// }, [tipo, variable, data]);

//   return <canvas ref={chartRef} height={100} className="w-full" />;
// };

const ChartSection: React.FC<ChartSectionProps> = ({ tipo, variable, data,parametros }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    if (chartRef.current) {
      let datasets = [];
      let labels: string[] = [];

      if (variable === 'Todas') {
        // Agrupa por parámetro
        const grouped: Record<string, Medicion[]> = {};
        data.forEach(d => {
          if (!grouped[d.parametro]) grouped[d.parametro] = [];
          grouped[d.parametro].push(d);
        });
        // Usa las fechas de todos los datos como labels
        labels = Array.from(new Set(data.map(d => d.fecha))).sort();

        datasets = Object.entries(grouped).map(([paramId, values], idx) => ({
  label: parametros.find(p => p.id === Number(paramId))?.nombre || `Variable ${paramId}`,
  data: labels.map(lab => {
    const found = values.find(v => v.fecha === lab);
    return found ? found.valor : null;
  }),
  borderWidth: 1,
  borderColor: ['blue', 'red', 'green', 'orange'][idx % 4],
  backgroundColor: ['rgba(59,130,246,0.7)', 'rgba(220,38,38,0.7)', 'rgba(16,185,129,0.7)', 'rgba(251,191,36,0.7)'][idx % 4],
  fill: tipo === 'line',
  tension: tipo === 'line' ? 0.4 : 0,
}));
      } else {
        labels = data.map(d => d.fecha);
        datasets = [
          {
            label: variable,
            data: data.map(d => d.valor),
            borderWidth: 1,
            borderColor: 'blue',
            backgroundColor: tipo === 'bar' ? 'rgba(59,130,246,0.7)' : undefined,
            fill: tipo === 'line',
            tension: tipo === 'line' ? 0.4 : 0,
          },
        ];
      }

      chartInstance.current = new Chart(chartRef.current.getContext('2d')!, {
        type: tipo as any,
        data: { labels, datasets },
        options: {
          responsive: true,
          scales: { y: { beginAtZero: true } },
        },
      });
    }
  }, [tipo, variable, data,parametros]);

  return <canvas ref={chartRef} width={50} height={10} className="w-full"  />;
};

export default ChartSection;

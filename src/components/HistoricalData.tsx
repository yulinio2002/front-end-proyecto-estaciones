import React, { useEffect, useState } from 'react';

interface Datum {
  fecha: string;
  presion: number;
  temperatura: number;
  viento: number;
  humedad: number;
}

const HistoricalData: React.FC = () => {
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [filtro, setFiltro] = useState('Todos');
  const [datos, setDatos] = useState<Datum[]>([]);

  useEffect(() => {
    // Generar 20 filas de datos ficticios
    const rows: Datum[] = Array.from({ length: 5 }, (_, i) => ({
      fecha: `05/05/2025, 16:${10 + i}`,
      presion: 1000 + Math.random() * 20,
      temperatura: 25 + Math.random() * 5,
      viento: 3 + Math.random() * 2,
      humedad: 50 + Math.random() * 20,
    }));
    setDatos(rows);
  }, []);

  const filtrarDatos = () => {
    alert('Función de filtrado aún no implementada');
  };

  const exportarExcel = () => {
    alert('Función de exportar a Excel aún no implementada');
  };

  return (
    <div className="mt-12">
      <h5 className="text-xl font-semibold mb-4">Datos Históricos</h5>
      <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="date"
          value={fechaInicio}
          onChange={(e) => setFechaInicio(e.target.value)}
          className="border rounded p-2 max-w-xs"
          placeholder="Fecha inicio"
        />
        <input
          type="date"
          value={fechaFin}
          onChange={(e) => setFechaFin(e.target.value)}
          className="border rounded p-2 max-w-xs"
          placeholder="Fecha fin"
        />
        <select
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="border rounded p-2 max-w-xs"
        >
          <option>Todos</option>
        </select>
        <button
          onClick={filtrarDatos}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Filtrar
        </button>
        <button
          onClick={exportarExcel}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Exportar a Excel
        </button>
      </div>
      <div className="overflow-x-auto border rounded">
        <table className="min-w-full table-fixed border-collapse border border-gray-300 text-center">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 p-2">Fecha/Hora</th>
              <th className="border border-gray-300 p-2">Presión (hPa)</th>
              <th className="border border-gray-300 p-2">Temperatura (°C)</th>
              <th className="border border-gray-300 p-2">Velocidad Aire (m/s)</th>
              <th className="border border-gray-300 p-2">Humedad (%)</th>
            </tr>
          </thead>
          <tbody>
            {datos.map((d, idx) => (
              <tr key={idx} className="even:bg-gray-50">
                <td className="border border-gray-300 p-2">{d.fecha}</td>
                <td className="border border-gray-300 p-2">
                  {d.presion.toFixed(1)}
                </td>
                <td className="border border-gray-300 p-2">
                  {d.temperatura.toFixed(1)}
                </td>
                <td className="border border-gray-300 p-2">
                  {d.viento.toFixed(1)}
                </td>
                <td className="border border-gray-300 p-2">
                  {d.humedad.toFixed(1)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoricalData;

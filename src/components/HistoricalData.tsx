import React from 'react';
import type { Medicion } from '../interfaces';

interface HistoricalDataProps {
  data: Medicion[];
}

const HistoricalData: React.FC<HistoricalDataProps> = ({ data }) => {
  return (
    <div className="mt-12">
      <h5 className="text-xl font-semibold mb-4">Datos Históricos</h5>
      <div className="overflow-x-auto border rounded">
        <table className="min-w-full table-fixed border-collapse border border-gray-300 text-center">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 p-2">Fecha/Hora</th>
              <th className="border border-gray-300 p-2">Parámetro</th>
              <th className="border border-gray-300 p-2">Valor</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              <tr>
                <td colSpan={3} className="p-4 text-gray-500">Sin datos</td>
              </tr>
            ) : (
              data.map((d) => (
                <tr key={d.idMedicion} className="even:bg-gray-50">
                  <td className="border border-gray-300 p-2">{new Date(d.fecha).toLocaleString()}</td>
                  <td className="border border-gray-300 p-2">{d.parametro}</td>
                  <td className="border border-gray-300 p-2">{d.valor.toFixed(1)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoricalData;
// src/components/AlertsTab.tsx
import React, { useState } from 'react';

const AlertsTab: React.FC = () => {
  const [umbralTemp, setUmbralTemp] = useState<number>(30);
  const [umbralHumedad, setUmbralHumedad] = useState<number>(40);

  const guardarAlertas = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí se enviaría a backend; por ahora solo mostramos un mensaje
    alert(`Guardado: Temp máx = ${umbralTemp}°C, Humedad mín = ${umbralHumedad}%`);
  };

  return (
    <div className="space-y-4">
      <h4 className="text-xl font-semibold">Configuración de Alertas</h4>
      <form onSubmit={guardarAlertas} className="space-y-4 max-w-md">
        <div>
          <label htmlFor="umbralTemp" className="block mb-1 font-medium">
            Temperatura máxima (°C)
          </label>
          <input
            type="number"
            id="umbralTemp"
            value={umbralTemp}
            onChange={e => setUmbralTemp(Number(e.target.value))}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label htmlFor="umbralHumedad" className="block mb-1 font-medium">
            Humedad mínima (%)
          </label>
          <input
            type="number"
            id="umbralHumedad"
            value={umbralHumedad}
            onChange={e => setUmbralHumedad(Number(e.target.value))}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Guardar Alertas
        </button>
      </form>
    </div>
  );
};

export default AlertsTab;

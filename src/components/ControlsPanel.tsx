import React from 'react';

interface Props {
  variable: string;
  setVariable: (v: string) => void;
  desde: string;
  setDesde: (v: string) => void;
  hasta: string;
  setHasta: (v: string) => void;
  tipo: string;
  setTipo: (v: string) => void;
  onDownload: () => void;
}

const ControlsPanel: React.FC<Props> = ({
  variable,
  setVariable,
  desde,
  setDesde,
  hasta,
  setHasta,
  tipo,
  setTipo,
  onDownload,
}) => {
  return (
    <div className="flex flex-wrap gap-4 items-end mb-6">
      <div>
        <label htmlFor="variable" className="block mb-1 font-semibold">
          Variable:
        </label>
        <select
          id="variable"
          value={variable}
          onChange={(e) => setVariable(e.target.value)}
          className="border rounded p-2 w-48"
        >
          <option>Presión (hPa)</option>
          <option>Temperatura (°C)</option>
          <option>Velocidad del Aire (m/s)</option>
          <option>Humedad (%)</option>
        </select>
      </div>
      <div>
        <label htmlFor="desde" className="block mb-1 font-semibold">
          Desde:
        </label>
        <input
          type="date"
          id="desde"
          value={desde}
          onChange={(e) => setDesde(e.target.value)}
          className="border rounded p-2"
        />
      </div>
      <div>
        <label htmlFor="hasta" className="block mb-1 font-semibold">
          Hasta:
        </label>
        <input
          type="date"
          id="hasta"
          value={hasta}
          onChange={(e) => setHasta(e.target.value)}
          className="border rounded p-2"
        />
      </div>
      <div>
        <label htmlFor="tipo" className="block mb-1 font-semibold">
          Tipo:
        </label>
        <select
          id="tipo"
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          className="border rounded p-2 w-36"
        >
          <option value="line">Línea</option>
          <option value="bar">Barras</option>
        </select>
      </div>
      <button
        onClick={onDownload}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
      >
        Descargar Gráfico
      </button>
    </div>
  );
};

export default ControlsPanel;

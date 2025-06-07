import React from 'react';
import Header from '../components/Header';
import DistrictTitleBar from '../components/DistrictTitleBar';
import SensorCards from '../components/SensorCards';
import ControlsPanel from '../components/ControlsPanel';
import ChartSection from '../components/ChartSection';
import HistoricalData from '../components/HistoricalData';

type SensorValues = {
  presion: string;
  temperatura: string;
  viento: string;
  humedad: string;
};

const SecondView: React.FC = () => {
  const [sensorValues, setSensorValues] = React.useState<SensorValues>({
    presion: '-',
    temperatura: '-',
    viento: '-',
    humedad: '-',
  });
  const [variable, setVariable] = React.useState('Presión (hPa)');
  const [desde, setDesde] = React.useState('');
  const [hasta, setHasta] = React.useState('');
  const [tipo, setTipo] = React.useState('line');
  const [distrito, setDistrito] = React.useState('Desconocido');

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const nombre = params.get('nombre');
    if (nombre) setDistrito(nombre);
  }, []);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setSensorValues({
        presion: (1000 + Math.random() * 20).toFixed(1),
        temperatura: (20 + Math.random() * 10).toFixed(1),
        viento: (0 + Math.random() * 10).toFixed(1),
        humedad: (40 + Math.random() * 40).toFixed(1),
      });
    }, 5000);

    setSensorValues({
      presion: (1000 + Math.random() * 20).toFixed(1),
      temperatura: (20 + Math.random() * 10).toFixed(1),
      viento: (0 + Math.random() * 10).toFixed(1),
      humedad: (40 + Math.random() * 40).toFixed(1),
    });

    return () => clearInterval(interval);
  }, []);

  const descargarGrafico = () => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const url = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = url;
      a.download = 'grafico.png';
      a.click();
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <DistrictTitleBar distrito={distrito} />
      <main className="container mx-auto p-6">
        <SensorCards {...sensorValues} />
        <ControlsPanel
          variable={variable}
          setVariable={setVariable}
          desde={desde}
          setDesde={setDesde}
          hasta={hasta}
          setHasta={setHasta}
          tipo={tipo}
          setTipo={setTipo}
          onDownload={descargarGrafico}
        />
        <ChartSection tipo={tipo} variable={variable} />
        <HistoricalData />
      </main>
    </div>
  );
};

export default SecondView;

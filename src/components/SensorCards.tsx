import React from 'react';

type SensorValues = {
  presion: string;
  temperatura: string;
  viento: string;
  humedad: string;
};

const SensorCards: React.FC<SensorValues> = ({
  presion,
  temperatura,
  viento,
  humedad,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-center mb-6">
      <div className="border p-4 rounded shadow">
        <div className="uppercase font-medium">presion</div>
        <strong className="text-2xl">{presion}</strong>
      </div>
      <div className="border p-4 rounded shadow">
        <div className="uppercase font-medium">temperatura</div>
        <strong className="text-2xl">{temperatura}</strong>
      </div>
      <div className="border p-4 rounded shadow">
        <div className="uppercase font-medium">velocidad del aire</div>
        <strong className="text-2xl">{viento}</strong>
      </div>
      <div className="border p-4 rounded shadow">
        <div className="uppercase font-medium">humedad</div>
        <strong className="text-2xl">{humedad}</strong>
      </div>
    </div>
  );
};

export default SensorCards;

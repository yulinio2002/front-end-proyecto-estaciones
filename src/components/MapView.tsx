// src/components/Map.tsx
import React, { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import type { Estacion } from '../types'

const Map: React.FC = () => {
  useEffect(() => {
    const map = L.map('map').setView([-12.0464, -77.0428], 11);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    const estaciones: Estacion[] = [
    {
      id: 1,
      nombre: 'Estación Miraflores',
      ubicacion: 'Miraflores',     // <— ahora está “ubicacion”
      lat: -12.1211,
      lng: -77.0301,
    },
    {
      id: 2,
      nombre: 'Estación San Isidro',
      ubicacion: 'San Isidro',
      lat: -12.0987,
      lng: -77.0365,
    },
    {
      id: 3,
      nombre: 'Estación La Molina',
      ubicacion: 'La Molina',
      lat: -12.0850,
      lng: -76.9350,
    },
    {
      id: 4,
      nombre: 'Estación Surco',
      ubicacion: 'Surco',
      lat: -12.1532,
      lng: -76.9716,
    },
  ]

    estaciones.forEach(est => {
      L.marker([est.lat, est.lng])
        .addTo(map)
        .bindPopup(
          `<strong>${est.nombre}</strong><br>
           <a href="usuarioSesion2?nombre=${encodeURIComponent(
             est.nombre
           )}">Ver datos</a>`
        );  
    });

    return () => {
      map.remove();
    };
  }, []);

  return <div id="map" className="flex-1 h-full" />;
};

export default Map;
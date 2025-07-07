// src/components/Map.tsx
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {listNodos } from '../services/nodos';
import type { Estacion } from '../types';
import { listEstaciones } from '../services/estaciones';

// Corrección de rutas de iconos por defecto de Leaflet
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({ iconRetinaUrl, iconUrl, shadowUrl });

const Map: React.FC = () => {
  const navigate = useNavigate();
  const mapRef = useRef<L.Map | null>(null);

  // Función para ver datos de la estación
  const handleVerDatos = async (estacion: Estacion) => {
    try {
      const nodos = await listNodos();
      const nodo = nodos.find(n => n.idEstacion === estacion.idEstacion);
      if (!nodo) {
        alert('No hay nodo asociado a esta estación');
        return;
      }
      navigate(
        `/usuarioSesion2?nombre=${encodeURIComponent(estacion.nombre)}&nodo=${nodo.idNodo}`
      );
    } catch (err) {
      alert('Error al buscar nodo');
      console.error(err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      navigate('/', { replace: true });
      return;
    }

    // Inicializar mapa
    mapRef.current = L.map('map').setView([-12.0464, -77.0428], 11);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(mapRef.current);

    // Cargar estaciones desde el servicio
    const cargarEstaciones = async () => {
      try {
        const estaciones = await listEstaciones();
        estaciones.forEach(est => {
          const marker = L.marker([est.latitud, est.longitud]).addTo(mapRef.current!);
            const popup = L.popup().setContent(
            `<div style="display: flex; flex-direction: column; align-items: flex-start;">
              <strong>${est.nombre}</strong>
              <button 
              id="btn-${est.idEstacion}" 
              style="
                margin-top: 8px;
                padding: 6px 16px;
                background-color: #2563eb;
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                font-size: 14px;
                transition: background 0.2s;
              "
              onmouseover="this.style.backgroundColor='#1d4ed8'"
              onmouseout="this.style.backgroundColor='#2563eb'"
              >
              Ver datos
              </button>
            </div>`
            );
          marker.bindPopup(popup);
          marker.on('popupopen', () => {
            const btn = document.getElementById(`btn-${est.idEstacion}`);
            btn?.addEventListener('click', () => handleVerDatos(est));
          });
        });
      } catch (err: any) {
        // Si no autorizado, forzar logout
        if (err.message.includes('401')) {
          localStorage.removeItem('jwtToken');
          navigate('/', { replace: true });
        } else {
          console.error('Error al cargar estaciones:', err);
        }
      }
    };

    cargarEstaciones();

    // Cleanup al desmontar
    return () => {
      mapRef.current?.remove();
    };
  }, [navigate]);

  return <div id="map" className="w-full h-full" />;
};

export default Map;

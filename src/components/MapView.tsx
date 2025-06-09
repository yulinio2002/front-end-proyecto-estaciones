// src/components/Map.tsx
import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import type { Estacion } from '../types'

// Esto corrige la ruta de los iconos por defecto de Leaflet
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png'
import iconUrl from 'leaflet/dist/images/marker-icon.png'
import shadowUrl from 'leaflet/dist/images/marker-shadow.png'
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
})

const Map: React.FC = () => {
  const navigate = useNavigate()
  const mapRef = useRef<L.Map | null>(null)

  useEffect(() => {
    // 1) Protejo la ruta: si no hay token, vuelvo al login
    const token = localStorage.getItem('jwtToken')
    if (!token) {
      navigate('/', { replace: true })
      return
    }

    // 2) Inicializo el mapa
    mapRef.current = L.map('map').setView([-12.0464, -77.0428], 11)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(mapRef.current)

    // 3) Traigo las estaciones del backend
    fetch('http://localhost:8081/api/estaciones', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        if (res.status === 401) {
          // token inválido o expirado
          localStorage.removeItem('jwtToken')
          navigate('/', { replace: true })
          throw new Error('No autorizado')
        }
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json() as Promise<Estacion[]>
      })
      .then(data => {
        data.forEach(est => {
          L.marker([est.latitud, est.longitud])
            .addTo(mapRef.current!)
            .bindPopup(
              `<strong>${est.nombre}</strong><br>` +
              `<a href="/usuarioSesion2?nombre=${encodeURIComponent(est.nombre)}">Ver datos</a>`
            )
        })
      })
      .catch(err => {
        console.error('Error al cargar estaciones:', err)
        // aquí podrías mostrar un toast al usuario
      })

    // 4) Cleanup al desmontar
    return () => {
      mapRef.current?.remove()
    }
  }, [navigate])

  // Asegúrate de que el contenedor tenga tamaño
  return <div id="map" className="w-full h-full" />
}

export default Map

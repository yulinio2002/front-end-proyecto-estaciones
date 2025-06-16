// src/components/Map.tsx
import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { listNodos } from '../services/nodos'
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

  const handleVerDatos = async (estacion: Estacion) => {
  try {
    // Obtiene todos los nodos
    const nodos = await listNodos()
    // Busca el nodo asociado a la estación seleccionada
    const nodo = nodos.find(n => n.idEstacion === estacion.idEstacion)
    if (!nodo) {
      alert('No hay nodo asociado a esta estación')
      return
    }
    // Navega a SecondView con el idNodo y nombre de la estación
    navigate(`/usuarioSesion2?nombre=${encodeURIComponent(estacion.nombre)}&nodo=${nodo.idNodo}`)
  } catch (err) {
    alert('Error al buscar nodo')
    console.error(err)
  }
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
            const marker = L.marker([est.latitud, est.longitud]).addTo(mapRef.current!)
            const popupContent = document.createElement('div')
            popupContent.innerHTML = `<strong>${est.nombre}</strong><br>`
            const button = document.createElement('button')
            button.textContent = 'Ver datos'
            button.onclick = () => handleVerDatos(est)
            popupContent.appendChild(button)
            marker.bindPopup(popupContent)
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

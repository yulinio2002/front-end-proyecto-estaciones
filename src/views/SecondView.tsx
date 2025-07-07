import React from 'react'
import Header from '../components/Header'
import DistrictTitleBar from '../components/DistrictTitleBar'
import SensorCards from '../components/SensorCards'
import ControlsPanel from '../components/ControlsPanel'
import ChartSection from '../components/ChartSection'
//import HistoricalData from '../components/HistoricalData'
import { listParametros } from '../services/parametros'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'
//import { getAllMedicionesByNodo } from '../services/mediciones'
import {
  getLastMedicionesByNodo,
  filterMediciones,
  getAllMedicionesByNodo 
} from '../services/mediciones'
import type { Medicion, Parametro } from '../types'

type SensorValues = {
  presion: string
  temperatura: string
  radiacion: string
  humedad: string
}
const variableMap: Record<string, string> = {
  'Presión (hPa)': 'PRESION',
  'Temperatura (°C)': 'TEMPERATURA',
  'Radiación (W/m²)': 'RADIACION',
  'Humedad (%)': 'HUMEDAD'
};


const SecondView: React.FC = () => {
  ////////////exportar
  const exportarExcel = () => {
  // Convierte chartData a un array de objetos plano
  const dataToExport = chartData.map(d => {
    const parametroObj = parametros.find(p => p.id === d.parametro)
    return {
      Fecha: d.fecha,
      Valor: d.valor,
      Parámetro: parametroObj?.nombre || d.parametro,
      Unidad: parametroObj?.unidad || '',
      //Nodo: d.nodo,
      // Agrega más campos si lo deseas
    }
  })
  const ws = XLSX.utils.json_to_sheet(dataToExport)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Datos')
  const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
  saveAs(new Blob([excelBuffer], { type: 'application/octet-stream' }), 'datos.xlsx')
}

const exportarCSV = () => {
  const dataToExport = chartData.map(d => ({
    Fecha: d.fecha,
    Valor: d.valor,
    Parámetro: parametros.find(p => p.id === d.parametro)?.nombre || d.parametro,
    //Nodo: d.nodo,
  }))
  const ws = XLSX.utils.json_to_sheet(dataToExport)
  const csv = XLSX.utils.sheet_to_csv(ws)
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  saveAs(blob, 'datos.csv')
}
  
  
  /////////////////////////////////
  const [sensorValues, setSensorValues] = React.useState<SensorValues>({
    presion: '-',
    temperatura: '-',
    radiacion: '-',
    humedad: '-'
  })
  const [variable, setVariable] = React.useState<string>('Todas')
  const [desde, setDesde] = React.useState<string>('')
  const [hasta, setHasta] = React.useState<string>('')
  const [tipo, setTipo] = React.useState<'line'|'bar'>('line')
  const [distrito, setDistrito] = React.useState<string>('Desconocido')
  const [parametros, setParametros] = React.useState<Parametro[]>([])
  const [chartData, setChartData] = React.useState<Medicion[]>([])
  // const [setHistoricalData] = React.useState<Medicion[]>([])

  // Extraigo nombre y nodo de la URL
  const params = new URLSearchParams(window.location.search)
  const nombre = params.get('nombre') ?? 'Desconocido'
  const idNodo = Number(params.get('nodo')) || null
  //FECHAS
  function toIsoString(dateStr: string) {
  if (!dateStr) return undefined
  // Si ya viene con 'T', asume que está bien
  if (dateStr.includes('T')) return dateStr
  // Si viene solo la fecha, agrega hora por defecto
  return dateStr + 'T00:00:00'
}
  // Al montar, trae los parámetros
  React.useEffect(() => {
    listParametros().then(setParametros).catch(console.error)
  }, [])

  // Seteo el título del distrito
  React.useEffect(() => {
    setDistrito(nombre)
  }, [nombre])

  //Carga solo una vez los datos del nodo para
  React.useEffect(() => {
  if (idNodo == null) return;

  async function fetchAllData() {
    try {
      const data = await getAllMedicionesByNodo(idNodo as number);
      setChartData(data);
    } catch (err) {
      console.error('Error al cargar mediciones al inicio:', err);
    }
  }

  fetchAllData();
}, [idNodo]);

  // Cada 5s traigo la última medición

  React.useEffect(() => {
  if (idNodo == null || parametros.length === 0) return

  let mounted = true

  async function fetchLast() {
  try {
    const meds = await getLastMedicionesByNodo(idNodo as number)
    if (!mounted) return

    // Agrupa por parámetro y elige la última medición (por fecha)
    const latestByParametro: Record<number, Medicion> = {}

    for (const med of meds) {
      const current = latestByParametro[med.parametro]
      if (!current || new Date(med.fecha) > new Date(current.fecha)) {
        latestByParametro[med.parametro] = med
      }
    }

    const getVal = (paramName: string) => {
      const param = parametros.find(p =>
        p.nombre.trim().toUpperCase() === variableMap[paramName].trim().toUpperCase()
      )
      if (!param) return '-'

      const med = latestByParametro[param.id]
      return med?.valor?.toFixed(1) ?? '-'
    }

    setSensorValues({
      presion: getVal('Presión (hPa)'),
      temperatura: getVal('Temperatura (°C)'),
      radiacion: getVal('Radiación (W/m²)'),
      humedad: getVal('Humedad (%)')
    })
  } catch (err) {
    console.error('Error al traer últimas mediciones:', err)
  }
}


  fetchLast()
  const interval = setInterval(fetchLast, 5000)

  return () => {
    mounted = false
    clearInterval(interval)
  }
}, [idNodo, parametros])

  // Handler de filtro que sirve tanto para el gráfico como datos históricos
  const handleFilter = async (idParametro: number, fechaInicio?: string, fechaFin?: string) => {
    if (idNodo == null) return
    
    try {
      const data = await filterMediciones({
        idNodo,
        idParametro,
        fechaInicio,
        fechaFin
      })
      setChartData(data)
      // setHistoricalData(data)
    } catch (err) {
      console.error(err)
      alert('Error al filtrar mediciones')
    }
  }

  // Descarga del gráfico
  const descargarGrafico = () => {
    const canvas = document.querySelector('canvas')
    if (canvas) {
      const url = (canvas as HTMLCanvasElement).toDataURL('image/png')
      const a = document.createElement('a')
      a.href = url
      a.download = 'grafico.png'
      a.click()
    }
  
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <DistrictTitleBar distrito={distrito} />
      <main className="container mx-auto p-6">
        {/* Muestras los valores en tiempo real */}
        <SensorCards {...sensorValues} />

        {/* Controles: variable, rango fechas y botón de filtrar */}
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
          onDescargar={exportarCSV}
          onDescargarExcel={exportarExcel}
          onFilter={async () => {
            if (variable === 'Todas') {
    // Trae todas las mediciones del nodo
              if (idNodo == null) return
              try {
                const data = await getAllMedicionesByNodo(idNodo)
                setChartData(data)
                // setHistoricalData(data)
              } catch (err) {
                alert('Error al traer todas las mediciones')
              }
              return
            }
            // Busca el id del parámetro seleccionado
            // const param = parametros.find(p =>
            //   variable.toLowerCase().includes(p.nombre.toLowerCase())
            // )
            const nombreParam = variableMap[variable]
            const param = parametros.find( p => p.nombre.trim().toUpperCase() === nombreParam.trim().toUpperCase()
            )
            if (!param) {
              alert('No se encontró el parámetro seleccionado')
              return
            }
            handleFilter(param.id,
    toIsoString(desde),
    toIsoString(hasta))
          }}
        />

        {/* Gráfico con los datos filtrados */}
        <ChartSection tipo={tipo} data={chartData} variable={variable} parametros={parametros} />

        {/* Tabla histórica */}
        {/* <HistoricalData data={historicalData} /> */}
      </main>
    </div>
  )
}

export default SecondView
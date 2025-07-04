import './styles/App.css'
import React from 'react'
import AppRoutes from './router/routes'

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <AppRoutes />
    </div>
  )
}

export default App

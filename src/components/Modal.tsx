// src/components/Modal.tsx
import React, { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import ReactDOM from 'react-dom'
interface ModalProps {
  children: ReactNode
  onClose: () => void
}

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  // Creamos un único div persistente para el portal
  const elRef = useRef<HTMLDivElement | null>(null)
  if (!elRef.current) {
    elRef.current = document.createElement('div')
  }

  useEffect(() => {
    const el = elRef.current!
    document.body.appendChild(el)
    return () => {
      document.body.removeChild(el)
    }
  }, [])

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded shadow-lg w-96"
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    elRef.current!
  )
}

export default Modal

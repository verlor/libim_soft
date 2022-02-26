import React from 'react'
import { useSelector } from 'react-redux'

export default function Resultados() {
  const sumota = useSelector((state) => state.resultados.suma)
  return (
    <>
      <h2>Resultados</h2>
      <span>Sumota: {sumota}</span>
    </>
  )
}

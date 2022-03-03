import React from 'react'
import { useSelector } from 'react-redux'

export default function Resultados() {
  const sumota = useSelector((state) => state.resultados.suma)
  //
  const res_1 = useSelector((state) => state.resultados.results)

  return (
    <>
      <h2>Resultados</h2>
      <span>Sumota: {JSON.stringify(sumota)}</span>
      <p></p>
      <span>Resultados Slow Rate: {JSON.stringify(res_1)}</span>
      <p></p>
      <span>Resultados Fast Rate: {JSON.stringify(res_1)}</span>
    </>
  )
}

import React from 'react'
import { useSelector } from 'react-redux'

export default function Resultados() {
  const before = useSelector((state) => state.resultados.suma?.before_calc)
  const fast = useSelector((state) => state.resultados.suma?.fast)
  const slow = useSelector((state) => state.resultados.suma?.slow)
  // const res_1 = useSelector((state) => state.resultados.results)
  return (
    <>
      <h2>Resultados</h2>
      <span>Sumota: {JSON.stringify(before)}</span>
      <span>Resultados Slow Rate: {JSON.stringify(slow)}</span>
      <span>Resultados Fast Rate: {JSON.stringify(fast)}</span>
    </>
  )
}

/*
 <p></p>
     <span>Resultados Slow Rate: {JSON.stringify(slow)}</span>
      <p></p>
      <span>Resultados Fast Rate: {JSON.stringify(fast)}</span>
*/

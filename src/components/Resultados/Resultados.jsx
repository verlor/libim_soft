import React from 'react'
import { useSelector } from 'react-redux'
import '../../styles/global.css'

export default function Resultados() {
  const formular = useSelector((state) => state.resultados.suma?.formularData)
  const before = useSelector((state) => state.resultados.suma?.before_calc)
  const fast = useSelector((state) => state.resultados.suma?.fast)
  const slow = useSelector((state) => state.resultados.suma?.slow)
  // const res_1 = useSelector((state) => state.resultados.results)
  return (
    <>
      <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl mx-3 pt-3">
        Resultados
      </h2>
      <p></p>
      <p></p>
      <span>Data Formulario:</span>
      <p></p>
      <label className="block text-sm font-large text-gray-700">
        {Object.keys(formular || {}).map((prop) => (
          <p>
            {prop}: {formular[prop]}
          </p>
        ))}
      </label>
      <p></p>

      <p></p>
      {/*} 
     <span>Data Formulario:</span>
      */}
      <span>Sumota:</span>
      <p></p>
      {Object.keys(before || {}).map((prop) => (
        <p>
          {prop}: {before[prop]}
        </p>
      ))}
      <p></p>
      <span>Slow Rate:</span>
      <p></p>
      {Object.keys(slow || {}).map((prop) => (
        <p>
          {prop}: {slow[prop]}
        </p>
      ))}
      <p></p>
      <span>Fast Rate:</span>
      <p></p>
      {Object.keys(fast || {}).map((prop) => (
        <p>
          {prop}: {fast[prop]}
        </p>
      ))}
    </>
  )
}

/*
      <span>Sumota: {JSON.stringify(before)}</span>
      <span>Resultados Slow Rate: {JSON.stringify(slow)}</span>
      <span>Resultados Fast Rate: {JSON.stringify(fast)}</span>
      // {typeof before !== 'undefined' && Object.keys(before).map( prop => <p>1</p>)} 
      {Object.keys(before || {}).map((prop) => (
        <p>
          {prop}: {before[prop]}
        </p>
      ))}
*/

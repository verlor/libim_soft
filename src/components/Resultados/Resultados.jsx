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

      <div className="grid grid-cols-2 gap-4 px-3">
        <div className="col-span-1">
          <span>Data Formulario:</span>
          <label className="block text-sm font-large text-gray-700">
            <table>
              {Object.keys(formular || {}).map((prop) => (
                <tr>
                  <td>{prop}:</td>
                  <td>{formular[prop]}</td>
                </tr>
              ))}
            </table>
          </label>
        </div>
        <div className="col-span-1">
          <span>Sumota:</span>
          <label className="block text-sm font-large text-gray-700">
            <table>
              {Object.keys(before || {}).map((prop) => (
                <tr>
                  <td>{prop}:</td>
                  <td>{before[prop]}</td>
                </tr>
              ))}
            </table>
          </label>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 px-3">
        <div className="col-span-1">
          <span>Slow Rate:</span>
          <label className="block text-sm font-large text-gray-700">
            <table>
              {Object.keys(slow || {}).map((prop) => (
                <tr>
                  <td>{prop}:</td>
                  <td>{slow[prop]}</td>
                </tr>
              ))}
            </table>
          </label>
        </div>
        <div className="col-span-1">
          <span>Fast Rate:</span>
          <label className="block text-sm font-large text-gray-700">
            <table>
              {Object.keys(fast || {}).map((prop) => (
                <tr>
                  <td>{prop}:</td>
                  <td>{fast[prop]}</td>
                </tr>
              ))}
            </table>
          </label>
        </div>
      </div>
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

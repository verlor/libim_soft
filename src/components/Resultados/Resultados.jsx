import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import '../../styles/global.css'
import batt from '../../images/batt.svg'

export default function Resultados() {
  const formular = useSelector((state) => state.resultados.suma?.formularData)
  const before = useSelector((state) => state.resultados.suma?.before_calc)
  const fast = useSelector((state) => state.resultados.suma?.fast)
  const slow = useSelector((state) => state.resultados.suma?.slow)

  const [showPanel, setShowPanel] = useState(true)
  const [showPanel2, setShowPanel2] = useState(true)

  return (
    <>
      <h1 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl mx-4 pt-4">
        Results
      </h1>

      <div class="flex items-baseline mt-4 mb-6 pb-6 border-b border-slate-200"></div>

      <div class="flex items-baseline mt-4 mb-6 pb-6 border-b border-slate-200">
        <div className="grid grid-cols-4 gap-4 px-3">
          <div className="col-span-1 ">
            <img src={batt} alt="" class="object-scale-down h-auto w-auto" />
          </div>
          <div className="col-span-1 text-sm font-medium text-slate-700 mt-2">
            <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-2xl mx-4 pt-4">
              Objetive
            </h2>
            <tr>
              <th>Voltage: </th>
              <td class="text-right">11.55</td>
              <td> [V]</td>
            </tr>
            <tr>
              <th>
                Energy<sub> density</sub>:{' '}
              </th>
              <td class="text-right">195.92</td>
              <td> [Wh/Kg]</td>
            </tr>
            <tr>
              <th>
                {' '}
                Power<sub> density</sub>:{' '}
              </th>
              <td class="text-right">428.57</td>
              <td> [W/Kg]</td>
            </tr>
            <tr>
              <th>Volume: </th>
              <td class="text-right">480</td>
              <td> [cm^3]</td>
            </tr>
          </div>

          <div className="col-span-1 text-sm font-medium text-slate-700 mt-2">
            <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-2xl mx-4 pt-4">
              Slow C Rate: {formular?.slow_charge_rate_id}
            </h2>

            <tr>
              <th>Voltage: </th>
              <td class="text-right">
                {slow?.module_discharge_voltage.toFixed(2)}
              </td>
              <td> [V]</td>
            </tr>
            <tr>
              <th>
                Energy<sub> density</sub>:{' '}
              </th>
              <td class="text-right">
                {slow?.module_discharge_energy_density.toFixed(2)}
              </td>
              <td> [Wh/Kg]</td>
            </tr>
            <tr>
              <th>
                {' '}
                Power<sub> density</sub>:{' '}
              </th>
              <td class="text-right">
                {slow?.module_discharge_power_density.toFixed(2)}
              </td>
              <td> [W/Kg]</td>
            </tr>
            <tr>
              <th>Volume: </th>
              <td class="text-right">{slow?.module_volume.toFixed(2)}</td>
              <td> [cm^3]</td>
            </tr>
          </div>

          <div className="col-span-1 text-sm font-medium text-slate-700 mt-2">
            <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-2xl mx-4 pt-4">
              Fast C Rate: {formular?.fast_charge_rate_id}
            </h2>
            <tr>
              <th>Voltage: </th>
              <td class="text-right">
                {fast?.module_discharge_voltage.toFixed(2)}
              </td>
              <td> [V]</td>
            </tr>
            <tr>
              <th>
                Energy<sub> density</sub>:{' '}
              </th>
              <td class="text-right">
                {fast?.module_discharge_energy_density.toFixed(2)}
              </td>
              <td> [Wh/Kg]</td>
            </tr>
            <tr>
              <th>
                {' '}
                Power<sub> density</sub>:{' '}
              </th>
              <td class="text-right">
                {fast?.module_discharge_power_density.toFixed(2)}
              </td>
              <td> [W/Kg]</td>
            </tr>
            <tr>
              <th>Volume: </th>
              <td class="text-right">
                {((fast?.module_volume * 100) / 480).toFixed(2)}
              </td>
              <td> %</td>
            </tr>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 px-3">
        <div className="col-span-1">
          <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-2xl mx-4 pt-4">
            Slow C Rate:
          </h2>
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
          <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-2xl mx-4 pt-4">
            Fast C Rate:
          </h2>
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

      <div class="flex items-baseline mt-4 mb-6 pb-6 border-b border-slate-200"></div>

      <div className="grid grid-cols-2 gap-4 px-3">
        <div className="col-span-1 ">
          <label className="block text-sm font-large text-gray-700">
            <table>
              <tr>
                <td>
                  <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-2xl mx-4 pt-4">
                    First Calculations:
                  </h2>
                </td>
                <td>
                  <label class="flex justify-between items-center p-2 text-xl ">
                    <input
                      id="visib_before"
                      type="checkbox"
                      class="hidden appearance-none peer"
                      onChange={() => {
                        setShowPanel(!showPanel)
                      }}
                    />
                    <span class="w-11 h-6 flex items-center flex-shrink-0 ml-4 p-1 bg-gray-400 rounded-full duration-300 ease-in-out peer-checked:bg-indigo-600 after:w-5 after:h-5 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-4 mt-4"></span>
                  </label>
                </td>
              </tr>
              <div class={`group ${!showPanel && 'invisible'}`}>
                {Object.keys(before || {}).map((prop) => (
                  <tr>
                    <td>{prop}:</td>
                    <td>{before[prop]}</td>
                  </tr>
                ))}
              </div>
            </table>
          </label>
        </div>

        <div className="col-span-1 ">
          <label className="block text-sm font-large text-gray-700">
            <table>
              <tr>
                <td>
                  <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-2xl mx-4 pt-4">
                    Form Inputs:
                  </h2>
                </td>
                <td>
                  <label class="flex justify-between items-center p-2 text-xl ">
                    <input
                      id="visib_form_data"
                      type="checkbox"
                      class="hidden appearance-none peer"
                      onChange={() => {
                        setShowPanel2(!showPanel2)
                      }}
                    />
                    <span class="w-11 h-6 flex items-center flex-shrink-0 ml-4 p-1 bg-gray-400 rounded-full duration-300 ease-in-out peer-checked:bg-indigo-600 after:w-5 after:h-5 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-4 mt-4"></span>
                  </label>
                </td>
              </tr>
              <div class={`group ${!showPanel2 && 'invisible'}`}>
                {Object.keys(formular || {}).map((prop) => (
                  <tr>
                    <td>{prop}:</td>
                    <td>{formular[prop]}</td>
                  </tr>
                ))}
              </div>
            </table>
          </label>
        </div>
      </div>

      <div class="flex items-baseline mt-4 mb-6 pb-6 "></div>
    </>
  )
}

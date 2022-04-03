import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import '../../styles/global.css'
import batt from '../../images/batt.svg'
// import csvDownload from 'json-to-csv-export'

export default function Resultados() {
  const formular = useSelector((state) => state.resultados.suma?.formularData)
  //const before = useSelector((state) => state.resultados.suma?.before_calc)
  const pre_base_unit = useSelector(
    (state) => state.resultados.suma?.pre_base_unit
  )
  const pre_cell = useSelector((state) => state.resultados.suma?.pre_cell)
  const module_total_mass = useSelector(
    (state) => state.resultados.suma?.module_total_mass
  )
  const fast = useSelector((state) => state.resultados.suma?.fast)
  const slow = useSelector((state) => state.resultados.suma?.slow)

  const [showPanel, setShowPanel] = useState(true)
  const [showPanel2, setShowPanel2] = useState(true)

  //console.log('fast', fast)
  //console.log('pre_base_unit', Object.keys(pre_base_unit))
  console.log("data",formular)
  console.log("pre_base_unit",pre_base_unit)
  console.log("pre_cell",pre_cell)
  console.log("module_total_mass",module_total_mass)
  console.log("slow",slow)
  console.log("fast",fast)




  return (
    <>
      <h2 class="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl mx-4 pt-4">
        Module Summary
      </h2>

      <div class="flex items-baseline mt-2 mb-2 pb-1 border-slate-200"></div>

      <div className="grid grid-cols-2 gap-4 px-2 text-center">
        <div className="col-span-1 shadow sm:rounded-md bg-gray-100 ">
          <label className="block text-xl font-extrabold tracking-tight text-gray-900 sm:text-2xl">
            Slow C Rate: {formular?.slow_charge_rate_id.value}
          </label>
          <div class="grid grid-cols-5 p-2 text-center text-sm font-sm text-gray-700">
            <div className="col-span-2"> Voltage: </div>
            <div className="col-span-2 font-medium">
              {slow?.module_discharge_voltage.value.toFixed(2)}
            </div>
            <div className="col-span-1"> {"[" + slow?.module_discharge_voltage.unit + "]"} </div>
            <div className="col-span-2">
              {' '}
              Energy<sub> density</sub>:
            </div>
            <div className="col-span-2 font-medium">
              {slow?.module_discharge_energy_density.value.toFixed(2)}
            </div>
            <div className="col-span-1">  {"[" + slow?.module_discharge_energy_density.unit + "]"}  </div>
            <div className="col-span-2">
              {' '}
              Power<sub> density</sub>:
            </div>
            <div className="col-span-2 font-medium">
              {slow?.module_discharge_power_density.value.toFixed(2)}
            </div>
            <div className="col-span-1"> {"[" + slow?.module_discharge_power_density.unit + "]"}  </div>
            <div className="col-span-2"> Volume: </div>
            <div className="col-span-2 font-medium">
              {slow?.module_volume.value.toFixed(2)}
            </div>
            <div className="col-span-1"> {"[" + slow?.module_volume.unit + "]"}  </div>
          </div>
        </div>

        <div className="col-span-1 shadow sm:rounded-md bg-gray-100 ">
          <label className="block text-xl font-extrabold tracking-tight text-gray-900 sm:text-2xl">
            Fast C Rate: {formular?.fast_charge_rate_id.value}
          </label>
          <div class="grid grid-cols-5 p-2 text-center text-sm font-sm text-gray-700">
            <div className="col-span-2"> Voltage: </div>
            <div className="col-span-2 font-medium">
              {fast?.module_discharge_voltage.value.toFixed(2)}
            </div>
            <div className="col-span-1"> {"[" + fast?.module_discharge_voltage.unit + "]"} </div>
            <div className="col-span-2">
              {' '}
              Energy<sub> density</sub>:
            </div>
            <div className="col-span-2 font-medium">
              {fast?.module_discharge_energy_density.value.toFixed(2)}
            </div>
            <div className="col-span-1"> {"[" + fast?.module_discharge_energy_density.unit + "]"}  </div>
            <div className="col-span-2">
              {' '}
              Power<sub> density</sub>:
            </div>
            <div className="col-span-2 font-medium">
              {fast?.module_discharge_power_density.value.toFixed(2)}
            </div>
            <div className="col-span-1"> {"[" + fast?.module_discharge_power_density.unit + "]"} </div>
            <div className="col-span-2"> Volume: </div>
            <div className="col-span-2 font-medium">
              {fast?.module_volume.value.toFixed(2)}
            </div>
            <div className="col-span-1"> {"[" + fast?.module_volume.unit + "]"} </div>
          </div>
        </div>
      </div>

      <div class="flex items-baseline mt-4 mb-6 pb-1 border-slate-200"></div>

      <div className="grid grid-cols-2 gap-4 px-2 text-center">
        <div className="col-span-1  sm:rounded-md ">
        <label className="block text-xl font-extrabold tracking-tight text-gray-900 sm:text-2xl">
            Slow C Rate: {formular?.slow_charge_rate_id.value}
          </label>
        </div>
        <div className="col-span-1  sm:rounded-md ">  
        <label className="block text-xl font-extrabold tracking-tight text-gray-900 sm:text-2xl">
            Fast C Rate: {formular?.fast_charge_rate_id.value}
          </label>
        </div>
      </div>

      <h2 class="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-2xl mx-2 pt-2">
        Base Unit
      </h2>
      <div className="grid grid-cols-2 gap-4 px-2 text-center">
        <div className="col-span-1 shadow sm:rounded-md bg-gray-100 ">
          <div>
            {Object.keys(slow).map((elem) => {
              if (elem.includes('base_unit_'))
                return (
                  <div class="grid grid-cols-6 p-0 text-center text-xs font-sm text-gray-700 sm:text-sm">
                    <div class="col-span-3 text-left">
                      {slow[elem].name} : 
                    </div>
                    <div class="col-span-2 font-medium">
                      {slow[elem].value.toPrecision(6)} {' '}
                    </div>
                    <div class="col-span-1"> 
                    {"[" + (slow[elem].unit !=="[]"? slow[elem].unit : " ") + "]"}
                    </div>
                  </div>
                )
            })}
          </div>
        </div>

        <div className="col-span-1 shadow sm:rounded-md bg-gray-100 ">
          <div>
            {Object.keys(fast).map((elem) => {
              if (elem.includes('base_unit_'))
                return (
                  <div class="grid grid-cols-6 p-0 text-center text-xs font-sm text-gray-700 sm:text-sm">
                    <div class="col-span-3 text-left">
                      {fast[elem].name} : 
                    </div>
                    <div class="col-span-2 font-medium">
                      {fast[elem].value.toPrecision(6)} {' '}
                    </div>
                    <div class="col-span-1"> 
                     {"[" + (fast[elem].unit !=="[]"? fast[elem].unit : " ") + "]"}
                    </div>
                  </div>
                )
            })}
          </div>
        </div>
      </div>

      <h2 class="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-2xl mx-2 pt-2">
        Cell
      </h2>
      <div className="grid grid-cols-2 gap-4 px-2 text-center">
        <div className="col-span-1 shadow sm:rounded-md bg-gray-100 ">
          <div>
            {Object.keys(slow).map((elem) => {
              if (elem.includes('cell_'))
                return (
                  <div class="grid grid-cols-6 p-0 text-center text-xs font-sm text-gray-700 sm:text-sm">
                    <div class="col-span-3 text-left">
                      {slow[elem].name} : 
                    </div>
                    <div class="col-span-2 font-medium">
                      {slow[elem].value.toPrecision(6)} {' '}
                    </div>
                    <div class="col-span-1"> 
                    {"[" + (slow[elem].unit !=="[]"? slow[elem].unit : " ") + "]"}
                    </div>
                  </div>
                )
            })}
          </div>
        </div>

        <div className="col-span-1 shadow sm:rounded-md bg-gray-100 ">
          <div>
            {Object.keys(fast).map((elem) => {
              if (elem.includes('cell_'))
                return (
                  <div class="grid grid-cols-6 p-0 text-center text-xs font-sm text-gray-700 sm:text-sm">
                    <div class="col-span-3 text-left">
                      {fast[elem].name} : 
                    </div>
                    <div class="col-span-2 font-medium">
                      {fast[elem].value.toPrecision(6)} {' '}
                    </div>
                    <div class="col-span-1"> 
                     {"[" + (fast[elem].unit !=="[]"? fast[elem].unit : " ") + "]"}
                    </div>
                  </div>
                )
            })}
          </div>
        </div>
      </div>


      <h2 class="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-2xl mx-2 pt-2">
        Module
      </h2>
      <div className="grid grid-cols-2 gap-4 px-2 text-center">
        <div className="col-span-1 shadow sm:rounded-md bg-gray-100 ">
          <div>
            {Object.keys(slow).map((elem) => {
              if (elem.includes('module_'))
                return (
                  <div class="grid grid-cols-6 p-0 text-center text-xs font-sm text-gray-700 sm:text-sm">
                    <div class="col-span-3 text-left">
                      {slow[elem].name} : 
                    </div>
                    <div class="col-span-2 font-medium">
                      {slow[elem].value.toPrecision(6)} {' '}
                    </div>
                    <div class="col-span-1"> 
                    {"[" + (slow[elem].unit !=="[]"? slow[elem].unit : " ") + "]"}
                    </div>
                  </div>
                )
            })}
          </div>
        </div>

        <div className="col-span-1 shadow sm:rounded-md bg-gray-100 ">
          <div>
            {Object.keys(fast).map((elem) => {
              if (elem.includes('module_'))
                return (
                  <div class="grid grid-cols-6 p-0 text-center text-xs font-sm text-gray-700 sm:text-sm">
                    <div class="col-span-3 text-left">
                      {fast[elem].name} : 
                    </div>
                    <div class="col-span-2 font-medium">
                      {fast[elem].value.toPrecision(6)} {' '}
                    </div>
                    <div class="col-span-1"> 
                     {"[" + (fast[elem].unit !=="[]"? fast[elem].unit : " ") + "]"}
                    </div>
                  </div>
                )
            })}
          </div>
        </div>
      </div>


      <div class="flex items-baseline mt-4 mb-6 pb-1 border-slate-200"></div>

      <h2 class="text-xl font-extrabold tracking-tight text-gray-900 mx-4 pt-4">
        Pre Calculations:
      </h2>

      <div className="grid grid-cols-2 gap-4 px-2 text-center">
        <div className="col-span-1 shadow sm:rounded-md bg-gray-100 ">
          <div class="grid grid-cols-5 p-2 text-center text-xs font-sm text-gray-700 sm:text-sm">
            <label className="col-span-4 text-left text-l font-extrabold tracking-tight text-gray-900 sm:text-xl mx-4 pt-4">
              Base Unit
            </label>
            <label class="col-span-1 flex justify-between text-xl ">
              <input
                id="visib_pre_base_unit"
                type="checkbox"
                class="hidden appearance-none peer"
                onChange={() => {
                  setShowPanel(!showPanel)
                }}
              />
              <span class="w-11 h-6 flex items-center flex-shrink-0 ml-4 p-1 bg-gray-400 rounded-full duration-300 ease-in-out peer-checked:bg-indigo-600 after:w-5 after:h-5 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-4 mt-4"></span>
            </label>
          </div>
          <div class={`group ${!showPanel && 'invisible'}`}>
          {Object.keys(pre_base_unit).map((elem) => {
            return (
            <div class="grid grid-cols-6 p-0 text-center text-xs font-sm text-gray-700 sm:text-sm">
                    <div class="col-span-3 text-left">
                      {pre_base_unit[elem].name} : 
                    </div>
                    <div class="col-span-2 font-medium">
                      {pre_base_unit[elem].value.toPrecision(6)} {' '}
                    </div>
                    <div class="col-span-1"> 
                     {"[" + (pre_base_unit[elem].unit !=="[]"? pre_base_unit[elem].unit : " ") + "]"}
                    </div>
            </div>
          )})}
          </div>
        </div>

        <div className="col-span-1 shadow sm:rounded-md bg-gray-100 ">
          <div class="grid grid-cols-5 p-2 text-center text-xs font-sm text-gray-700 sm:text-sm">
            <label className="col-span-4 text-left text-l font-extrabold tracking-tight text-gray-900 sm:text-xl mx-4 pt-4">
              Cell
            </label>
            <label class="col-span-1 flex justify-between text-xl ">
              <input
                id="visib_pre_base_unit"
                type="checkbox"
                class="hidden appearance-none peer"
                onChange={() => {
                  setShowPanel2(!showPanel2)
                }}
              />
              <span class="w-11 h-6 flex items-center flex-shrink-0 ml-4 p-1 bg-gray-400 rounded-full duration-300 ease-in-out peer-checked:bg-indigo-600 after:w-5 after:h-5 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-4 mt-4"></span>
            </label>
          </div>
          <div class={`group ${!showPanel2 && 'invisible'}`}>
          {Object.keys(pre_cell).map((elem) => {
            return (
            <div class="grid grid-cols-6 p-0 text-center text-xs font-sm text-gray-700 sm:text-sm">
                    <div class="col-span-3 text-left">
                      {pre_cell[elem].name} : 
                    </div>
                    <div class="col-span-2 font-medium">
                      {pre_cell[elem].value.toPrecision(6)} {' '}
                    </div>
                    <div class="col-span-1"> 
                     {"[" + (pre_cell[elem].unit !=="[]"? pre_cell[elem].unit : " ") + "]"}
                    </div>
            </div>
          )})}
          </div>
        </div>
      </div>

      <div class="flex items-baseline mt-4 mb-6 pb-6 border-b border-slate-200"></div>

      <div class="flex items-baseline mt-4 mb-6 pb-6 "></div>
      <button onClick={() => csvDownload([formular])}>Download Data</button>
    </>
  )
}

import { stringify } from 'postcss'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import '../../styles/global.css'
// import csvDownload from 'json-to-csv-export'

export default function Results() {
  const formular = useSelector((state) => state.results.sum?.formularData)
  const pre_base_unit = useSelector((state) => state.results.sum?.pre_base_unit)
  const pre_cell = useSelector((state) => state.results.sum?.pre_cell)
  const fast = useSelector((state) => state.results.sum?.fast)
  const slow = useSelector((state) => state.results.sum?.slow)

  const [showPanel, setShowPanel] = useState(false)


  return (
    <>
      <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl mx-4 pt-4">
        Module Summary
      </h2>

      <div className="flex items-baseline mt-2 mb-2 pb-1 border-slate-200"></div>

      <div className="grid grid-cols-2 gap-4 px-2 text-center">
        <div className="col-span-1 shadow sm:rounded-md bg-gray-100 ">
          <label className="block text-xl font-extrabold tracking-tight text-gray-900 sm:text-2xl">
            Slow C Rate: {formular?.slow_charge_rate_id.value}
          </label>
          <div className="grid grid-cols-5 p-2 text-center text-sm font-sm text-gray-700">
            <div className="col-span-2"> Voltage: </div>
            <div className="col-span-2 font-medium">
              {slow?.module_discharge_voltage.value.toFixed(2)}
            </div>
            <div className="col-span-1">
              {' '}
              {'[' + slow?.module_discharge_voltage.unit + ']'}{' '}
            </div>
            <div className="col-span-2">
              {' '}
              Energy<sub> density</sub>:
            </div>
            <div className="col-span-2 font-medium">
              {slow?.module_discharge_energy_density.value.toFixed(2)}
            </div>
            <div className="col-span-1">
              {' '}
              {'[' + slow?.module_discharge_energy_density.unit + ']'}{' '}
            </div>
            <div className="col-span-2">
              {' '}
              Power<sub> density</sub>:
            </div>
            <div className="col-span-2 font-medium">
              {slow?.module_discharge_power_density.value.toFixed(2)}
            </div>
            <div className="col-span-1">
              {' '}
              {'[' + slow?.module_discharge_power_density.unit + ']'}{' '}
            </div>
            <div className="col-span-2"> Volume: </div>
            <div className="col-span-2 font-medium">
              {slow?.module_volume.value.toFixed(2)}
            </div>
            <div className="col-span-1">
              {' '}
              {'[' + slow?.module_volume.unit + ']'}{' '}
            </div>
          </div>
        </div>

        <div className="col-span-1 shadow sm:rounded-md bg-gray-100 ">
          <label className="block text-xl font-extrabold tracking-tight text-gray-900 sm:text-2xl">
            Fast C Rate: {formular?.fast_charge_rate_id.value}
          </label>
          <div className="grid grid-cols-5 p-2 text-center text-sm font-sm text-gray-700">
            <div className="col-span-2"> Voltage: </div>
            <div className="col-span-2 font-medium">
              {fast?.module_discharge_voltage.value.toFixed(2)}
            </div>
            <div className="col-span-1">
              {' '}
              {'[' + fast?.module_discharge_voltage.unit + ']'}{' '}
            </div>
            <div className="col-span-2">
              {' '}
              Energy<sub> density</sub>:
            </div>
            <div className="col-span-2 font-medium">
              {fast?.module_discharge_energy_density.value.toFixed(2)}
            </div>
            <div className="col-span-1">
              {' '}
              {'[' + fast?.module_discharge_energy_density.unit + ']'}{' '}
            </div>
            <div className="col-span-2">
              {' '}
              Power<sub> density</sub>:
            </div>
            <div className="col-span-2 font-medium">
              {fast?.module_discharge_power_density.value.toFixed(2)}
            </div>
            <div className="col-span-1">
              {' '}
              {'[' + fast?.module_discharge_power_density.unit + ']'}{' '}
            </div>
            <div className="col-span-2"> Volume: </div>
            <div className="col-span-2 font-medium">
              {fast?.module_volume.value.toFixed(2)}
            </div>
            <div className="col-span-1">
              {' '}
              {'[' + fast?.module_volume.unit + ']'}{' '}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-baseline mt-4 mb-6 pb-1 border-slate-200"></div>

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

      <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-2xl mx-4 pt-3">
        Base Unit
      </h2>
      <div className="grid grid-cols-2 gap-4 px-2 text-center">
        <div className="col-span-1 shadow sm:rounded-md bg-gray-100 ">
          <div>
            {Object.keys(slow).map((elem,idx) => {
              if (elem.includes('base_unit_'))
                return (
                  <div key={"s_bu_"+idx} className="grid grid-cols-6 p-0 text-center text-xs font-sm text-gray-700 md:text-[10px] mx-4 pt-1.5">
                    <div key={"s_bu_n_"+idx} className="col-span-3 text-left sm:text-sm">
                      {slow[elem].name} :
                    </div>
                    <div key={"s_bu_v_"+idx}  className="col-span-2 font-medium truncate hover:text-clip sm:text-sm">
                      {slow[elem].value.toPrecision(6)}{' '}
                    </div>
                    <div key={"s_bu_u_"+idx}  className="col-span-1 sm:text-sm">
                      {'[' +
                        (slow[elem].unit !== '[]' ? slow[elem].unit : ' ') +
                        ']'}
                    </div>
                  </div>
                )
            })}
          </div>
        </div>
 
        <div className="col-span-1 shadow sm:rounded-md bg-gray-100 ">
          <div>
            {Object.keys(fast).map((elem,idx) => {
              if (elem.includes('base_unit_'))
                return (
                  <div key={"f_bu_"+idx} className="grid grid-cols-6 p-0 text-center text-xs font-sm text-gray-700 md:text-[10px] mx-4 pt-1.5">
                    <div key={"f_bu_n_"+idx} className="col-span-3 text-left sm:text-sm">
                      {fast[elem].name} :
                    </div>
                    <div key={"f_bu_v_"+idx} className="col-span-2 font-medium truncate hover:text-clip sm:text-sm">
                      {fast[elem].value.toPrecision(6)}{' '}
                    </div>
                    <div key={"f_bu_u_"+idx} className="col-span-1 sm:text-sm">
                      {'[' +
                        (fast[elem].unit !== '[]' ? fast[elem].unit : ' ') +
                        ']'}
                    </div>
                  </div>
                )
            })}
          </div>
        </div>



      </div>
 
      <div className="flex items-baseline mt-4 mb-6 pb-1 border-slate-200"></div>

      <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-2xl mx-4 pt-3">
        Cell
      </h2>
      <div className="grid grid-cols-2 gap-4 px-2 text-center">
        <div className="col-span-1 shadow sm:rounded-md bg-gray-100 ">
          <div>
            {Object.keys(slow).map((elem,idx) => {
              if (elem.includes('cell_'))
                return (
                  <div key={"s_c_"+idx} className="grid grid-cols-6 p-0 text-center text-xs font-sm text-gray-700 md:text-[10px] mx-4 pt-1.5">
                    <div key={"s_c_n_"+idx} className="col-span-3 text-left sm:text-sm">
                      {slow[elem].name} :
                    </div>
                    <div key={"s_c_v_"+idx} className="col-span-2 font-medium truncate hover:text-clip sm:text-sm">
                      {slow[elem].value.toPrecision(6)}{' '}
                    </div>
                    <div key={"s_c_u_"+idx} className="col-span-1 sm:text-sm">
                      {'[' +
                        (slow[elem].unit !== '[]' ? slow[elem].unit : ' ') +
                        ']'}
                    </div>
                  </div>
                )
            })}
          </div>
        </div>

        <div className="col-span-1 shadow sm:rounded-md bg-gray-100 ">
          <div>
            {Object.keys(fast).map((elem,idx) => {
              if (elem.includes('cell_'))
                return (
                  <div key={"f_c_"+idx} className="grid grid-cols-6 p-0 text-center text-xs font-sm text-gray-700 md:text-[10px] mx-4 pt-1.5">
                    <div key={"f_c_n_"+idx} className="col-span-3 text-left sm:text-sm">
                      {fast[elem].name} :
                    </div>
                    <div key={"f_c_v_"+idx} className="col-span-2 font-medium truncate hover:text-clip sm:text-sm">
                      {fast[elem].value.toPrecision(6)}{' '}
                    </div>
                    <div key={"f_c_u_"+idx} className="col-span-1 sm:text-sm">
                      {'[' +
                        (fast[elem].unit !== '[]' ? fast[elem].unit : ' ') +
                        ']'}
                    </div>
                  </div>
                )
            })}
          </div>
        </div>
      </div>

      <div className="flex items-baseline mt-4 mb-6 pb-1 border-slate-200"></div>

      <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-2xl mx-4 pt-3">
        Module
      </h2>
      <div className="grid grid-cols-2 gap-4 px-2 text-center">
        <div className="col-span-1 shadow sm:rounded-md bg-gray-100 ">
          <div>
            {Object.keys(slow).map((elem,idx) => {
              if (elem.includes('module_'))
                return (
                  <div key={"s_m_"+idx} className="grid grid-cols-6 p-0 text-center text-xs font-sm text-gray-700 md:text-[10px] mx-4 pt-1.5">
                    <div key={"s_m_n_"+idx} className="col-span-3 text-left sm:text-sm">
                      {slow[elem].name} :
                    </div>
                    <div key={"s_m_v_"+idx} className="col-span-2 font-medium truncate hover:text-clip sm:text-sm">
                      {slow[elem].value.toPrecision(6)}{' '}
                    </div>
                    <div key={"s_m_u_"+idx} className="col-span-1 sm:text-sm">
                      {'[' +
                        (slow[elem].unit !== '[]' ? slow[elem].unit : ' ') +
                        ']'}
                    </div>
                  </div>
                )
            })}
          </div>
        </div>

        <div className="col-span-1 shadow sm:rounded-md bg-gray-100 ">
          <div>
            {Object.keys(fast).map((elem,idx) => {
              if (elem.includes('module_'))
                return (
                  <div key={"f_m_"+idx} className="grid grid-cols-6 p-0 text-center text-xs font-sm text-gray-700 md:text-[10px] mx-4 pt-1.5">
                    <div key={"f_m_n_"+idx} className="col-span-3 text-left sm:text-sm">
                      {fast[elem].name} :
                    </div>
                    <div key={"f_m_v_"+idx} className="col-span-2 font-medium truncate hover:text-clip sm:text-sm">
                      {fast[elem].value.toPrecision(6)}{' '}
                    </div>
                    <div key={"f_m_u_"+idx} className="col-span-1 sm:text-sm">
                      {'[' +
                        (fast[elem].unit !== '[]' ? fast[elem].unit : ' ') +
                        ']'}
                    </div>
                  </div>
                )
            })}
          </div>
        </div>
      </div>

      <div className="flex items-baseline mt-4 mb-6 pb-1 border-slate-200"></div>

      <div className="items-center">
        <h2 className="text-xl font-extrabold tracking-tight text-gray-900 mx-4 pt-3">
          Pre Calculations:
          <label className="float-right text-xl ">
            <input
              id="visib_pre_base_unit"
              type="checkbox"
              className="hidden appearance-none peer"
              onChange={() => {
                setShowPanel(!showPanel)
              }}
            />
            <span className="w-8 h-4 flex items-center flex-shrink-0 ml-0 p-1 bg-gray-400 rounded-full duration-300 ease-in-out peer-checked:bg-indigo-600 after:w-3 after:h-3 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-3 mt-1"></span>
          </label>
        </h2>
      </div>

      <div className={`group ${!showPanel && 'invisible'}`}>
        <div className="grid grid-cols-2 gap-4 px-2 text-center">
          <div className="col-span-1 shadow sm:rounded-md bg-gray-100 ">
            <div className="grid grid-cols-5 p-2 text-center text-xs font-sm text-gray-700 sm:text-sm">
              <label className="col-span-4 text-left text-l font-extrabold tracking-tight text-gray-900 sm:text-xl mx-4 pt-4">
                Base Unit
              </label>
            </div>
            {Object.keys(pre_base_unit).map((elem,idx) => {
              return (
                <div key={"pre_bu_"+idx} className="grid grid-cols-6 p-0 text-center text-xs font-sm text-gray-700 md:text-[10px] mx-4 pt-1.5">
                  <div key={"pre_bu_n_"+idx} className="col-span-3 text-left sm:text-sm">
                    {pre_base_unit[elem].name} :
                  </div>
                  <div key={"pre_bu_v_"+idx} className="col-span-2 font-medium truncate hover:text-clip sm:text-sm">
                    {pre_base_unit[elem].value.toPrecision(6)}{' '}
                  </div>
                  <div key={"pre_bu_u_"+idx} className="col-span-1 sm:text-sm">
                    {'[' +
                      (pre_base_unit[elem].unit !== '[]'
                        ? pre_base_unit[elem].unit
                        : ' ') +
                      ']'}
                  </div>
                </div>
              )
            })}
          </div>

          <div className="col-span-1 shadow sm:rounded-md bg-gray-100 ">
            <div className="grid grid-cols-5 p-2 text-center text-xs font-sm text-gray-700 sm:text-sm">
              <label className="col-span-4 text-left text-l font-extrabold tracking-tight text-gray-900 sm:text-xl mx-4 pt-4">
                Cell
              </label>
            </div>
            {Object.keys(pre_cell).map((elem,idx) => {
              return (
                <div key={"pre_c_"+idx} className="grid grid-cols-6 p-0 text-center text-xs font-sm text-gray-700 md:text-[10px] mx-4 pt-1.5">
                  <div key={"pre_c_n_"+idx} className="col-span-3 text-left sm:text-sm">
                    {pre_cell[elem].name} :
                  </div>
                  <div key={"pre_c_v_"+idx} className="col-span-2 font-medium truncate hover:text-clip sm:text-sm">
                    {pre_cell[elem].value.toPrecision(6)}{' '}
                  </div>
                  <div key={"pre_c_u_"+idx} className="col-span-1 sm:text-sm">
                    {'[' +
                      (pre_cell[elem].unit !== '[]'
                        ? pre_cell[elem].unit
                        : ' ') +
                      ']'}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="flex items-baseline mt-4 mb-6 pb-6 border-b border-slate-200"></div>
{/* 
      <div className="flex items-baseline mt-4 mb-6 pb-6 "></div>
      <button onClick={() => csvDownload([formular])}>Download Data</button>

      */}


    </>
  )
}

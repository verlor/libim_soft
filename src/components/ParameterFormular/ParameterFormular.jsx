import React, { useReducer, useState } from 'react'
import { useForm } from 'react-hook-form'
import '../../styles/global.css'
import { useSelector, useDispatch } from 'react-redux'
//import { setNumElectrodes, handleFormSubmit } from '../ParameterFormular/slice'
import { handleFormSubmit } from '../ParameterFormular/slice'
import { derivar } from './utils'
//import { calculo1, calculo2 } from '../Calcs/test'
import { form_feed } from '../Calcs/test'
import { calcExam } from '../Calcs/cuentas'
import Resultados from '../Resultados'
import { propsCall } from '../../api'
import { navigate } from 'gatsby'

export default function ParameterFormular() {
  const formulario = useSelector((state) => state.parameter)
  //const num_elec = useSelector((state) => state.parameter.num_elec)
  //const res1 = useSelector((state) => state.parameter.charge_tickness)
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm({
    defaultValues: {
      cathode_material_id: 'NMC',
      anode_material_id: 'LTO',
      electrolyte_id: 'LPF6 + EC',
      area: 50,
      n_coat: 2,
      n_base_units: 20,
      cathode_load: 5,
      cathode_add: 5,
      anode_add: 5,
      separator_thickness: 25,
      curr_collect_thickness_cu: 9,
      curr_collect_thickness_al: 15,
      slow_charge_rate_id: 0.1,
      fast_charge_rate_id: 5,
      n_series: 3,
      n_parallel: 3,
    },
  })
  const [result, setResult] = useState('')
  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        // dispatch(handleFormSubmit())
        //calculo1(data.cat_load, dispatch)
        //calculo2(data, dispatch)
        const respMat = await propsCall({ id: data.cathode_material_id })
        console.log({ respMat })
        form_feed(data, dispatch)
        calcExam(data, dispatch)
        navigate('/results/')
        setResult(JSON.stringify(data))
      })}
      className="shadow sm:rounded-md bg-gray-100"
    >
      <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl mx-4 pt-4">
        Chemistry
      </h2>
      <div className="grid grid-cols-3 gap-4 px-3">
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            Cathode Material
          </label>
          <select
            {...register('cathode_material_id')}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="NMC">NMC</option>
          </select>
        </div>
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            Anode Material
          </label>
          <select
            {...register('anode_material_id')}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option>LTO</option>
          </select>
        </div>
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            Electrolyte
          </label>
          <select
            {...register('electrolyte_id')}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option>LPF6 + EC</option>
          </select>
        </div>
      </div>
      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>
      <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
        Geommetry data
      </h2>
      <div className="grid grid-cols-2 gap-4 px-3">
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            Area [cm<sup>2</sup>]
          </label>
          <input
            {...register('area')}
            type="text"
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            Coats: Single (1) / Double (2)
          </label>
          <input
            {...register('n_coat')}
            type="text"
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-2 px-3">
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            # Basic Units
          </label>
          <input
            {...register('n_base_units')}
            type="text"
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            Cathode load [mg/cm<sup>2</sup>]
          </label>
          <input
            {...register('cathode_load')}
            type="text"
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
      </div>
      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>
      <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
        Additive Data
      </h2>
      <div className="grid grid-cols-2 gap-4 px-3 mt-1">
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            % additive +
          </label>
          <input
            {...register('cathode_add')}
            type="text"
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            % additive -
          </label>
          <input
            {...register('anode_add')}
            type="text"
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            Separator thickness [um]
          </label>
          <input
            {...register('separator_thickness')}
            type="text"
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            Cu Current Collector Thickness [um]
          </label>
          <input
            {...register('curr_collect_thickness_cu')}
            type="text"
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            Al Current Collector Thickness [um]
          </label>
          <input
            {...register('curr_collect_thickness_al')}
            type="text"
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
      </div>
      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>
      <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
        Operation Data
      </h2>
      <div className="grid grid-cols-2 gap-4 px-3 mt-1">
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            Min. C Rate
          </label>
          <select
            {...register('slow_charge_rate_id')}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="0.1">0.1</option>
          </select>
        </div>
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            Max. C Rate
          </label>
          <select
            {...register('fast_charge_rate_id')}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="5">5</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 px-3">
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            # Cells in series
          </label>
          <input
            {...register('n_series')}
            type="text"
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            # Cells in parallel
          </label>
          <input
            {...register('n_parallel')}
            type="text"
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
      </div>

      <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 mt-2">
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Compute Properties
        </button>
      </div>
    </form>
  )
}

//  <p>{JSON.stringify(formulario)}</p>

// location.assign("/results/");

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import '../styles/global.css'

export default function ParameterFormular() {
  const { register, handleSubmit } = useForm()
  const [result, setResult] = useState('')
  return (
    <form
      onSubmit={handleSubmit((data) => setResult(JSON.stringify(data)))}
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
            Area/cm<sup>2</sup>
          </label>
          <input
            {...register('area')}
            type="text"
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            Single (1) / Double (2) coated
          </label>
          <input
            {...register('coated')}
            type="text"
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-2 px-3">
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            # electrodes +
          </label>
          <input
            {...register('num_electrodes')}
            type="text"
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            Cath. load/ (mg/cm<sup>2</sup>)
          </label>
          <input
            {...register('cat_load')}
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
      <div className="grid grid-cols-1 gap-4 px-3 mt-1">
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            % additive +
          </label>
          <input
            {...register('additive_pos')}
            type="text"
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            % additive -
          </label>
          <input
            {...register('additive_neg')}
            type="text"
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            Sep. thickness /(um)
          </label>
          <input
            {...register('sep_thickness')}
            type="text"
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            CC Cu thickness / (um)
          </label>
          <input
            {...register('cc_cu_thickness')}
            type="text"
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            CC Al thickness / (um)
          </label>
          <input
            {...register('cc_al_thickness')}
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
            Min. Crate
          </label>
          <input
            {...register('min_crate')}
            type="text"
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            Max. Crate
          </label>
          <input
            {...register('max_crate')}
            type="text"
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 px-3">
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            Serie
          </label>
          <input
            {...register('serie')}
            type="text"
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            Paralel
          </label>
          <input
            {...register('paralel')}
            type="text"
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
      </div>
      <p>{result}</p>
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

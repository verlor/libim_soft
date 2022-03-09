import React from 'react'
import { useSelector } from 'react-redux'
import '../../styles/global.css'

export default function Resultados() {
  const formular = useSelector((state) => state.resultados.suma?.formularData)
  const before = useSelector((state) => state.resultados.suma?.before_calc)
  const fast = useSelector((state) => state.resultados.suma?.fast)
  const slow = useSelector((state) => state.resultados.suma?.slow)
  // const res_1 = useSelector((state) => state.resultados.results)

  // function toggle = document.activeElement.className

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

      <form
        /*
      onSubmit={handleSubmit(async (data) => {
        // dispatch(handleFormSubmit())
        //calculo1(data.cat_load, dispatch)
        //calculo2(data, dispatch)
        const respMat = await propsCall({ id: data.cathode_material_id })
        // console.log({ respMat })
        form_feed(data, dispatch)
        calcExam(data, dispatch)
        navigate('/results/')
        setResult(JSON.stringify(data))
      })}
      */

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
              // {...register('cathode_material_id')}
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
              // {...register('anode_material_id')}
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
              // {...register('electrolyte_id')}
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
              // {...register('area')}
              type="text"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">
              Coats: Single (1) / Double (2)
            </label>
            <input
              // {...register('n_coat')}
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
              // {...register('n_base_units')}
              type="text"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">
              Cathode load [mg/cm<sup>2</sup>]
            </label>
            <input
              // {...register('cathode_load')}
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
              // {...register('cathode_add')}
              type="text"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">
              % additive -
            </label>
            <input
              // {...register('anode_add')}
              type="text"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">
              Separator thickness [um]
            </label>
            <input
              // {...register('separator_thickness')}
              type="text"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">
              Cu Current Collector Thickness [um]
            </label>
            <input
              // {...register('curr_collect_thickness_cu')}
              type="text"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">
              Al Current Collector Thickness [um]
            </label>
            <input
              // {...register('curr_collect_thickness_al')}
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
              // {...register('slow_charge_rate_id')}
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
              // {...register('fast_charge_rate_id')}
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
              // {...register('n_series')}
              type="text"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">
              # Cells in parallel
            </label>
            <input
              // {...register('n_parallel')}
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

      <div class="group flex font-sans">
        <div class="flex-none w-48 relative">
          <img
            src="/classic-utility-jacket.jpg"
            alt=""
            class="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <form class="flex-auto p-6">
          <div class="flex flex-wrap">
            <h1 class="flex-auto text-lg font-semibold text-slate-900">
              Información ingresada en el formulario
            </h1>
            <div class="text-lg font-semibold text-slate-500">
              <button
                class="h-10 px-6 font-semibold rounded-md bg-black text-white"
                type="submit"
              >
                Buy now
              </button>
            </div>
            <div class="w-full flex-none text-sm font-medium text-slate-700 mt-2">
              In stock
            </div>
          </div>
          <div class="flex items-baseline mt-4 mb-6 pb-6 border-b border-slate-200">
            <div class="space-x-2 flex text-sm">
              <label>
                <input
                  class="sr-only peer"
                  name="size"
                  type="radio"
                  value="xs"
                  checked
                />
                <div class="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white">
                  XS
                </div>
              </label>
              <label>
                <input
                  class="sr-only peer"
                  name="size"
                  type="radio"
                  value="s"
                />
                <div class="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white">
                  S
                </div>
              </label>
              <label>
                <input
                  class="sr-only peer"
                  name="size"
                  type="radio"
                  value="m"
                />
                <div class="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white">
                  M
                </div>
              </label>
              <label>
                <input
                  class="sr-only peer"
                  name="size"
                  type="radio"
                  value="l"
                />
                <div class="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white">
                  L
                </div>
              </label>
              <label>
                <input
                  class="sr-only peer"
                  name="size"
                  type="radio"
                  value="xl"
                />
                <div class="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white">
                  XL
                </div>
              </label>
            </div>
          </div>
          <div class="flex space-x-4 mb-6 text-sm font-medium">
            <div class="flex-auto flex space-x-4">
              <button
                class="h-10 px-6 font-semibold rounded-md bg-black text-white"
                type="submit"
              >
                Buy now
              </button>
              <button
                class="h-10 px-6 font-semibold rounded-md border border-slate-200 text-slate-900"
                type="button"
              >
                Add to bag
              </button>
            </div>
            <button
              class="flex-none flex items-center justify-center w-9 h-9 rounded-md text-slate-300 border border-slate-200"
              type="button"
              aria-label="Like"
            >
              <svg
                width="20"
                height="20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                />
              </svg>
            </button>
          </div>
          <p class="text-sm text-slate-700">
            Free shipping on all continental US orders.
          </p>
        </form>
      </div>

      <label class="flex justify-between items-center p-2 text-xl">
        <input
          id="ver_data_form"
          type="checkbox"
          class="hidden appearance-none peer"
        />
        {console.log(document.getElementById('ver_data_form'))}
        <span class="w-11 h-6 flex items-center flex-shrink-0 ml-4 p-1 bg-gray-400 rounded-full duration-300 ease-in-out peer-checked:bg-indigo-600 after:w-5 after:h-5 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-4"></span>
      </label>
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

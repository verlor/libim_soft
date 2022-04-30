import React, { useReducer, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import '../../styles/global.css'
import { useSelector, useDispatch } from 'react-redux'
import { handleFormSubmit } from '../ParameterFormular/slice'
//import { derivar } from './utils'
import { form_feed } from '../Calcs/test'
import { calc } from '../Calcs/cuentas'
import Resultados from '../Resultados'
import { propsCall } from '../../api'
import { navigate } from 'gatsby'
import useSWR from 'swr'
import { getMaterialsFetcher } from '../../api'
import { stringify } from 'postcss'

export default function ParameterFormular() {
  const { data, _ } = useSWR(
    '?filter=%7B%22order%22%3A%20%22type%22%2C%0A%20%22order%22%3A%20%22name%22%2C%0A%20%20%22fields%22%3A%20%7B%0A%20%20%20%20%22name%22%3A%20true%2C%0A%20%20%20%20%22type%22%3A%20true%2C%0A%20%20%20%20%22c_rates%22%3A%20true%2C%0A%20%20%20%20%22id%22%3A%20true%0A%20%20%7D%0A%7D',
    //'?filter=%7B%22fields%22%3A%20%7B%0A%20%20%20%20%22name%22%3A%20true%2C%0A%20%20%20%20%22type%22%3A%20true%2C%0A%20%20%20%20%22c_rates%22%3A%20true%2C%0A%20%20%20%20%22id%22%3A%20true%0A%20%20%7D%0A%7D',
    getMaterialsFetcher
  )
  let resp_ca = []
  let resp_an = []
  let resp_el = []

  if (data) {
    resp_ca = data.filter((elem) => elem.type === 'cathode')
    resp_an = data.filter((elem) => elem.type == 'anode')
    resp_el = data.filter((elem) => elem.type == 'electrolyte')
  }
  
  const formulario = useSelector((state) => state.parameter)
  const dispatch = useDispatch()
  const { register, formState: { errors }, getValues, handleSubmit, watch } = useForm({
    reValidateMode: 'onChange',
    defaultValues: {
      cathode_material_id: '-1',
      anode_material_id: '-1',
      electrolyte_id: '-1',
      area: 50,
      n_base_units: 20,
      cathode_load: 5,
      coating_thickness: 50,
      cathode_add: 5,
      anode_add: 5,
      separator_thickness: 25,
      curr_collect_thickness_cu: 9,
      curr_collect_thickness_al: 15,
      slow_charge_rate_id: '-1',
      fast_charge_rate_id:'-1',
      n_series: 3,
      n_parallel: 3,
    },
    reValidateMode: 'onChange',
  })
  //const [result, setResult] = useState('')
  const cat_id = watch('cathode_material_id')
  const [cRates, setCRates] = useState([])
  useEffect(() => {
    setCRates(resp_ca?.find((cat) => cat.id == cat_id)?.c_rates)
  }, [cat_id])

  return (
    <form 
      onSubmit={handleSubmit(async (form_data) => {

        const respCathode = await propsCall(form_data.cathode_material_id)
        const respAnode = await propsCall(form_data.anode_material_id)
        const respElectrolyte = await propsCall(form_data.electrolyte_id)

        const foData = {
          cathode_material_id: {
            id: form_data.cathode_material_id,
            name: respCathode.name,
            //unit: respCathode.unit,
          },
          anode_material_id: {
            id:form_data.anode_material_id,
            name: respAnode.name,
            //unit: respAnode.unit,
          },
          electrolyte_id: {
            id: form_data.electrolyte_id,
            name: respElectrolyte.name,
            value:respElectrolyte.properties.density.value, 
            unit: respElectrolyte.properties.density.unit
          },
          area: {
            name: 'Area',
            value: form_data.area,
            unit: 'cm2',
          },
          n_base_units: {
            name: '# Base unit',
            value: form_data.n_base_units,
            unit: '[]',
          },
          cathode_load: {
            name: 'Cathode load',
            value: form_data.cathode_load,
            unit: 'mg cm-2',
          },
          coating_thickness: {
            name: 'Coating thickness',
            value: form_data.coating_thickness,
            unit: 'um cm2 mg-1',
          },
          cathode_add: {
            name: 'Cathode additives %',
            value: form_data.cathode_add,
            unit: '[]',
          },
          anode_add: {
            name: 'Anode additives %',
            value: form_data.anode_add,
            unit: '[]',
          },
          separator_thickness: {
            name: 'Separator thickness',
            value: form_data.separator_thickness,
            unit: 'um',
          },
          curr_collect_thickness_cu: {
            name: 'Cu Current collector thickness (cathode)',
            value: form_data.curr_collect_thickness_cu,
            unit: 'um',
          },
          curr_collect_thickness_al: {
            name: 'Al Current collector thickness (anode)',
            value: form_data.curr_collect_thickness_al,
            unit: 'um',
          },
          slow_charge_rate_id: {
            name: 'Slow charga rate',
            value: form_data.slow_charge_rate_id,
            unit: 'h-1',
          },
          fast_charge_rate_id: {
            name: 'Fast charge rate',
            value: form_data.fast_charge_rate_id,
            unit: 'h-1',
          },
          n_series: {
            name: '# cells in series',
            value: form_data.n_series,
            unit: '[]',
          },
          n_parallel: {
            name: '# cells in parallel',
            value: form_data.n_parallel,
            unit: '[]',
          },
          anode_real_capacity: respAnode.properties.anode_real_capacity,
          anode_theor_voltage: respAnode.properties.anode_voltage,
          cathode_theor_capacity: respCathode.properties.cathode_theor_capacity,
          sr_cathode_capacity: respCathode.properties.capacity[`${("C"+form_data.slow_charge_rate_id).replace('.',"")}`],
          sr_cathode_charge_voltage: respCathode.properties.charge_voltage[`${("C"+form_data.slow_charge_rate_id).replace('.',"")}`],
          sr_cathode_discharge_voltage: respCathode.properties.discharge_voltage[`${("C"+form_data.slow_charge_rate_id).replace('.',"")}`],
          fr_cathode_capacity: respCathode.properties.capacity[`${("C"+form_data.fast_charge_rate_id).replace('.',"")}`],
          fr_cathode_charge_voltage: respCathode.properties.charge_voltage[`${("C"+form_data.fast_charge_rate_id).replace('.',"")}`],
          fr_cathode_discharge_voltage: respCathode.properties.discharge_voltage[`${("C"+form_data.fast_charge_rate_id).replace('.',"")}`],
        }
        console.log(foData)
        //form_feed(form_data, dispatch)
        //calc(form_data, dispatch)
        calc(foData, dispatch)
        navigate('/results/')
        //setResult(JSON.stringify(form_data))
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
            {...register('cathode_material_id', { required: true,
              validate: { notDefault: (v) => parseFloat(v) !== -1}, 
              })}
              name="cathode_material_id"
              style={{
                border: errors.slow_charge_rate_id
                  ? '2px solid red'
                  : '',
              }}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            {!data ? (
              <option value="-1">Loading</option>
            ) : (
              <>
                <option value="-1" >Select one</option>
                {resp_ca.map((elem) => (
                  <option value={elem.id}>{elem.name}</option>
                ))}
              </>
            )}
          </select>
          {errors.cathode_material_id && errors.cathode_material_id.type === 'required' && <span className="italic text-xs font-medium text-red-400">A selection is required</span>}
          {errors.cathode_material_id && errors.cathode_material_id.type === 'notDefault' && <span className="italic text-xs font-medium text-red-400">A selection is required</span>}
        </div>
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            Anode Material
          </label>
          <select
            {...register('anode_material_id', { required: true,
              validate: { notDefault: (v) => parseFloat(v) !== -1}, 
              })}
              name="anode_material_id"
              style={{
                border: errors.slow_charge_rate_id
                  ? '2px solid red'
                  : '',
              }}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            {!data ? (
              <option value="-1">Loading</option>
            ) : (
              <>
              <option value="-1" >Select one</option>
                {resp_an.map((elem) => (
                  <option value={elem.id}>{elem.name}</option>
                ))}
              </>
            )}
          </select>
          {errors.anode_material_id && errors.anode_material_id.type === 'required' && <span className="italic text-xs font-medium text-red-400">A selection is required</span>}
          {errors.anode_material_id && errors.anode_material_id.type === 'notDefault' && <span className="italic text-xs font-medium text-red-400">A selection is required</span>}
        </div>
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            Electrolyte
          </label>
          <select
            {...register('electrolyte_id', { required: true,
              validate: { notDefault: (v) => parseFloat(v) !== -1}, 
              })}
              name="electrolyte_id"
              style={{
                border: errors.slow_charge_rate_id
                  ? '2px solid red'
                  : '',
              }}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            {!data ? (
              <option value="-1">Loading</option>
            ) : (
              <>
              <option value="-1" >Select one</option>
                {resp_el.map((elem) => (
                  <option value={elem.id}>{elem.name}</option>
                ))}
              </>
            )}
          </select>
          {errors.electrolyte_id && errors.electrolyte_id.type === 'required' && <span className="italic text-xs font-medium text-red-400">A selection is required</span>}
          {errors.electrolyte_id && errors.electrolyte_id.type === 'notDefault' && <span className="italic text-xs font-medium text-red-400">A selection is required</span>}
        </div>
      </div>
      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>

      <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl mx-4">
        Geommetry data
      </h2>
      <div className="grid grid-cols-2 gap-4 px-3">
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            Area [cm<sup>2</sup>]
          </label>
          <input
            {...register('area', { required: true, min: 0})}
            type="number"
            step="any"
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
          {errors.area?.type === 'required' && <span className="italic text-xs font-medium text-red-400">A numeric value is required</span>}
        </div>
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            # Base Units
          </label>
          <input
            {...register('n_base_units', { required: true, min: 0})}
            type="number"
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
          {errors.n_base_units?.type === 'required' && <span className="italic text-xs font-medium text-red-400">An integer value is required</span>}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-2 px-3">
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            Cathode Load [um cm<sup>2</sup>/mg]
          </label>
          <input
            {...register('cathode_load', { required: true, min: 0})}
            type="number"
            step="any"
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
          {errors.cathode_load?.type === 'required' && <span className="italic text-xs font-medium text-red-400">A numeric value is required</span>}
        </div>
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            Coating Thickness [um]
          </label>
          <input
            {...register('coating_thickness', { required: true, min: 0})}
            type="number"
            step="any"
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
          {errors.coating_thickness?.type === 'required' && <span className="italic text-xs font-medium text-red-400">A numeric value is required</span>}
        </div>
      </div>
      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>
      <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl mx-4">
        Additive Data
      </h2>
      <div className="grid grid-cols-2 gap-4 px-3 mt-1">
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            % additive +
          </label>
          <input
            {...register('cathode_add', { required: true, min: 0,max:100})}
            type="number"
            step="any"
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
          {errors.cathode_add?.type === 'required' && <span className="italic text-xs font-medium text-red-400">A number between 0 and 100 is required</span>}
        </div>
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            % additive -
          </label>
          <input
            {...register('anode_add', { required: true, min: 0, max:100})}
            type="number"
            step="any"
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
           {errors.anode_add?.type === 'required' && <span className="italic text-xs font-medium text-red-400">A number between 0 and 100 is required</span>}
        </div>
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            Separator thickness [um]
          </label>
          <input
            {...register('separator_thickness', { required: true, min: 0})}
            type="number"
            step="any"
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
          {errors.separator_thickness?.type === 'required' && <span className="italic text-xs font-medium text-red-400">A numeric value is required</span>}
        </div>
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            Cu Current Collector Thickness [um]
          </label>
          <input
            {...register('curr_collect_thickness_cu', { required: true,  min: 0})}
            type="number"
            step="any"
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
          {errors.curr_collect_thickness_cu?.type === 'required' && <span className="italic text-xs font-medium text-red-400">A numeric value is required</span>}
        </div>
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            Al Current Collector Thickness [um]
          </label>
          <input
            {...register('curr_collect_thickness_al', { required: true})}
            type="number"
            step="any"
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
          {errors.curr_collect_thickness_al?.type === 'required' && <span className="italic text-xs font-medium text-red-400">A numeric value is required</span>}
        </div>
      </div>
      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>
      <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl mx-4">
        Operation Data
      </h2>
      <div className="grid grid-cols-2 gap-4 px-3 mt-1">
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            Min. C Rate [h<sup>-1</sup>]
          </label>
          <select
            {...register('slow_charge_rate_id', { required: true,
            validate: { notDefault: (v) => parseFloat(v) !== -1}, 
            })}
            name="slow_charge_rate_id"
            style={{
              border: errors.slow_charge_rate_id
                ? '2px solid red'
                : '',
            }}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
             <>
              <option value="-1" >Select one</option>
              {cRates?.map((rate) => (
              <option value={rate}>{rate}</option>
                ))}
              </>
          </select>
          {errors.slow_charge_rate_id && errors.slow_charge_rate_id.type === 'required' && <span className="italic text-xs font-medium text-red-400">A selection is required</span>}
          {errors.slow_charge_rate_id && errors.slow_charge_rate_id.type === 'notDefault' && <span className="italic text-xs font-medium text-red-400">A selection is required</span>}
        </div>
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            Max. C Rate [h<sup>-1</sup>]
          </label>
          <select
            {...register('fast_charge_rate_id', {
              required: true, 
              validate: { gtr: (v) => parseFloat(v) > parseFloat(getValues('slow_charge_rate_id'))}, 
            })}
            name="slow_charge_rate_id"
            style={{
              border: errors.fast_charge_rate_id
                ? '2px solid red'
                : '',
            }}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          > 
             <>
              <option value="-1" >Select one</option>
              {cRates?.map((rate) => (
              <option value={rate}>{rate}</option>
                ))}
              </>
 
          </select>
          {errors.fast_charge_rate_id && errors.fast_charge_rate_id.type === 'required' && <span className="italic text-xs font-medium text-red-400">A selection is required</span>}
          {errors.fast_charge_rate_id && errors.fast_charge_rate_id.type === 'gtr' && <span className="italic text-xs font-medium text-red-400">Selected value must be greater than Min. C Rate</span>}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 px-3">
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            # Cells in series
          </label>
          <input
            {...register('n_series')}
            type="number"
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            # Cells in parallel
          </label>
          <input
            {...register('n_parallel')}
            type="number"
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

import React, { useReducer, useState, useEffect } from 'react'
import '../../styles/global.css'
import { useForm, useFieldArray, Controller } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import { getMaterialsFetcher, propsCall } from '../../api'

let renderCount = 0

export default function NewCathodeForm (name, type) {
  const dispatch = useDispatch()
  const {
    register,
    control,
    formState: { errors },
    getValues,
    handleSubmit,
    watch,
    reset,
    trigger,
    setError,
  } = useForm({
    defaultValues: {
        cathode_theor_capacity: 0,
        cathode_theor_voltage: 0,
        cathode_theor_density: 0,
        crate: [{ rate: 0, capacity: 0, charge_voltage:0, discharge_voltage: 0 }],
    },
  })

  const { fields, append, remove } =
    useFieldArray({
      control,
      name: 'crate',
    })

  const onSubmit = (data) => {

   const onSubmit = (mat_data) => {


const newMat = {
  name: name,
  type: type,
  c_rates: [fieds.crate.index.rate],
  properties:{
    cathode_theor_capacity: {
        name: "Cathode theoretical capacity",
        s_name: "ca_th_cap",
        value: fields.cathode_theor_capacity,
        unit: "mAhg-1"
      },
      cathode_theor_voltage: {
        name: "Cathode theoretical voltage",
        s_name: "ca_th_V",
        value: fields.cathode_theor_voltage,
        unit: "V"
      },
      cathode_theor_density: {
        name: "Cathode theoretical density",
        s_name: "ca_th_rho",
        value: fields.cathode_theor_density,
        unit: "mWhg-1"
      },

  }
}

  }

    
  }

  const [fetchedMaterial, setFetchedMat] = useState({})

  useEffect(async () => {
    const myMaterial = await propsCall(watchedMat)
    setFetchedMat(myMaterial)
    //console.log('uu',{ myMaterial })
  }, [watchedMat])

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className=" shadow sm:rounded-md bg-gray-100 "
    >  
     <div className="flex items-baseline mt-2 mb-2 pb-1 border-slate-200"></div>
        <div className="flex items-center grid grid-cols-3 gap-4 px-3">
          <div className="col-span-1">
            <label className="block  text-right text-sm font-medium text-gray-700">
              Theoretical capacity
            </label>
          </div>
          <div className="col-span-1">
            <input
              {...register('cathode_theor_capacity', {
                required: true,
                min: 0,
              })}
              type="number"
              step="any"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
            {errors.cathode_theor_capacity?.type === 'required' && <span className="italic text-xs font-medium text-red-400">A numeric value is required</span>}
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">
              mA h g<sup>-1</sup>
            </label>
          </div>
        </div>

        <div className="flex items-baseline mt-2 mb-2 pb-1 border-slate-200"></div>

        <div className="flex items-center grid grid-cols-3 gap-4 px-3">
          <div className="col-span-1">
            <label className="block text-right text-sm font-medium text-gray-700">
            Theoretical voltage
            </label>
          </div>
          <div className="col-span-1">
            <input
              {...register('cathode_theor_voltage', {
                required: true,
                min: 0,
              })}
              type="number"
              step="any"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
            {errors.cathode_theor_voltage?.type === 'required' && <span className="italic text-xs font-medium text-red-400">A numeric value is required</span>}
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">
              V
            </label>
          </div>
        </div>

        <div className="flex items-baseline mt-2 mb-2 pb-1 border-slate-200"></div>

        <div className="flex items-center grid grid-cols-3 gap-4 px-3">
          <div className="col-span-1">
            <label className="block text-right text-sm font-medium text-gray-700">
            Theoretical energy density
            </label>
          </div>
          <div className="col-span-1">
            <input
              {...register('cathode_theor_density', {
                required: true,
                min: 0,
              })}
              type="number"
              step="any"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
            {errors.cathode_theor_density?.type === 'required' && <span className="italic text-xs font-medium text-red-400">A numeric value is required</span>}
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">
            mW h g <sup>-1</sup>
            </label>
          </div>
        </div>
    

{/*crates con field array */}

        <label className="block text-sm font-medium text-gray-700">
            C Rate Values 
        </label>


        <div className="flex items-baseline mt-2 mb-2 pb-1 border-slate-200"></div>
       
        <div >
        {fields.map((item, index) => {
          return (
            <>
            <div key={item.id} className="flex items-center grid grid-cols-3 gap-4 px-3">
              <div className="col-span-1">
                <label className="block text-right text-sm font-medium text-gray-700">
                  C rate 
                </label>
              </div>
              <div className="col-span-1">
                  <input
                    {...register(`crate.${index}.rate`, {
                      required: true,
                      min: 0,
                    })}
                    type="number"
                    step="any"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                  {/*errors.`crate.${index}.rate`.value?.type === 'required' && <span className="italic text-xs font-medium text-red-400">A numeric value is required</span>*/}
              </div>
              <div className="col-span-1">
                  <label className="block text-sm font-medium text-gray-700">
                    [h <sup>-1</sup>]
                  </label>
              </div>

              <div className="col-span-1">
                <label className="block text-right text-sm font-medium text-gray-700">
                  Capacity 
                </label>
              </div>
              <div className="col-span-1">
                  <input
                    {...register(`crate.${index}.capacity`, {
                      required: true,
                      min: 0,
                    })}
                    type="number"
                    step="any"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                  {/*errors.`crate.${index}.capacity`.value?.type === 'required' && <span className="italic text-xs font-medium text-red-400">A numeric value is required</span>*/}
              </div>
              <div className="col-span-1">
                  <label className="block text-sm font-medium text-gray-700">
                  [mA h g<sup>-1</sup>]
                  </label>
              </div>

              <div className="col-span-1">
                <label className="block text-right text-sm font-medium text-gray-700">
                  Charge voltage 
                </label>
              </div>
              <div className="col-span-1">
                  <input
                    {...register(`crate.${index}.charge_voltage`, {
                      required: true,
                      min: 0,
                    })}
                    type="number"
                    step="any"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                  {/*errors.`crate.${index}.charge_voltage`.value?.type === 'required' && <span className="italic text-xs font-medium text-red-400">A numeric value is required</span>*/}
              </div>
              <div className="col-span-1">
                  <label className="block text-sm font-medium text-gray-700">
                  [V]
                  </label>
              </div>

              <div className="col-span-1">
                <label className="block text-right text-sm font-medium text-gray-700">
                  Discharge voltage 
                </label>
              </div>
              <div className="col-span-1">
                  <input
                    {...register(`crate.${index}.discharge_voltage`, {
                      required: true,
                      min: 0,
                    })}
                    type="number"
                    step="any"
                    className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                  {/*errors.`crate.${index}.discharge_voltage`.value?.type === 'required' && <span className="italic text-xs font-medium text-red-400">A numeric value is required</span>*/}
              </div>
              <div className="col-span-1">
                  <label className="block text-sm font-medium text-gray-700">
                  [V]
                  </label>
              </div>

<div className="col-span-2"></div>
        <div className="w-1/6 items-end">
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-xs font-medium rounded-md text-white bg-gray-500 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={() => remove(index)}
        >
          Delete 
        </button>
      </div>


           <div className="flex items-baseline mt-2 mb-2 pb-1 border-slate-200"></div>
              
            </div>
            </>
          )})
          
        }
        
      <section className="grid grid-cols-2 gap-4 px-8">
        <button 
        type="submit"
        className=" w-32 py-2 px-4 border border-transparent shadow-sm text-xs font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={() => {
            append({ rate: 0, capacity: 0, charge_voltage: 0, discharge_voltage: 0})
          }}
        >
          Add C rate
        </button>
        <button 
                   type="submit"
                   className="w-32 py-2 px-4 border border-transparent shadow-sm text-xs font-medium rounded-md text-white bg-gray-500 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
         
          onClick={() =>
            reset({
              crate: [{ rate: 0, capacity: 0, charge_voltage: 0, discharge_voltage: 0}],
            })
          }
        >
          Reset C rates
        </button>
      </section>

      </div>




      <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 mt-2">
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save Material
        </button>
      </div>
    </form>
  )
}






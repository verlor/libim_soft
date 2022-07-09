import React from 'react'
import '../../styles/global.css'
import { useForm, useFieldArray } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { postNewMaterial } from '../../api'
import { setIsCreated } from './slice'
import {navigate} from 'gatsby'


export default function NewCathodeForm(matType) {
  const dispatch = useDispatch()
  const {
    getValues,
    register,
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    reValidateMode: 'onChange',
    defaultValues: {
      newMatName: '',
      cathode_theor_capacity: 0,
      cathode_theor_voltage: 0,
      cathode_theor_density: 0,
       crate: [
         { rate: 0, capacity: 0, charge_voltage: 0, discharge_voltage: 0 },
       ],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'crate',
  })

  const validateCRates = (index) =>{
    console.log('index',index)
    console.log('length_f',fields.item)

    if (fields.length==1) {return true}
    if (fields.length>1){
      for (let i = 0; i < fields.length; i++) {
      
      
        console.log ('i',i)
      console.log ('fi_rate',fields[i].rate)
      }
  if(getValues(`crate.${index}.rate`)>getValues(`crate.${index-1}.rate`)){return true}
  if(getValues(`crate.${index}.rate`)==getValues(`crate.${index-1}.rate`)){return false}
  } 
  }

  /*
  const validateCRates = (index) =>{
    console.log('length',fields.length)
    if (index==0) {return true}
    if (index>0){
  if(getValues(`crate.${index}.rate`)>getValues(`crate.${index-1}.rate`)){return true}
  if(getValues(`crate.${index}.rate`)<=getValues(`crate.${index-1}.rate`)){return false}
  } 
  }
  */ 


  const TextParams = (
    newName,
    newTheorCapacity,
    newTheorVoltage,
    newTheorDensity,
    crate
  ) => {
    let toAddObj,
      capacity,
      charge_voltage,
      discharge_voltage = {},
      c_rates = [],
      cky
    
      for (let i = 0; i < crate.length; i++) {
      cky = 'C' + String(parseFloat(crate[i].rate)).replace('.', '')


      capacity = {
        ...capacity,
        [cky]: {
          name: 'Cathode capacity',
          s_name: 'ca_cap',
          rate: parseFloat(crate[i].rate),
          value: parseFloat(crate[i].capacity),
          unit: 'mAhg-1',
        },
      }
      charge_voltage = {
        ...charge_voltage,
        [cky]: {
          name: 'Cathode charge voltage',
          s_name: 'ca_ch_V',
          rate: parseFloat(crate[i].rate),
          value: parseFloat(crate[i].charge_voltage),
          unit: 'V',
        },
      }
      discharge_voltage = {
        ...discharge_voltage,
        [cky]: {
          name: 'Cathode discharge voltage',
          s_name: 'ca_dch_V',
          rate: parseFloat(crate[i].rate),
          value: parseFloat(crate[i].discharge_voltage),
          unit: 'V',
        },
      }

      c_rates[i] = parseFloat(crate[i].rate)
      toAddObj = { capacity, charge_voltage, discharge_voltage }
    }

    const step = {
      name: newName,
      type: 'cathode',
      properties: {
        cathode_theor_capacity: {
          name: 'Cathode theoretical capacity',
          s_name: 'ca_th_cap',
          value: parseFloat(newTheorCapacity),
          unit: 'mAhg-1',
        },
        cathode_theor_voltage: {
          name: 'Cathode theoretical voltage',
          s_name: 'ca_th_V',
          value: parseFloat(newTheorVoltage),
          unit: 'V',
        },
        cathode_theor_density: {
          name: 'Cathode theoretical density',
          s_name: 'ca_th_rho',
          value: parseFloat(newTheorDensity),
          unit: 'mWhg-1',
        },
        capacity: toAddObj.capacity,
        charge_voltage: toAddObj.charge_voltage,
        discharge_voltage: toAddObj.discharge_voltage,
      },
      c_rates,
    }
    return step
  }

  {console.log('errors',errors)}

  return (
    <form
      onSubmit={handleSubmit(async (newCathodeData) => {
        const reqNewCathode = await postNewMaterial(
          TextParams(
            newCathodeData?.newMatName,
            newCathodeData?.cathode_theor_capacity,
            newCathodeData?.cathode_theor_voltage,
            newCathodeData?.cathode_theor_density,
            newCathodeData?.crate
          )
        )
        dispatch(
          setIsCreated({ 
            matCreated: true,
            matType: 'Cathode',
            matName: newCathodeData?.newMatName,
          })
        )
        navigate('/')
      })}
    >
      <div className="shadow sm:rounded-md bg-gray-100">
        <div className="flex items-baseline mt-2 mb-2 pb-1 border-slate-200"></div>

        <div className="flex items-center grid grid-cols-3 gap-4 px-3 ">
          <div className="col-span-1">
            <label className="block  text-right text-sm font-medium text-gray-700">
              Material name
            </label>
          </div>
          <div className="col-span-1">
            <input
              {...register('newMatName', {
                required: true,
              })}
              type="text"
              name="newMatName"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              style={{ border: errors.newMatName ? '2px solid red' : '' }}
            />
            {errors.newMatName?.type === 'required' && (
              <span className="col-span-1 italic text-xs font-medium text-red-400">
                (A name is required)
              </span>
            )}
          </div>

          <div className="flex items-baseline mt-2 mb-2 pb-1 border-slate-200"></div>
          <div className="col-span-1">
            <label className="block  text-right text-sm font-medium text-gray-700">
              Theoretical capacity
            </label>
          </div>

          <div className="col-span-1">
            <input
              {...register('cathode_theor_capacity', {
                required: true,
                minLength:0,
              })}
              type="number"
              step="any"
              name="cathode_theor_capacity"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              style={{
                border: errors.cathode_theor_capacity ? '2px solid red' : '',
              }}
            />
          {(errors.cathode_theor_capacity?.type === 'required' || errors.cathode_theor_capacity?.type === 'minLength') && (
            <span className="italic text-xs font-medium text-red-400">
              (A numerical value is required)
            </span>
          )}
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
                minLength:0,
              })}
              type="number"
              step="any"
              name="cathode_theor_voltage"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              style={{
                border: errors.cathode_theor_voltage ? '2px solid red' : '',
              }}
            />
          {(errors.cathode_theor_voltage?.type === 'required' || errors.cathode_theor_voltage?.type === 'minLength') && (
            <span className="italic text-xs font-medium text-red-400">
              (A numerical value is required)
            </span>
          )}
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">V</label>
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
                minLength:0,
              })}
              type="number"
              step="any"
              name="cathode_theor_density"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              style={{
                border: errors.cathode_theor_density ? '2px solid red' : '',
              }}
            />
          {(errors.cathode_theor_density?.type === 'required' || errors.cathode_theor_density?.type === 'minLength') && (
            <span className="italic text-xs font-medium text-red-400">
              (A numerical value is required)
            </span>
          )}
          </div>

          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">
              mW h g <sup>-1</sup>
            </label>
          </div>
        </div>

        {/*crates con field array */}

        <div className="flex items-baseline mt-2 mb-2 pb-1 border-slate-200"></div>
      </div>

      <div className="flex items-baseline mt-2 mb-2 pb-1 border-slate-200"></div>

      <h2 className="text-md font-extrabold tracking-tight text-gray-700 mx-6 pt-6">
        C Rate Values
      </h2>

      <div className="flex items-baseline mt-2 mb-2 pb-1 border-slate-200"></div>

      <div>
        {fields.map((item, index) => {
       /*   console.log('item',item)
          console.log('index',index)
          console.log('fields',fields)
          console.log('2length_f',fields.length)
          console.log('2length_fr',fields[1].rate)
          console.log('item_rate',item.rate)
          console.log('item_index',index)
       */   

          return (
            <>
              <div className="shadow sm:rounded-md bg-gray-100" >
                <div className="flex items-baseline mt-2 mb-2 pb-1 border-slate-200"></div>
                <div className="flex items-center grid grid-cols-3 gap-4 px-3 ">
                  <div className="col-span-1">
                    <label className="block text-right text-sm font-medium text-gray-700">
                      C rate
                    </label>
                  </div>
                  <div className="col-span-1">
                    <input
                      key={item.id}
                      {...register(`crate.${index}.rate`, {
                        required: true,
                        min:0.000001,
                        validate: {compare: (index)=>validateCRates(index)}

                      })}
                      name={`crate.${index}.rate`}
                      type="number"
                      step="any"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      style={{
                        border: errors.crate?.[index]?.rate
                          ? '2px solid red'
                          : '',
                      }}
                    />
          {errors.crate?.[index]?.rate?.type === 'required' && (
            <span className="italic text-xs font-medium text-red-400">
              (A numerical value is required)
            </span>
          )}
                    {errors.crate?.[index]?.rate?.type === 'min' && (
            <span className="italic text-xs font-medium text-red-400">
              (A value &gt; 0 is required)
            </span>
          )}
           {errors.crate?.[index]?.rate?.type === 'compare' && (
            <span className="italic text-xs font-medium text-red-400">
              (Add C Rates in ascending order)
            </span>
          )}

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
                      key={item.id}
                      {...register(`crate.${index}.capacity`, {
                        required: true,
                        minLength:0,
                      })}
                      name={`crate.${index}.capacity`}
                      type="number"
                      step="any"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      style={{
                        border: errors.crate?.[index]?.capacity
                          ? '2px solid red'
                          : '',
                      }}
                    />
                     {(errors.crate?.[index]?.capacity?.type === 'required' || errors.crate?.[index]?.capacity?.type === 'minLength') && (
            <span className="italic text-xs font-medium text-red-400">
              (A numerical value is required)
            </span>
          )}
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
                      key={item.id}
                      {...register(`crate.${index}.charge_voltage`, {
                        required: true,
                        minLength:0,
                      })}
                      name={`crate.${index}.charge_voltage`}
                      type="number"
                      step="any"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      style={{
                        border: errors.crate?.[index]?.charge_voltage
                          ? '2px solid red'
                          : '',
                      }}
                    />
                           {(errors.crate?.[index]?.charge_voltage?.type === 'required' || errors.crate?.[index]?.charge_voltage?.type === 'minLength') && (
            <span className="italic text-xs font-medium text-red-400">
              (A numerical value is required)
            </span>
          )}
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
                      key={item.id}
                      {...register(`crate.${index}.discharge_voltage`, {
                        required: true,
                        minLength:0,
                      })}
                      name={`crate.${index}.discharge_voltage`}
                      type="number"
                      step="any"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      style={{
                        border: errors.crate?.[index]?.discharge_voltage
                          ? '2px solid red'
                          : '',
                      }}
                    />
                       {(errors.crate?.[index]?.discharge_voltage?.type === 'required' || errors.crate?.[index]?.discharge_voltage?.type === 'minLength') && (
            <span className="italic text-xs font-medium text-red-400">
              (A numerical value is required)
            </span>
          )}
                  </div>
                  <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-700">
                      [V]
                    </label>
                  </div>

                  <div className=" col-span-3 px-4  bg-gray-50 text-right ">
                    <button
                      type="button"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-xs font-medium rounded-md text-white bg-gray-500 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={() => remove(index)}
                    >
                      Del C rate
                    </button>
                  </div>
                  <br />
                </div>
              </div>
            </>
          )
        })}

        <div className="flex items-baseline mt-2 mb-2 pb-1 border-slate-200"></div>

        <section className=" flex items-center justify-center gap-4 ">
          <button
            type="button"
            className=" w-32 py-2 px-4 border border-transparent shadow-sm text-xs font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => {
              append({
                rate: 0,
                capacity: 0,
                charge_voltage: 0,
                discharge_voltage: 0,
              })
            }}
          >
            Add C rate
          </button>
          <button
            type="button"
            className="w-32 py-2 px-4 border border-transparent shadow-sm text-xs font-medium rounded-md text-white bg-gray-500 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() =>
              reset({
                rate: 0,
                capacity: 0,
                charge_voltage: 0,
                discharge_voltage: 0,
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
          Save new cathode
        </button>
      </div>
    </form>
  )
}

import React from 'react'
import '../../styles/global.css'
import { useForm, useFieldArray } from 'react-hook-form'
import { modMaterial } from '../../api'
import {navigate} from 'gatsby'

export default function ModCathodeForm(params) {
  const matID=params.matToMod.id
  //console.log('matID',matID)

  let loadActualCathode = {
    newMatName: `${params.matToMod.name}`,
    cathode_theor_capacity: `${params.matToMod.properties.cathode_theor_capacity.value}`,
    cathode_theor_voltage: `${params.matToMod.properties.cathode_theor_voltage.value}`,
    cathode_theor_density: `${params.matToMod.properties.cathode_theor_density.value}`,
    crate: [],
  }
  params.matToMod.c_rates.map(
    (e, i) => (loadActualCathode.crate[i] = { rate: e })
  ),
    Object.values(loadActualCathode.crate).map((ecrate) => {
      Object.values(params.matToMod.properties.capacity).map((ecapacity) => {
        if (ecrate.rate == ecapacity.rate) {
          ecrate.capacity = ecapacity.value
        }
      })
    })

  Object.values(loadActualCathode.crate).map((ecrate) => {
    Object.values(params.matToMod.properties.charge_voltage).map(
      (echarge_voltage) => {
        if (ecrate.rate == echarge_voltage.rate) {
          ecrate.charge_voltage = echarge_voltage.value
        }
      }
    )
  })

  Object.values(loadActualCathode.crate).map((ecrate) => {
    Object.values(params.matToMod.properties.discharge_voltage).map(
      (edischarge_voltage) => {
        if (ecrate.rate == edischarge_voltage.rate) {
          ecrate.discharge_voltage = edischarge_voltage.value
        }
      }
    )
  })

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
    defaultValues: loadActualCathode,
  })

  const { fields, append, remove, swap } = useFieldArray({
    control,
    name: 'crate',
  })


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


  return (
    <form
      onSubmit={handleSubmit(async (newCathodeData) => {
        const reqNewCathode = await modMaterial(matID,
          TextParams(
            newCathodeData?.newMatName,
            newCathodeData?.cathode_theor_capacity,
            newCathodeData?.cathode_theor_voltage,
            newCathodeData?.cathode_theor_density,
            newCathodeData?.crate
          )
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
                minLength: 0,
              })}
              type="number"
              step="any"
              name="cathode_theor_capacity"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              style={{
                border: errors.cathode_theor_capacity ? '2px solid red' : '',
              }}
            />
            {(errors.cathode_theor_capacity?.type === 'required' ||
              errors.cathode_theor_capacity?.type === 'minLength') && (
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
                minLength: 0,
              })}
              type="number"
              step="any"
              name="cathode_theor_voltage"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              style={{
                border: errors.cathode_theor_voltage ? '2px solid red' : '',
              }}
            />
            {(errors.cathode_theor_voltage?.type === 'required' ||
              errors.cathode_theor_voltage?.type === 'minLength') && (
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
                minLength: 0,
              })}
              type="number"
              step="any"
              name="cathode_theor_density"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              style={{
                border: errors.cathode_theor_density ? '2px solid red' : '',
              }}
            />
            {(errors.cathode_theor_density?.type === 'required' ||
              errors.cathode_theor_density?.type === 'minLength') && (
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

        {/*crates using field array */}

        <div className="flex items-baseline mt-2 mb-2 pb-1 border-slate-200"></div>
      </div>

      <div className="flex items-baseline mt-2 mb-2 pb-1 border-slate-200"></div>

      <h2 className="text-md font-extrabold tracking-tight text-gray-700 mx-6 pt-6">
        C Rate Values
      </h2>

      <div className="flex items-baseline mt-2 mb-2 pb-1 border-slate-200"></div>

      <div>
        {fields.map((item, index) => {
          return (
            <>
              <div className="shadow sm:rounded-md bg-gray-100">
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
                        min: 0.000001,
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
                        minLength: 0,
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
                    {(errors.crate?.[index]?.capacity?.type === 'required' ||
                      errors.crate?.[index]?.capacity?.type ===
                        'minLength') && (
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
                        minLength: 0,
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
                    {(errors.crate?.[index]?.charge_voltage?.type ===
                      'required' ||
                      errors.crate?.[index]?.charge_voltage?.type ===
                        'minLength') && (
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
                        minLength: 0,
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
                    {(errors.crate?.[index]?.discharge_voltage?.type ===
                      'required' ||
                      errors.crate?.[index]?.discharge_voltage?.type ===
                        'minLength') && (
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

                  <div className=" col-span-3 px-4  bg-gray-50 text-right space-x-2 inline-flex place-content-end ">
                    {index > 0 && (
                      <button
                        type="button"
                        className="  py-2 px-1 border border-transparent shadow-sm text-xs font-medium rounded-md text-white bg-gray-500 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={() => swap(index, index - 1)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    )}

                    <button
                      type="button"
                      className="  py-2 px-1 border border-transparent shadow-sm text-xs font-medium rounded-md text-white bg-gray-500 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={() => swap(index, index + 1)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>

                    <button
                      type="button"
                      className="  py-2 px-4 border border-transparent shadow-sm text-xs font-medium rounded-md text-white bg-gray-500 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={() => remove(index)}
                    >
                      Del C rate
                    </button>
                  </div>
                  <br />
                </div>
              </div>

              {watch(`crate.${index}.rate`) != 0 &&
              watch(`crate.${index}.rate`) ===
                watch(`crate.${index - 1}.rate`) &&
              getValues(`crate.${index}.rate`) ? (
                <span className="italic text-xs font-medium text-red-400" >
                  C Rates cannot be repeated <br/>
                </span>
              ) : null}

              {watch(`crate.${index}.rate`) != 0 &&
              watch(`crate.${index}.rate`) < watch(`crate.${index - 1}.rate`) &&
              getValues(`crate.${index}.rate`) ? (
                <span className="italic text-xs font-medium text-red-400" >
                  C Rates must be added in ascending order <br/>
                </span>
              ) : null}

            </>
          )
        })}

        <div className="flex items-baseline mt-2 mb-2 pb-1 border-slate-200"></div>

        {fields.length < 2 ? (append({
                rate: 0,
                capacity: 0,
                charge_voltage: 0,
                discharge_voltage: 0,
              })) : null}
        
  

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
          Save changes
        </button>
      </div>
    </form>
  )
}

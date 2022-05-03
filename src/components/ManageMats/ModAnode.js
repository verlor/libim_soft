import React, { useReducer, useState, useEffect } from 'react'
import '../../styles/global.css'
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import { getMaterialsFetcher, propsCall,postNewMaterial } from '../../api'

let renderCount = 0

export default function ModAnodeForm(matType) {
  const dispatch = useDispatch()
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
    trigger,
    setError,
  } = useForm({
    defaultValues: {
      newMatName: '',
      anode_theor_capacity: 0,
      anode_real_capacity: 0,
      anode_voltage: 0,
    },
  })

  const TextParams = (newName, newTheorCapacity, newRealCapacity, newVoltage) => {
    const step = {
      name: newName,
      type: 'anode',
      properties: {
        anode_theor_capacity: {
          name: 'Anode theoretical capacity',
          s_name: 'an_th_cap', 
          value: parseFloat(newTheorCapacity),
          unit: 'mAhg-1'
        },
        anode_real_capacity: {
          name: 'Anode real capacity',
          s_name: 'an_re_cap', 
          value: parseFloat(newRealCapacity),
          unit: 'mAhg-1'
        },
        anode_voltage: {
          name: 'Anode voltage',
          s_name: 'anode_V', 
          value: parseFloat(newVoltage),
          unit: 'V'
        },
      },
    }
    //console.log('ver str: ', JSON.stringify(step))
    return JSON.stringify(step)
  }



  return (
    <form
    onSubmit={handleSubmit(async (newAnodeData) => {
      const reqNewElectrolyte = await postNewMaterial(
        TextParams(
          newAnodeData?.newMatName,
          newAnodeData?.anode_theor_capacity,
          newAnodeData?.anode_real_capacity,
          newAnodeData?.anode_voltage
        )
      )
      //console.log('ver_resp_form: ' , TextParams(NewElectrolyteData?.newMatName, NewElectrolyteData?.density))
    })}

      className=" shadow sm:rounded-md bg-gray-100 "
    >
      <div className="flex items-baseline mt-2 mb-2 pb-1 border-slate-200"></div>

      <div className="flex items-center grid grid-cols-3 gap-4 px-3">
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
            {...register('anode_theor_capacity', {
              required: true,
              validate: { positive: (v) => parseFloat(v) > 0 },
            })}
            type="number"
            step="any"
            name="anode_theor_capacity"
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            style={{
              border: errors.anode_theor_capacity ? '2px solid red' : '',
            }}
          />
          {errors.anode_theor_capacity?.type === 'validate' && (
            <span className="italic text-xs font-medium text-red-400">
              A value &gt; 0 is required
            </span>
          )}
        </div>
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            mA g h<sup>-1</sup>
          </label>
        </div>
      </div>

      <div className="flex items-baseline mt-2 mb-2 pb-1 border-slate-200"></div>

      <div className="flex items-center grid grid-cols-3 gap-4 px-3">
        <div className="col-span-1">
          <label className="block  text-right text-sm font-medium text-gray-700">
            Real capacity
          </label>
        </div>
        <div className="col-span-1">
          <input
            {...register('anode_real_capacity', {
              required: true,
              validate: { positive: (v) => parseFloat(v) > 0 },
            })}
            type="number"
            step="any"
            name="anode_real_capacity"
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            style={{
              border: errors.anode_real_capacity ? '2px solid red' : '',
            }}
          />
          {errors.anode_real_capacity?.type === 'validate' && (
            <span className="italic text-xs font-medium text-red-400">
              A value &gt; 0 is required
            </span>
          )}
        </div>

        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            mA g h<sup>-1</sup>
          </label>
        </div>
      </div>

      <div className="flex items-baseline mt-2 mb-2 pb-1 border-slate-200"></div>

      <div className="flex items-center grid grid-cols-3 gap-4 px-3">
        <div className="col-span-1">
          <label className="block  text-right text-sm font-medium text-gray-700">
            Voltage
          </label>
        </div>
        <div className="col-span-1">
          <input
            {...register('anode_voltage', {
              required: true,
              validate: { positive: (v) => parseFloat(v) > 0 },
            })}
            type="number"
            step="any"
            name="anode_voltage"
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            style={{ border: errors.anode_voltage ? '2px solid red' : '' }}
          />
          {errors.anode_voltage?.type === 'validate' && (
            <span className="italic text-xs font-medium text-red-400">
              A value &gt; 0 is required
            </span>
          )}
        </div>

        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">V</label>
        </div>
      </div>

      <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 mt-2">
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save new anode
        </button>
      </div>
    </form>
  )
}

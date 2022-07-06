import React from 'react'
import '../../styles/global.css'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { postNewMaterial } from '../../api'
import { setIsCreated } from './slice'
import {navigate} from 'gatsby'

export default function NewElectrolyteForm(matType) {
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
      density: 0,
    },
  })

  const TextParams = (newName, newValue) => {
    const step = {
      name: newName,
      type: 'electrolyte',
      properties: {
        density: {
          value: parseFloat(newValue),
          unit: 'g cm-3',
        },
      },
    }
    return JSON.stringify(step)
  }

  return (
    <form
      onSubmit={handleSubmit(async (newElectrolyteData) => {
        const reqNewElectrolyte = await postNewMaterial(
          TextParams(
            newElectrolyteData?.newMatName,
            newElectrolyteData?.density
          )
        )
        dispatch(
          setIsCreated({ 
            matCreated: true,
            matType: 'Electrolyte',
            matName: newElectrolyteData?.newMatName,
          })
        )
        navigate('/')
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
            Density
          </label>
        </div>
        <div className="col-span-1">
          <input
            {...register('density', {
              required: true,
              validate: { positive: (v) => parseFloat(v) != 0 },
            })}
            type="number"
            step="any"
            name="density"
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            style={{ border: errors.density ? '2px solid red' : '' }}
          />
          {errors.density?.type === 'validate' && (
            <span className="italic text-xs font-medium text-red-400">
              A value &gt; 0 is required
            </span>
          )}
        </div>
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            g cm<sup>-3</sup>
          </label>
        </div>
      </div>

      <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 mt-2">
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save new electrolyte
        </button>
      </div>
    </form>
  )
}

import React, { useReducer, useState, useEffect } from 'react'
import '../../styles/global.css'
import { useForm, useFieldArray, Controller } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import useSWR from 'swr'
import { getMaterialsFetcher, propsCall } from '../../api'

let renderCount = 0

export default function NewElectrolyteForm(name,type) {
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
        density: 0,
      
    },
  })



   /*

  const onSubmit = (name, type) => {
const NewMat ={
    name: name,
    type: type,
    properties: {
      density: {
        value: density,
        unit: "g cm-3"
      }
    }
}

  }



 const watchedMat = watch('selectedMat')

  const [fetchedMaterial, setFetchedMat] = useState({})

  useEffect(async () => {
    const myMaterial = await propsCall(watchedMat)
    setFetchedMat(myMaterial)
    //console.log('uu',{ myMaterial })
  }, [watchedMat])
*/

  return (
    <form
      onSubmit={
          handleSubmit((f_el_data) => {
              
            const NewMat ={
                name: name,
                type: type,
                properties: {
                  density: {
                    value: density,
                    unit: "g cm-3"
                  }
                }
            }
          })}


      className=" shadow sm:rounded-md bg-gray-100 "
    >
      <div className="flex items-baseline mt-2 mb-2 pb-1 border-slate-200"></div>

 
        <div className="flex items-center grid grid-cols-3 gap-4 px-3">
          <div className="col-span-1">
            <label className="block  text-right text-sm font-medium text-gray-700">
              Density
            </label>
          </div>
          <div className="col-span-1">
            <input
              {...register('density', {
                required: true,
                min: 0,
              })}
              type="number"
              step="any"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
            {errors.density?.type === 'required' && <span className="italic text-xs font-medium text-red-400">A numeric value is required</span>}
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
          submit
          {/*console.log('name', watch('name'),'type',watch('type'))*/}
        </button>
      </div>
    </form>
  )
}






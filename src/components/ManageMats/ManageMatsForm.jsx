import React, { useReducer, useState, useEffect } from 'react'
import '../../styles/global.css'
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import useSWR from 'swr'
import { getMaterialsFetcher, propsCall } from '../../api'

export default function ModMatsForm() {
  const dispatch = useDispatch()
  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit,
    watch,
  } = useForm({
    defaultValues: {
      selectedMat: '',
      anotherfield: '',
      ini_choice: '',
    },
  })

  const { data, _ } = useSWR(
    '?filter=%7B%22order%22%3A%20%22type%22%2C%0A%20%22order%22%3A%20%22name%22%2C%0A%20%20%22fields%22%3A%20%7B%0A%20%20%20%20%22name%22%3A%20true%2C%0A%20%20%20%20%22type%22%3A%20true%2C%0A%20%20%20%20%22c_rates%22%3A%20true%2C%0A%20%20%20%20%22id%22%3A%20true%0A%20%20%7D%0A%7D',
    getMaterialsFetcher
  )
  const watchedMat = watch('selectedMat')
  const [fetchedMaterial, setFetchedMat] = useState({})

  useEffect(async () => {
    const myMaterial = await propsCall(watchedMat)
    setFetchedMat(myMaterial)
    console.log({ myMaterial })
  }, [watchedMat])

  return (
    <form
      onSubmit={handleSubmit(async (manma_data) => {
        const respMat = respMat === undefined ? {} : await propsCall(watchedMat)
      })}
      className=" shadow sm:rounded-md bg-gray-100 "
    >
      {/*

    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl mx-4 pt-4">
        Materials Management 
    </h2>

    <div class="flex items-baseline mt-2 mb-2 pb-1 border-slate-200"></div>

    <fieldset className="grid grid-cols-4 gap-4 p-4 ">
      <div className="col-span-1">
      </div>
        <div className="col-span-1">
          <input className="col-span-1" type="radio" id="newmat" name="ini_choice" value="new"{...register('ini_choice')}/>
            <label className="col-span-2">{' '} Add </label><label className="hidden sm:inline">a new material</label><br/>
        </div>
        <div className="col-span-1">
          <input className="col-span-1" type="radio" id="del_mod" name="ini_choice" value="mod"{...register('ini_choice')}/>
          <label className="col-span-2">{' '} Mod</label><label className="hidden sm:inline">ify / Delete a material</label><br/>
        </div>
        <div className="col-span-1">
        </div>
    </fieldset>

*/}

      {console.log(watchedMat)}
      <div className="flex items-baseline mt-2 mb-2 pb-1 border-slate-200"></div>

      <h2 class="text-xl font-extrabold tracking-tight text-gray-900 mx-4 pt-3">
        Modify or Delete a Material
      </h2>
      <div className="flex items-baseline mt-2 mb-2 pb-1 border-slate-200"></div>
      <div className=" flex flex-row gap-2 flex items-center ">
        <div className="basis-1/2 md:basis-1/5">
          <label className="block text-sm font-medium text-gray-700 ml-8 ">
            Select a Material
          </label>
        </div>

        <div className="basis-1/2 md:basis-1/3 -mx-8">
          <select
            {...register('selectedMat')}
            type="text"
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          >
            {!data ? (
              <option value="-1">Loading</option>
            ) : (
              <>
                <option value="" selected>
                  {' '}
                  Select one{' '}
                </option>
                {data.map((elem) => (
                  <option value={elem.id}>{elem.name}</option>
                ))}
              </>
            )}
          </select>
        </div>
      </div>

      <div className="flex items-baseline mt-2 mb-2 pb-1 border-slate-200"></div>

      <label className="block text-l font-medium text-gray-700 mx-4 ">
        Material properties
      </label>

      <div>
        {Object.keys(fetchedMaterial?.properties || {}).map((elem) => {
          const prop = fetchedMaterial.properties[elem]
          if (typeof prop !== 'undefined') {
            return <input value={prop.value} />
          }
        })}
      </div>

      <div className="col-span-1">
        <label className="block text-sm font-medium text-gray-700">
          anotherfield
        </label>
        <input
          {...register('anotherfield')}
          type="text"
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </div>

      <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 mt-2">
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          a submit button
        </button>
      </div>
    </form>
  )
}

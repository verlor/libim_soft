import * as React from "react";
import '../../styles/global.css'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'



export default function ManageMatsForm() {

  const dispatch = useDispatch()
  const { register, formState: { errors }, getValues, handleSubmit, watch } = useForm({
    defaultValues: {
      afield: '',
      anotherfield: '',
    },
  })

    return (
    <form
      onSubmit={handleSubmit(async (form_data) => {

        })}
      className="shadow sm:rounded-md bg-gray-100"
    >
      <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl mx-4 pt-4">
        A generic form 
      </h2>

      <div class="flex items-baseline mt-2 mb-2 pb-1 border-slate-200"></div>
      
      <div className="grid grid-cols-2 gap-4 px-3">
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            afield
          </label>
          <input
            {...register('afield')}
            type="text"
            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
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
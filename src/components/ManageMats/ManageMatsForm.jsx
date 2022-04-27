import React, { useReducer, useState, useEffect } from 'react'
import '../../styles/global.css'
import { useForm, useFieldArray, Controller } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import useSWR from 'swr'
import { getMaterialsFetcher, propsCall } from '../../api'
import NewElectrolyteForm from '../ManageMats/NewElectrolyte'
import NewAnodeForm from '../ManageMats/NewAnode'
// import NewCathodeForm from '../ManageMats/NewCathode'

export default function NewMatForm() {
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

      newName: '',
      selectedType: '',
    },
  })

  const { data, _ } = useSWR(
    '?filter=%7B%22order%22%3A%20%22type%22%2C%0A%20%22order%22%3A%20%22name%22%2C%0A%20%20%22fields%22%3A%20%7B%0A%20%20%20%20%22name%22%3A%20true%2C%0A%20%20%20%20%22type%22%3A%20true%2C%0A%20%20%20%20%22c_rates%22%3A%20true%2C%0A%20%20%20%20%22id%22%3A%20true%0A%20%20%7D%0A%7D',
    getMaterialsFetcher
  )

  const nameIsNew = (e) => {
    let flip = true
    data?.map((elem) => {
      if (elem.name.toUpperCase() === e?.toUpperCase()) {
        flip = false
      }
    })
    return flip
  }

  function selectNewMat(name, type) {
    switch (type) {
      case 'anode':
        NewAnodeForm(name, type)
        break
      case 'cathode':
        NewCathodeForm(name, type)
        break
      case 'electrolyte':
        NewElectrolyteForm(name, type)
        break
      default:
    }
  }

  const renderForm = (type) => {
    switch (type) {
      case 'anode':
        return (
          <NewAnodeForm name={watch('newname')} type={watch('selectedType')} />
        )
      case 'electrolyte':
        return <NewElectrolyteForm name={watch('newname')} type={watch('selectedType')} />
      default:
        return <></>
    }
  }
 
  console.log('errors: ',errors)
  return (
    <>
      <form
        onSubmit={handleSubmit((props) => {console.log(props)
  
        })}
      >
        <div className="flex items-baseline mt-2 mb-2 pb-1 border-slate-200"></div>

        <h2 class="text-xl font-extrabold tracking-tight text-gray-900 mx-4 pt-3">
          New Material
        </h2>
        <div className="flex items-baseline mt-2 mb-2 pb-1 border-slate-200"></div>
        <div className="grid grid-cols-2 gap-4 px-3">
          <div className="col-span-1">
           <label className="block text-sm font-medium text-gray-700">
              Material name
            </label>
            <input
              {...register('newName', {
                required: {value:true, message:<span className="italic text-xs font-medium text-red-400">
                A name is required
              </span>},
                minLength:{
                  value:4,
                message:'min 4 char'}              
              })}
              type="text"
              name="newName"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              style={{ border: errors.newName ? '1px solid red' : '' }} 
            />

            {/*errors.newName && errors.newName.type === 'required' && (
              <span className="italic text-xs font-medium text-red-400">
                A name is required
              </span>
            )*/}
            {/*errors.newName && errors.newName.type === 'validate' && (
              <span className="italic text-xs font-medium text-red-400">
                Material name already exists
              </span>
            )*/}
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700">
              Material type
            </label>
            <select
              {...register('selecedType', { required: true })}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <>
                <option value="anode">Anode</option>
                <option value="cathode">Cathode</option>
                <option value="electrolyte">Electrolyte</option>
              </>
            </select>
            {errors.selecedType && errors.selecedType.type === 'required' && (
              <span className="italic text-xs font-medium text-red-400">
                A selection is required
              </span>
            )}
          </div>
        </div>


       



      </form>

      {/* (usedName(watch('name'))===true) ? console.log("elem: ", elem.name, elem.type) : console.log(usedName(watch('name'))) */}

      {renderForm(watch('selecedType'))}
    </>
  )
}

import React, { useReducer, useState, useEffect } from 'react'
import '../../styles/global.css'
import { useForm, useFieldArray } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import useSWR from 'swr'
import { getMaterialsFetcher, propsCall } from '../../api'
import ModAnodeForm from "./ModAnode"
import ModCathodeForm from "./ModCathode"
import ModElectrolyteForm from "./ModElectrolyte"

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
      selectedMat: '-1',
      anotherfield: '',
      ini_choice: '',
      name: '',
      type: '',
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
    //console.log('uu',{ myMaterial })
  }, [watchedMat])

console.log ('fetchedMaterial.name',fetchedMaterial.name)
  const renderForm = (e) => {
    switch (e.type) {
      case 'anode':
        return <ModAnodeForm matToMod={fetchedMaterial}/>
      case 'cathode':
        return <ModCathodeForm matToMod={fetchedMaterial}/>
      case 'electrolyte':
        return <ModElectrolyteForm matToMod={fetchedMaterial}/>
      case 'reset':
        return ''
      default:
        return <></>
    }}


  

  return (

<>
      <div className="flex items-baseline mt-2 mb-2 pb-1 border-slate-200"></div>

      <h2 className="text-xl font-extrabold tracking-tight text-gray-900 mx-4 pt-3">
        Choose a material 
      </h2>
      <div className="flex items-baseline mt-2 mb-2 pb-1 border-slate-200"></div>


      <div className="grid grid-cols-5 gap-4 px-3">
        <div className="col-span-3 l:col-span-1">
          <select
            {...register('selectedMat', { required: true,
            validate: { notDefault: (v) => parseFloat(v) !== -1}, 
            })}
            name="selectedMat"
            style={{
              border: errors.selectedMat
                ? '2px solid red'
                : '',
            }}            
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
             <>
              <option value="-1" >Select a material</option>
              {data?.map((elem) => (
                  <option value={elem.id}>{elem.name}</option> 
                ))}
             
              </>
          </select>
          {errors.selectedMat && errors.selectedMat.type === 'required' && <span className="italic text-xs font-medium text-red-400">A selection is required</span>}
          {errors.selectedMat && errors.selectedMat.type === 'notDefault' && <span className="italic text-xs font-medium text-red-400">A selection is required</span>}
        </div>

        <div className="col-span-2">

        <label
            type="text"
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
              <span className="text-gray-500 hidden sm:inline">Type: </span>
             <span className="text-l font-extrabold tracking-tight text-gray-500 mx-4 pt-3">{fetchedMaterial.type}</span>
          </label>
        
        </div>

        </div>

       <div className="flex items-baseline mt-2 mb-2 pb-1 border-slate-200"></div>

<h2 className="text-xl font-extrabold tracking-tight text-gray-900 mx-4 pt-3">
Modify material properties
</h2>
<div className="flex items-baseline mt-2 mb-2 pb-1 border-slate-200"></div>

     
<div className="flex items-baseline mt-2 mb-2 pb-1 border-slate-200"></div>

{console.log('fetchedMaterial',fetchedMaterial)}
{renderForm(fetchedMaterial)}

      <div className=" flex items:center gap-4 ">
      <label className="text-s font-extrabold tracking-tight text-gray-700 mx-4 pt-4 py-4"> Delete material from data base </label>
<button type="button" onClick={()=>{"llamada api borrar id"}} >
<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="red">
  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
</svg>
</button>




</div>

</>
  )
}

import React,{useState} from 'react'
import NewAnodeForm from "./NewAnode"
import NewCathodeForm from "./NewCathode"
import NewElectrolyteForm from "./NewElectrolyte"

export default function NewMat() {

const [choosedType,setChoosedType]= useState("")  


  const renderForm = (e) => {
    switch (e) {
      case 'anode':
        return <NewAnodeForm />
      case 'cathode':
        return <NewCathodeForm />
      case 'electrolyte':
        return <NewElectrolyteForm />
      case 'reset':
        return ''
      default:
        return <></>
    }
  }


  return (
    <>
      <div className="flex items-baseline mt-2 mb-2 pb-1 border-slate-200"></div>

      <h2 class="text-xl font-extrabold tracking-tight text-gray-900 mx-4 pt-3">
        New Material
      </h2>

      
        
        <div className="px-4 py-3 bg-gray-50 sm:px-6 mt-2 ">
        <div className=" flex items:stretch gap-4 ">
          <label className="py-2 px-4 shadow-sm text-sm font-medium rounded-md text-gray-900 hidden md:block">Choose the material type: </label>
            <button
            className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={()=>setChoosedType("anode")}

            >
              Anode
            </button>
            <button
            className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={()=>setChoosedType("cathode")}
            >
              Cathode
            </button>
            <button
            className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={()=>setChoosedType("electrolyte")}
            >
              Electrolyte
            </button>
          </div>
      </div>

      <div className="flex items-baseline mt-2 mb-2 pb-1 border-slate-200"></div>


      {renderForm(choosedType)}


    </>
  )
}

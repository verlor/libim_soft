import React,{useState} from 'react'
import NewAnodeForm from "./NewAnode"
import NewCathodeForm from "./NewCathode"
import NewElectrolyteForm from "./NewElectrolyte"

export default function NewMat({setChoosedAction}) {

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
      
        
        <div className="px-4 py-3 sm:px-6 mt-2 ">
        <div className=" flex items:stretch gap-4 ">
           <label className="py-2 px-4 shadow-sm text-sm font-medium rounded-md text-gray-900 hidden md:block">New material type: </label>
            <button
            id="anode"
            className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-300"
            onClick={()=>{setChoosedType("anode")
            document.getElementById("cathode").disabled=true
            document.getElementById("electrolyte").disabled=true
          }}

            >
              Anode
            </button>
            <button
            id="cathode"
            className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-300"
            onClick={()=>{setChoosedType("cathode")
            document.getElementById("anode").disabled=true
            document.getElementById("electrolyte").disabled=true
          }}
            >
              Cathode
            </button>
            <button
            id="electrolyte"
            className="py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-300"
            onClick={()=>{setChoosedType("electrolyte")
            document.getElementById("anode").disabled=true
            document.getElementById("cathode").disabled=true
          }}
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


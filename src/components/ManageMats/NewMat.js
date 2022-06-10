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
            <button
            id="reset"
            onClick={()=>setChoosedAction("reset")}
            >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-10" viewBox="0 0 20 20" fill="red">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clip-rule="evenodd" />
</svg>
            </button>
          </div>
      </div>

      <div className="flex items-baseline mt-2 mb-2 pb-1 border-slate-200"></div>


      {renderForm(choosedType)}


    </>
  )
}


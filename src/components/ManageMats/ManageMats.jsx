import React, { useState } from 'react'
import '../../styles/global.css'
import NewMat from './NewMat'
import ModMat from './ModMat'


export default function ManageMats() {
  const [choosedAction, setChoosedAction] = useState('')

  const renderPath = (e) => {
    switch (e) {
      case 'add':
        return <NewMat key="NewMat" setChoosedAction={setChoosedAction}/>
      case 'modify':
        return <ModMat key="ModMat" setChoosedAction={setChoosedAction}/>
      case 'reset':
        document.getElementById('mod').disabled = false
        document.getElementById('add').disabled = false
        return ''
      default:
        return <></>
    }
  }

  return (
    <>
      <div className="flex items-baseline mt-2 mb-2 pb-1 border-slate-200"></div>

      <div className="px-4 py-3 sm:px-6 mt-2 ">
        <div className=" flex items:center gap-2 ">
          <h2 className="text-xl font-extrabold tracking-tight text-gray-900 mx-4 pt-2">
            Action:
          </h2>
          <button
            id="add"
            className="py-1 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-300"
            onClick={() => {
              setChoosedAction('add')
              document.getElementById('mod').disabled = true
            }}
          >
            To add
          </button>
          <button
            id="mod"
            className="py-1 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-300"
            onClick={() => {
              setChoosedAction('modify')
              document.getElementById('add').disabled = true
            }}
          >
            To modify <span className="hidden sm:inline"> or delete</span>
          </button>

        <button
            id="res"
            className="float-right py-1 px-1 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-red-500 focus:outline-none disabled:bg-gray-300"
            onClick={() => {
              setChoosedAction('reset')
            }}
          >
            <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 sm:mx-2 mx-4 inline "
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
          </button>

        </div>

      </div>

      <div className="flex items-baseline mt-2 mb-2 pb-1 border-slate-200"></div>

      {renderPath(choosedAction)}

    </>
  )
}

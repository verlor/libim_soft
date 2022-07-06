import React, { useState } from 'react'
import '../../styles/global.css'
import NewMat from './NewMat'
import ModMat from './ModMat'


export default function ManageMats() {
  const [choosedAction, setChoosedAction] = useState('')

  const renderPath = (e) => {
    switch (e) {
      case 'add':
        return <NewMat setChoosedAction={setChoosedAction}/>
      case 'modify':
        return <ModMat setChoosedAction={setChoosedAction}/>
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
        <div className=" flex items:center gap-4 ">
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
            To modify or delete
          </button>
        </div>
      </div>

      <div className="flex items-baseline mt-2 mb-2 pb-1 border-slate-200"></div>

      {renderPath(choosedAction)}

    </>
  )
}

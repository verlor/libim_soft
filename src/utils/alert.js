import React from 'react'

export default function NewMaterialAlert({mName, mType}) {
  return (
    <>
     <div
      class="flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3 sm:rounded-md"
      role="alert"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
          clip-rule="evenodd"
        />
      </svg>
      <div>
        <p class="text-xs px-2">New material added to database:</p>
        <p class="font-bold px-2">
          Name: {mName}, Type: {mType}
        </p>
      </div>
    </div>
    
     <div className="flex items-baseline pb-1 border-slate-200"></div>
    </>
    
  )
}

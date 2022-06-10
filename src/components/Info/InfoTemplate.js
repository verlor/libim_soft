import React from 'react'

export const infoTemplate=([title,pic=null,blah]) =>{
  if (pic === null){
    return (
      <main className="py-6 px-4 sm:p-6 md:py-10 md:px-8">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:max-w-5xl lg:gap-x-20 lg:grid-cols-2">
          <div className="relative p-3 col-start-1 row-start-1 flex flex-col-reverse sm:bg-none sm:row-start-1 sm:p-0 lg:row-start-1">
            <h1 className="mt-1 text-lg font-semibold sm:text-slate-900 md:text-2xl ">{title}</h1>
          </div>
           <div className="mt-4 col-start-1 row-start-3 self-center sm:mt-0 sm:col-start-2 sm:row-start-2 sm:row-span-2 lg:mt-6 lg:col-start-1 lg:row-start-3 lg:row-end-4">
          </div>
          <p className="mt-4 text-sm text-justify leading-6 col-start-1 sm:col-span-2 lg:mt-6 lg:row-start-4 lg:col-span-1 dark:text-slate-400">
            {blah}
          </p>
        </div>
        <div className="flex items-baseline mt-2 mb-2 pb-1 border-slate-200"></div>
      </main>
      )
  }
  
  if (pic !== null){
return (
<main className="py-6 px-4 sm:p-6 md:py-10 md:px-8">
  <div className="max-w-4xl mx-auto grid grid-cols-1 lg:max-w-5xl lg:gap-x-20 lg:grid-cols-2">
    <div className="relative p-3 col-start-1 row-start-1 flex flex-col-reverse rounded-lg bg-gradient-to-t from-black/75 via-black/0 sm:bg-none sm:row-start-1 sm:p-0 lg:row-start-1">
      <h1 className="mt-1 text-lg font-semibold text-white sm:text-slate-900 md:text-2xl dark:sm:text-white">{title}</h1>
    </div>
    <div className="grid gap-4 col-start-1 col-end-3 row-start-1 sm:mb-6 sm:grid-cols-4 lg:gap-6 lg:col-start-2 lg:row-end-6 lg:row-span-6 lg:mb-0">
      <img id="info_image" src={pic} alt="" className="max-w-full h-auto object-cover rounded-lg sm:h-auto sm:col-span-2 lg:col-span-full" loading="lazy"/>
     
    </div>
    <div className="mt-4 col-start-1 row-start-3 self-center sm:mt-0 sm:col-start-2 sm:row-start-2 sm:row-span-2 lg:mt-6 lg:col-start-1 lg:row-start-3 lg:row-end-4">
    </div>
    <p className="mt-4 text-sm text-justify leading-6 col-start-1 sm:col-span-2 lg:mt-6 lg:row-start-4 lg:col-span-1 dark:text-slate-400">
      {blah}
    </p>
  </div>
  <div className="flex items-baseline mt-2 mb-2 pb-1 border-slate-200"></div>
</main>
)}
}
import React, { useState } from 'react'
import '../../styles/global.css'
import { infoTemplate } from './InfoTemplate'
import {
  ABOUT_TIT,
  ABOUT_DEF,
  BU_TIT,
  BU_DEF,
  CTD_TIT,
  CTD_DEF,
  VOL_TIT,
  VOL_DEF,
} from './defs'
import BU_1_2 from '../../images/BU_1_2.svg'
import Flag_SP from '../../images/Flag_SP.svg'
import Flag_UK from '../../images/Flag_UK.svg'

//const flagStyle = { color: 'blue' }

export default function infoDefs() {
  const [flag, setFlag] = useState('eng')

  let title_1 = ABOUT_TIT[flag]
  let text_1 = ABOUT_DEF[flag]

  let title_2 = BU_TIT[flag]
  let text_2 = BU_DEF[flag]

  let title_3 = CTD_TIT[flag]
  let text_3 = CTD_DEF[flag]

  let title_4 = VOL_TIT[flag]
  let text_4 = VOL_DEF[flag]

  return (
    <>
      <div className="inline-flex float-right justify-center py-2 px-4 gap-3 ">
        <label className="text-xs font-light text-grey-900">Language:</label>
        <label
          onClick={() => {
            setFlag('eng')
          }}
        >
          <input
            type="radio"
            name="test"
            value="eng"
            checked
            className="hidden"
          />
          <img
            src={Flag_UK}
            className="flex-shrink-0 h-4 w-5 rounded opacity-75"
          />
        </label>

        <label
          onClick={() => {
            setFlag('spa')
          }}
        >
          <input type="radio" name="test" value="spa" className="hidden" />
          <img
            src={Flag_SP}
            className="flex-shrink-0 h-4 w-5 rounded opacity-75"
          />
        </label>
      </div>

      <div className="flex items-baseline mt-2 mb-2 pb-1 border-slate-200"></div>

      {infoTemplate([title_1, , text_1])}
      {infoTemplate([title_2, BU_1_2, text_2])}
      {infoTemplate([title_3, , text_3])}
      {infoTemplate([title_4, , text_4])}
    </>
  )
}

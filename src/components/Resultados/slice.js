import { createSlice } from '@reduxjs/toolkit'

export const resultadosReducer = createSlice({
  name: 'resultados',
  initialState: {
    suma: {},
    isComplete: false,
    // results: {
    //   calc_high_curr,
    //   calc_low_curr
    // },
  },
  reducers: {
    setSuma: (state, action) => {
      state.suma = action.payload
    },
    // setResults: (state, action) => {
    //   state.results = action.payload
    // },
  },
})

export const { setSuma } = resultadosReducer.actions

export default resultadosReducer.reducer

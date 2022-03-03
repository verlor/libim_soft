import { createSlice } from '@reduxjs/toolkit'

export const resultadosReducer = createSlice({
  name: 'resultados',
  initialState: {
    suma: {},
    results: {},
  },
  reducers: {
    setSuma: (state, action) => {
      state.suma = action.payload
    },
    setResults: (state, action) => {
      state.results = action.payload
    },
  },
})

export const { setSuma } = resultadosReducer.actions
export const { setResults } = resultadosReducer.actions

export default resultadosReducer.reducer

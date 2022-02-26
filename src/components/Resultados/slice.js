import { createSlice } from '@reduxjs/toolkit'

export const resultadosReducer = createSlice({
  name: 'resultados',
  initialState: {
    suma: 0,
  },
  reducers: {
    setSuma: (state, action) => {
      state.suma = action.payload
    },
  },
})

export const { setSuma } = resultadosReducer.actions

export default resultadosReducer.reducer

import { createSlice } from '@reduxjs/toolkit'

export const resultsReducer = createSlice({
  name: 'results',
  initialState: {
    sum: {},
    isComplete: false,
    // results: {
    //   calc_high_curr,
    //   calc_low_curr
    // },
  },
  reducers: {
    setSum: (state, action) => {
      state.sum = action.payload
    },
    setIsComplete:(state,action) => {
      state.isComplete = action.payload
    },
    // setResults: (state, action) => {
    //   state.results = action.payload
    // },
  },
})

export const { setSum } = resultsReducer.actions
export const { setIsComplete } = resultsReducer.actions

export default resultsReducer.reducer

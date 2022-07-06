import { createSlice } from '@reduxjs/toolkit'

export const matsReducer = createSlice({
  name: 'materials',
  initialState: {
    isCreated: {
    matCreated: false,
    matType: '',
    matName: '',
    }  
  },
  reducers: {
    setIsCreated:(state,action) => {
      state.isCreated = {...action.payload}
    },
  },
})

export const { setIsCreated } = matsReducer.actions

export default matsReducer.reducer

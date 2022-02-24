import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../components/testSlice'

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
})

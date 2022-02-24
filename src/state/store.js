import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../components/testSlice'
import parameterFormularSlice from '../components/ParameterFormular/slice'

export default configureStore({
  reducer: {
    counter: counterReducer,
    parameter: parameterFormularSlice,
  },
})

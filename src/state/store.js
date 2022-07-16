import { configureStore } from '@reduxjs/toolkit'
import parameterFormularSlice from '../components/ParameterFormular/slice'
import resultadosReducer from '../components/Results/slice'
import matsReducer from '../components/ManageMats/slice'

export default configureStore({
  reducer: {
    parameter: parameterFormularSlice,
    results: resultadosReducer,
    materials: matsReducer,
  },
})

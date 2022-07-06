import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../components/testSlice'
import parameterFormularSlice from '../components/ParameterFormular/slice'
import resultadosReducer from '../components/Resultados/slice'
import matsReducer from '../components/ManageMats/slice'

export default configureStore({
  reducer: {
    counter: counterReducer,
    parameter: parameterFormularSlice,
    resultados: resultadosReducer,
    materials: matsReducer,
  },
})

import { createSlice } from '@reduxjs/toolkit'

export const parameterFormularSlice = createSlice({
  name: 'parameter',
  initialState: {
    general: {},
    cathode_material_id: '',
    anode_material_id: '',
    electrolyte_id: '',
    area: 0,
    n_base_units: 0,
    cathode_load: 0,
    coating_thickness: 0,
    cathode_add: 0,
    anode_add: 0,
    separator_thickness: 0,
    curr_collect_thickness_cu: 0,
    curr_collect_thickness_al: 0,
    slow_charge_rate_id: 0,
    fast_charge_rate_id: 0,
    n_series: 0,
    n_parallel: 0,
    initialConditionsFormular: {
      cathode_material_id: '-1',
      anode_material_id: '-1',
      electrolyte_id: '-1',
      area: 50,
      n_base_units: 20,
      cathode_load: 5,
      coating_thickness: 50,
      cathode_add: 5,
      anode_add: 5,
      separator_thickness: 25,
      curr_collect_thickness_cu: 9,
      curr_collect_thickness_al: 15,
      slow_charge_rate_id: '-1',
      fast_charge_rate_id: '-1',
      n_series: 3,
      n_parallel: 3,
    },
  },
  reducers: {
    handleFormSubmit: (state, action) => {
      state = { ...action.payload }
    },
    updateFormState: (state, action) => {
      state.initialConditionsFormular = { ...action.payload }
    },
  },
})

export const { handleFormSubmit, updateFormState } =
  parameterFormularSlice.actions

export default parameterFormularSlice.reducer

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
  },
  reducers: {
    handleFormSubmit: (state, action) => {
      state = { ...action.payload }
    },
  },
})

export const { handleFormSubmit } = parameterFormularSlice.actions

export default parameterFormularSlice.reducer

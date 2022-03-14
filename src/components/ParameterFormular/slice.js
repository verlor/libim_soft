import { createSlice } from '@reduxjs/toolkit'

export const parameterFormularSlice = createSlice({
  name: 'parameter',
  initialState: {
    general: {},
    cathode_material_id: 'NMC',
    anode_material_id: 'LTO',
    electrolyte_id: 'LPF6 + EC',
    area: 50,
    n_base_units: 20,
    cathode_load: 5,
    coating_thickness: 50,
    cathode_add: 5,
    anode_add: 5,
    separator_thickness: 25,
    curr_collect_thickness_cu: 9,
    curr_collect_thickness_al: 15,
    slow_charge_rate_id: 0.1,
    fast_charge_rate_id: 5,
    n_series: 3,
    n_parallel: 3,
    //charge_tickness: 0,
  },
  reducers: {
    handleFormSubmit: (state, action) => {
      state = { ...action.payload }
    },
  },
})

// Action creators are generated for each case reducer function
//export const { setNumElectrodes, handleFormSubmit, setChargeThickness } =
//  parameterFormularSlice.actions

export const { handleFormSubmit } = parameterFormularSlice.actions

export default parameterFormularSlice.reducer

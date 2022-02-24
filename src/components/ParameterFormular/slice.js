import { createSlice } from '@reduxjs/toolkit'

export const parameterFormularSlice = createSlice({
  name: 'parameter',
  initialState: {
    general: {},
    cathode_material_id: 'NMC',
    anode_material_id: 'LTO',
    electrolyte_id: 'LPF6 + EC',
    c_slow_id: '0.1C',
    c_fast_id: '5C',
    area: 50,
    coated: 2,
    num_electrodes: 20,
    cat_load: 10,
    additive_pos: 10,
    additive_neg: 10,
    sep_thickness: 10,
    cc_cu_thickness: 10,
    cc_al_thickness: 10,
    min_crate: 10,
    max_crate: 10,
    serie: 3,
    parallel: 3,
  },
  reducers: {
    setNumElectrodes: (state, action) => {
      state.num_electrodes = action.payload
    },
    handleFormSubmit: (state, action) => {
      state = { ...action.payload }
    },
  },
})

// Action creators are generated for each case reducer function
export const { setNumElectrodes, handleFormSubmit } =
  parameterFormularSlice.actions

export default parameterFormularSlice.reducer

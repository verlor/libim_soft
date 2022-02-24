import { setChargeThickness } from '../ParameterFormular/slice'

export const calculo1 = (cathode_load, dispatch) => {
  const charge_thickness_dependency_cda = 50 * cathode_load
  dispatch(setChargeThickness(charge_thickness_dependency_cda))
}

export const calculo2 = (data, dispatch) => {
  const {
    cathode_material_id,
    anode_material_id,
    electrolyte_id,
    c_slow_id,
    c_fast_id,
    area,
    coated,
    num_electrodes,
    cat_load,
    additive_pos,
    additive_neg,
    sep_thickness,
    cc_cu_thickness,
    cc_al_thickness,
    min_crate,
    max_crate,
    serie,
    parallel,
  } = { ...data }
  const color = area + 91
}

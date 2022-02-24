//import { setChargeThickness } from '../ParameterFormular/slice'

/*export const calculo1 = (cathode_load, dispatch) => {
  const charge_thickness_dependency_cda = 50 * cathode_load
  dispatch(setChargeThickness(charge_thickness_dependency_cda))
}
*/

export const form_feed = (data, dispatch) => {
  const {
    cathode_material_id,
    anode_material_id,
    electrolyte_id,
    area,
    n_coat,
    n_base_units,
    cathode_load,
    cathode_add,
    anode_add,
    separator_thickness,
    curr_collect_thickness_cu,
    curr_collect_thickness_al,
    slow_charge_rate_id,
    fast_charge_rate_id,
    n_series,
    n_parallel,
  } = { ...data }
  //const color = area + 91
}

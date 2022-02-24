import { setChargeThickness } from '../ParameterFormular/slice'

export const calculo1 = (cathode_load, dispatch) => {
  const charge_thickness_dependency_cda = 50 * cathode_load
  dispatch(setChargeThickness(charge_thickness_dependency_cda))
}

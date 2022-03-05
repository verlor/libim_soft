//import { form_feed } from './test'
import { setSuma } from '../Resultados/slice'
import * as fixed from '../../utils/constants'

//calculos preliminares

function calculitos(data, before_calc, c_rate) {
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

  const {
    charge_thickness_dependency_cda,
    cathode_mass,
    cathode_additives,
    cathode_mass_st,
    cathode_collector_mat,
    cathode_total_mass,
    anode_mass,
    anode_additives,
    anode_mass_st,
    anode_collector_mat,
    anode_total_mass,
    electrodes_total_mass,
    separator_mass,
    electrolite_cathode_mass,
    electrolite_anode_mass,
    electrolite_separator_mass,
    electrolite_total_mass,
    base_unit_total_mass,
    cell_electrodes_mass,
    cell_electrolite_in_electrodes_mass,
    cell_separator_and_electrolite_mass,
    cell_total_mass,
    module_total_mass,
  } = { ...before_calc }

  const { cathode_capacity, charge_voltage, discharge_voltage } = { ...c_rate }

  //const suma = suma1 + param1 + param2 + param3 / cathode_material_id

  //Results calculations
  const base_unit_charge_energy =
    c_rate.cathode_capacity *
    c_rate.charge_voltage *
    before_calc.cathode_mass *
    0.001
  const base_unit_charge_power = c_rate.charge_voltage * fixed.PR_current_min
  const base_unit_charge_capacity =
    before_calc.cathode_mass * c_rate.cathode_capacity
  const base_unit_charge_energy_density =
    (base_unit_charge_energy / before_calc.base_unit_total_mass) * 1000
  const base_unit_charge_power_density =
    (base_unit_charge_power / before_calc.base_unit_total_mass) * 1000
  const base_unit_discharge_energy =
    c_rate.cathode_capacity *
    c_rate.discharge_voltage *
    before_calc.cathode_mass *
    0.001
  const base_unit_discharge_power =
    c_rate.discharge_voltage * fixed.PR_current_min
  const base_unit_discharge_capacity = base_unit_charge_capacity
  const base_unit_efficiency_energy =
    base_unit_discharge_energy / base_unit_charge_energy
  const base_unit_efficiency_power =
    base_unit_discharge_power / base_unit_charge_power
  const base_unit_efficiency_capacity =
    base_unit_discharge_capacity / base_unit_charge_capacity
  const base_unit_discharge_energy_density =
    (before_calc.base_unit_total_mass / base_unit_discharge_energy) * 1000
  const base_unit_discharge_power_density =
    (before_calc.base_unit_total_mass / base_unit_discharge_power) * 1000
  //Cell slow rate calculations
  const cell_current = base_unit_charge_capacity * data.n_base_units
  const cell_volume = 4 //data.area * data.n_base_units * (1 / data.n_base_units) * 0.001
  const cell_charge_energy = base_unit_charge_energy * data.n_base_units
  const cell_charge_power = c_rate.charge_voltage * cell_current
  const cell_charge_capacity = base_unit_charge_capacity * data.n_base_units
  const cell_charge_energy_density =
    (cell_charge_energy / before_calc.cell_total_mass) * 1000
  const cell_charge_power_density =
    (cell_charge_power / before_calc.cell_total_mass) * 1000
  const cell_discharge_energy = base_unit_discharge_energy * data.n_base_units
  const cell_discharge_power = c_rate.discharge_voltage * cell_current
  const cell_discharge_capacity = cell_charge_capacity
  const cell_discharge_energy_density =
    (cell_discharge_energy / before_calc.cell_total_mass) * 1000
  const cell_discharge_power_density =
    (cell_discharge_power / before_calc.cell_total_mass) * 1000

  //Module slow rate calculations
  const module_charge_voltage = c_rate.charge_voltage * data.n_series
  const module_charge_capacity = cell_charge_capacity * data.n_parallel
  const module_charge_energy = module_charge_voltage * module_charge_capacity
  const module_charge_power = module_charge_energy * data.slow_charge_rate_id
  const module_charge_energy_density =
    module_charge_energy / before_calc.module_total_mass
  const module_charge_power_density =
    module_charge_power / before_calc.module_total_mass
  const module_discharge_voltage = c_rate.discharge_voltage * data.n_series
  const module_discharge_capacity = cell_discharge_capacity * data.n_parallel
  const module_discharge_energy =
    module_discharge_voltage * module_discharge_capacity
  const module_discharge_power =
    module_discharge_energy * data.slow_charge_rate_id
  const module_discharge_energy_density =
    module_discharge_energy / before_calc.module_total_mass
  const module_discharge_power_density =
    module_discharge_power / before_calc.module_total_mass
  const module_volume = 4 //ver formula

  return {
    base_unit_charge_energy,
    base_unit_charge_power,
    base_unit_charge_capacity,
    base_unit_charge_energy_density,
    base_unit_charge_power_density,
    base_unit_discharge_energy,
    base_unit_discharge_power,
    base_unit_discharge_capacity,
    base_unit_efficiency_energy,
    base_unit_efficiency_power,
    base_unit_efficiency_capacity,
    base_unit_discharge_energy_density,
    base_unit_discharge_power_density,
    cell_current,
    cell_volume,
    cell_charge_energy,
    cell_charge_power,
    cell_charge_capacity,
    cell_charge_energy_density,
    cell_charge_power_density,
    cell_discharge_energy,
    cell_discharge_power,
    cell_discharge_capacity,
    cell_discharge_energy_density,
    cell_discharge_power_density,
    module_charge_voltage,
    module_charge_capacity,
    module_charge_energy,
    module_charge_power,
    module_charge_energy_density,
    module_charge_power_density,
    module_discharge_voltage,
    module_discharge_capacity,
    module_discharge_energy,
    module_discharge_power,
    module_discharge_energy_density,
    module_discharge_power_density,
    cell_volume,
  }
}

export function calcExam(data, dispatch) {
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

  const charge_thickness_dependency_cda = 50 * cathode_load
  const cathode_mass = area * cathode_load * n_coat * 0.001
  const cathode_additives = (cathode_mass * cathode_add) / (100 - cathode_add)
  const cathode_mass_st = cathode_mass + cathode_add
  const cathode_collector_mat =
    area * curr_collect_thickness_al * fixed.AL_DENSITY * 0.0001
  const cathode_total_mass = cathode_mass_st + cathode_collector_mat
  const anode_mass =
    (fixed.PR_s_rate_cathode_capacity / fixed.PR_s_rate_anode_capacity) *
    area *
    cathode_load *
    n_coat *
    0.001
  const anode_additives = (anode_mass * anode_add) / (100 - anode_add)
  const anode_mass_st = anode_mass + anode_additives
  const anode_collector_mat =
    area * curr_collect_thickness_cu * fixed.CU_DENSITY * 0.0001
  const anode_total_mass = anode_mass_st + anode_collector_mat
  const electrodes_total_mass = cathode_total_mass + anode_total_mass
  const separator_mass =
    area * separator_thickness * fixed.SEPARATOR_DENSITY * 0.0001
  //base_unit
  const electrolite_cathode_mass =
    area *
    charge_thickness_dependency_cda *
    fixed.CATHODE_POROSITY *
    n_coat *
    0.0001
  const electrolite_anode_mass =
    area *
    charge_thickness_dependency_cda *
    fixed.ANODE_POROSITY *
    n_coat *
    0.0001
  const electrolite_separator_mass =
    area *
    separator_thickness *
    fixed.ELECTROLITE_DENSITY *
    fixed.SEPARATOR_POROSITY *
    0.0001
  const electrolite_total_mass =
    electrolite_cathode_mass +
    electrolite_anode_mass +
    electrolite_separator_mass
  const base_unit_total_mass =
    electrodes_total_mass + separator_mass + electrolite_total_mass
  //cell
  const cell_electrodes_mass = electrodes_total_mass * n_base_units
  const cell_electrolite_in_electrodes_mass =
    (electrolite_cathode_mass + electrolite_anode_mass) * n_base_units
  const cell_separator_and_electrolite_mass =
    (separator_mass + electrolite_separator_mass) * (2 * n_base_units - 1) //ver formula
  const cell_total_mass =
    cell_electrodes_mass +
    cell_electrolite_in_electrodes_mass +
    cell_separator_and_electrolite_mass
  //module
  const module_total_mass = cell_total_mass * n_series * n_parallel * 0.001

  const before_calc = {
    charge_thickness_dependency_cda,
    cathode_mass,
    cathode_additives,
    cathode_mass_st,
    cathode_collector_mat,
    cathode_total_mass,
    anode_mass,
    anode_additives,
    anode_mass_st,
    anode_collector_mat,
    anode_total_mass,
    electrodes_total_mass,
    separator_mass,
    electrolite_cathode_mass,
    electrolite_anode_mass,
    electrolite_separator_mass,
    electrolite_total_mass,
    base_unit_total_mass,
    cell_electrodes_mass,
    cell_electrolite_in_electrodes_mass,
    cell_separator_and_electrolite_mass,
    cell_total_mass,
    module_total_mass,
  }
  console.log(before_calc)
  //dispatch(setSuma(before_calc))

  const slow_rate = calculitos(data, before_calc, {
    cathode_capacity: 175, //cathode_material_id AND slow_charge_rate_id AND cathode_capacity
    charge_voltage: 2.35, //(cathode_material_id AND slow_charge_rate_id AND cathode_charge_voltage)-(anode_material_id AND anode_voltage);
    discharge_voltage: 2.3, //(cathode_material_id AND slow_charge_rate_id AND cathode_discharge_voltage)-(anode_material_id AND anode_voltage);
  })
  const fast_rate = calculitos(data, before_calc, {
    cathode_capacity: 130, //cathode_material_id AND fast_charge_rate_id AND cathode_capacity;
    charge_voltage: 4, //(cathode_material_id AND fast_charge_rate_id AND cathode_charge_voltage) -(anode_material_id AND anode_voltage);
    discharge_voltage: 2.2, //(cathode_material_id AND fast_charge_rate_id AND cathode_discharge_voltage)-(anode_material_id AND anode_voltage)
  })

  //  current: { param1: 'low curr', param2: 5, param3: 9 },

  dispatch(
    setSuma({
      ...before_calc,
      slow: slow_rate,
      fast: fast_rate,
    })
  )
}

/*
export function bu_c_m(props, dispatch) {
  const c_s_rate = {
    cathode_capacity: fixed.PR_s_rate_cathode_capacity,
    charge_voltage: fixed.PR_s_rate_charge_voltage,
    discharge_voltage: fixed.PR_s_rate_discharge_voltage,
  }
  const c_f_rate = {
    cathode_capacity: fixed.PR_f_rate_cathode_capacity,
    charge_voltage: fixed.PR_f_rate_charge_voltage,
    discharge_voltage: fixed.PR_f_rate_discharge_voltage,
  }
  //Base unit slow rate calculations
  

  const results = {
    base_unit_charge_energy,
    base_unit_charge_power,
    base_unit_charge_capacity,
    base_unit_charge_energy_density,
    base_unit_charge_power_density,
    base_unit_discharge_energy,
    base_unit_discharge_power,
    base_unit_discharge_capacity,
    base_unit_efficiency_energy,
    base_unit_efficiency_power,
    base_unit_efficiency_capacity,
    base_unit_discharge_energy_density,
    base_unit_discharge_power_density,
    cell_current,
    cell_volume,
    cell_charge_energy,
    cell_charge_power,
    cell_charge_capacity,
    cell_charge_energy_density,
    cell_charge_power_density,
    cell_discharge_energy,
    cell_discharge_power,
    cell_discharge_capacity,
    cell_discharge_energy_density,
    cell_discharge_power_density,
    module_charge_voltage,
    module_charge_capacity,
    module_charge_energy,
    module_charge_power,
    module_charge_energy_density,
    module_charge_power_density,
    module_discharge_voltage,
    module_discharge_capacity,
    module_discharge_energy,
    module_discharge_power,
    module_discharge_energy_density,
    module_discharge_power_density,
  }
  console.log(results)
  dispatch(setResults(results))
}
*/

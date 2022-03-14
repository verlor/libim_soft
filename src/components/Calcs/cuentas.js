//import { form_feed } from './test'
import { setSuma } from '../Resultados/slice'
import * as fixed from '../../utils/constants'
import { current } from '@reduxjs/toolkit'

//calculos preliminares

function step_1(data, denom) {
  const {
    cathode_material_id,
    anode_material_id,
    electrolyte_id,
    area,
    n_base_units,
    cathode_load,
    coating_thickness,
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

  const charge_thickness_dependency_cda = cathode_load * data.coating_thickness //variable not exported
  //console.log(charge_thickness_dependency_cda)
  const cathode_mass =
    area * cathode_load * fixed.N_COAT * 0.001 * (n_base_units / denom)
  const cathode_additives = (cathode_mass * cathode_add) / (100 - cathode_add)
  const cathode_mass_st = cathode_mass + cathode_additives
  const cathode_collector_mat =
    area *
    curr_collect_thickness_al *
    fixed.AL_DENSITY *
    0.0001 *
    (n_base_units / denom)
  const cathode_total_mass = cathode_mass_st + cathode_collector_mat
  const anode_mass =
    (fixed.PR_s_rate_cathode_capacity / fixed.PR_s_rate_anode_capacity) *
    area *
    cathode_load *
    fixed.N_COAT *
    0.001 *
    (n_base_units / denom)
  const anode_additives = (anode_mass * anode_add) / (100 - anode_add)
  const anode_mass_st = anode_mass + anode_additives
  const anode_collector_mat =
    area *
    curr_collect_thickness_cu *
    0.0001 *
    fixed.CU_DENSITY *
    (1 + n_base_units / denom)
  const anode_total_mass = anode_mass_st + anode_collector_mat
  const electrodes_total_mass = cathode_total_mass + anode_total_mass
  const separator_mass =
    area *
    separator_thickness *
    0.0001 *
    fixed.SEPARATOR_DENSITY *
    ((2 * n_base_units) / denom)
  const electrolite_cathode_mass =
    area *
    charge_thickness_dependency_cda *
    fixed.CATHODE_POROSITY *
    fixed.N_COAT *
    0.0001 *
    (n_base_units / denom)
  const electrolite_anode_mass =
    area *
    charge_thickness_dependency_cda *
    fixed.ANODE_POROSITY *
    fixed.N_COAT *
    0.0001 *
    (n_base_units / denom)
  const electrolite_separator_mass =
    area *
    separator_thickness *
    fixed.ELECTROLITE_DENSITY *
    fixed.SEPARATOR_POROSITY *
    0.0001 *
    ((2 * n_base_units) / denom) // 2 separators per base unit
  const electrolite_total_mass =
    electrolite_cathode_mass +
    electrolite_anode_mass +
    electrolite_separator_mass
  const total_mass =
    electrodes_total_mass + separator_mass + electrolite_total_mass

  return {
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
    total_mass,
  }
}

function step_2(data, pre_base_unit, pre_cell, module_total_mass, c_rate) {
  const {
    cathode_material_id,
    anode_material_id,
    electrolyte_id,
    area,
    n_base_units,
    cathode_load,
    coating_thickness,
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

  const { cathode_capacity, charge_voltage, discharge_voltage } = { ...c_rate }

  //Calculando
  //Base unit
  const base_unit_charge_energy =
    c_rate.cathode_capacity *
    c_rate.charge_voltage *
    pre_base_unit.cathode_mass *
    0.001
  const base_unit_charge_power = c_rate.charge_voltage * c_rate.current
  const base_unit_charge_capacity =
    pre_base_unit.cathode_mass * c_rate.cathode_capacity * 0.001
  const base_unit_charge_energy_density =
    (base_unit_charge_energy / pre_base_unit.total_mass) * 1000
  const base_unit_charge_power_density =
    (base_unit_charge_power / pre_base_unit.total_mass) * 1000
  const base_unit_discharge_energy =
    c_rate.cathode_capacity *
    c_rate.discharge_voltage *
    pre_base_unit.cathode_mass *
    0.001
  const base_unit_discharge_power = c_rate.discharge_voltage * c_rate.current
  const base_unit_discharge_capacity = base_unit_charge_capacity
  const base_unit_efficiency_energy =
    base_unit_discharge_energy / base_unit_charge_energy
  const base_unit_efficiency_power =
    base_unit_discharge_power / base_unit_charge_power
  const base_unit_efficiency_capacity =
    base_unit_discharge_capacity / base_unit_charge_capacity
  const base_unit_discharge_energy_density =
    (base_unit_discharge_energy / pre_base_unit.total_mass) * 1000
  const base_unit_discharge_power_density =
    (base_unit_discharge_power / pre_base_unit.total_mass) * 1000
  const base_unit_volume =
    (data.curr_collect_thickness_al +
      data.curr_collect_thickness_cu * 2 +
      data.coating_thickness * 4 +
      data.separator_thickness * 2) *
    0.0001 *
    data.area // [cm3]

  //Cell
  const cell_current =
    base_unit_charge_capacity * data.n_base_units * c_rate.charge_rate
  const cell_charge_energy = base_unit_charge_energy * data.n_base_units
  const cell_charge_power = c_rate.charge_voltage * cell_current
  const cell_charge_capacity = base_unit_charge_capacity * data.n_base_units
  const cell_charge_energy_density =
    (cell_charge_energy / pre_cell.total_mass) * 1000
  const cell_charge_power_density =
    (cell_charge_power / pre_cell.total_mass) * 1000
  const cell_discharge_energy = base_unit_discharge_energy * data.n_base_units
  const cell_discharge_power = c_rate.discharge_voltage * cell_current
  const cell_discharge_capacity = cell_charge_capacity
  const cell_discharge_energy_density =
    (cell_discharge_energy / pre_cell.total_mass) * 1000
  const cell_discharge_power_density =
    (cell_discharge_power / pre_cell.total_mass) * 1000
  const cell_volume =
    (data.curr_collect_thickness_al * data.n_base_units +
      data.curr_collect_thickness_cu * (data.n_base_units + 1) +
      data.coating_thickness * data.n_base_units * 4 +
      data.separator_thickness * data.n_base_units * 2) *
    0.0001 *
    data.area // [cm3]

  //Module
  const module_charge_voltage = c_rate.charge_voltage * data.n_series
  const module_charge_capacity = cell_charge_capacity * data.n_parallel
  const module_charge_energy = module_charge_voltage * module_charge_capacity
  const module_charge_power = module_charge_energy * c_rate.charge_rate
  const module_charge_energy_density = module_charge_energy / module_total_mass
  const module_charge_power_density = module_charge_power / module_total_mass
  const module_discharge_voltage = c_rate.discharge_voltage * data.n_series
  const module_discharge_capacity = cell_discharge_capacity * data.n_parallel
  const module_discharge_energy =
    module_discharge_voltage * module_discharge_capacity
  const module_discharge_power = module_discharge_energy * c_rate.charge_rate
  const module_discharge_energy_density =
    module_discharge_energy / module_total_mass
  const module_discharge_power_density =
    module_discharge_power / module_total_mass
  const module_volume = cell_volume * (data.n_series + data.n_parallel) // [cm3]

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
    base_unit_volume,
    cell_current,
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
    cell_volume,
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
    module_volume,
  }
}

export function calc(data, dispatch) {
  const {
    cathode_material_id,
    anode_material_id,
    electrolyte_id,
    area,
    n_base_units,
    cathode_load,
    coating_thickness,
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

  const pre_base_unit = step_1(data, data.n_base_units)
  const pre_cell = step_1(data, 1)
  const module_total_mass =
    pre_cell.total_mass * data.n_series * data.n_parallel * 0.001

  const slow_rate = step_2(data, pre_base_unit, pre_cell, module_total_mass, {
    current: 0.014, //fixed.PR_current_min
    charge_rate: 0.1, // data.slow_charge_rate_id
    cathode_capacity: 175, //cathode_material_id AND slow_charge_rate_id AND cathode_capacity
    charge_voltage: 2.35, //(cathode_material_id AND slow_charge_rate_id AND cathode_charge_voltage)-(anode_material_id AND anode_voltage);
    discharge_voltage: 2.3, //(cathode_material_id AND slow_charge_rate_id AND cathode_discharge_voltage)-(anode_material_id AND anode_voltage);
  })
  const fast_rate = step_2(data, pre_base_unit, pre_cell, module_total_mass, {
    current: 0.7, //fixed.PR_current_max
    charge_rate: 5, // data.fast_charge_rate_id
    cathode_capacity: 130, //cathode_material_id AND fast_charge_rate_id AND cathode_capacity;
    charge_voltage: 4, //(cathode_material_id AND fast_charge_rate_id AND cathode_charge_voltage) -(anode_material_id AND anode_voltage);
    discharge_voltage: 2.2, //(cathode_material_id AND fast_charge_rate_id AND cathode_discharge_voltage)-(anode_material_id AND anode_voltage)
  })

  dispatch(
    setSuma({
      formularData: data,
      pre_base_unit,
      pre_cell,
      module_total_mass,
      slow: slow_rate,
      fast: fast_rate,
    })
  )
}

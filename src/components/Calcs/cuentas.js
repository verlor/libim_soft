import React, { useState } from 'react'

//leidos desde api, independiente de cómo se llamen después

const cathode_material_id = 'NMC'
const anode_material_id = 'LTO'
const electrolyte_id = 'LPF6 + EC'
const slow_charge_rate_id = 0.1
const fast_charge_rate_id = 5
const area = 50
const n_coat = 2
const n_base_units = 20 //numero electrodos es número de unidades mínimas (pares cc_Cu + sep - cc_Al)
const cathode_load = 5
const cathode_add = 5
const anode_add = 5
const separator_thickness = 25
const curr_collect_thickness_cu = 9
const curr_collect_thickness_al = 15
const n_series = 3
const n_parallel = 3

/* estas variables deben ser respuestas de consultas a la api con la info ingresada
const s_rate_anode_capacity=anode_material_id AND anode_real_capacity;
const s_rate_cathode_capacity=cathode_material_id AND slow_charge_rate_id AND cathode_capacity;
const s_rate_charge_voltage=(cathode_material_id AND slow_charge_rate_id AND cathode_charge_voltage)-(anode_material_id AND anode_voltage);
const s_rate_discharge_voltage=(cathode_material_id AND slow_charge_rate_id AND cathode_discharge_voltage)-(anode_material_id AND anode_voltage);
const current_min=(cathode_material_id AND cathode_theor_charge)*slow_charge_rate_id*cathode_mass*0.001;
const current_max=(cathode_material_id AND cathode_theor_charge)*fast_charge_rate_id*cathode_mass*0.001;
const f_rate_cathode_capacity=cathode_material_id AND fast_charge_rate_id AND cathode_capacity
const f_rate_charge_voltage=cathode_material_id AND fast_charge_rate_id AND cathode_charge_voltage
const f_rate_discharge_voltage=(cathode_material_id AND fast_charge_rate_id AND cathode_discharge_voltage)-(anode_material_id AND anode_voltage);
*/

//solo para pruebitas
const s_rate_anode_capacity = 175
const s_rate_cathode_capacity = 145
const s_rate_charge_voltage = 2.35
const s_rate_discharge_voltage = 2.3
const current_min = 0.014
const current_max = 0.7
const f_rate_cathode_capacity = 130
const f_rate_charge_voltage = 4
const f_rate_discharge_voltage = 2.2

const al_density = 2.7
const cu_density = 8.96
const electrolite_density = 1.5
const separator_density = 0.97

const cathode_porosity = 0.3
const anode_porosity = 0.3
const separator_porosity = 0.55
//solo para pruebitas

//calculos preliminares
const charge_thickness_dependency_cda = 50 * cathode_load

const cathode_mass = area * cathode_load * n_coat * 0.001
const cathode_additives = (cathode_mass * cathode_add) / (100 - cathode_add)
const cathode_mass_st = cathode_mass + cathode_additives
const cathode_collector_mat =
  area * curr_collect_thickness_al * al_density * 0.0001
const cathode_total_mass = cathode_mass_st + cathode_collector_mat

const anode_mass =
  (s_rate_cathode_capacity / s_rate_anode_capacity) *
  area *
  cathode_load *
  n_coat *
  0.001
const anode_additives = (anode_mass * anode_add) / (100 - anode_add)
const anode_mass_st = anode_mass + anode_additives
const anode_collector_mat =
  area * curr_collect_thickness_cu * cu_density * 0.0001
const anode_total_mass = anode_mass_st + anode_collector_mat

const electrodes_total_mass = cathode_total_mass + anode_total_mass

const separator_mass = area * separator_thickness * separator_density * 0.0001

//base unit
const electrolite_cathode_mass =
  area * charge_thickness_dependency_cda * cathode_porosity * n_coat * 0.0001
const electrolite_anode_mass =
  area * charge_thickness_dependency_cda * anode_porosity * n_coat * 0.0001
const electrolite_separator_mass =
  area * separator_thickness * electrolite_density * separator_porosity * 0.0001
const electrolite_total_mass =
  electrolite_cathode_mass + electrolite_anode_mass + electrolite_separator_mass
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

//BAJAS CORRIENTES
/*
const cathode_capacity=cathode_material_id AND slow_charge_rate_id AND cathode_capacity;
const charge_voltage=(cathode_material_id AND slow_charge_rate_id AND cathode_charge_voltage)-(anode_material_id AND anode_voltage);
const discharge_voltage=(cathode_material_id AND slow_charge_rate_id AND cathode_discharge_voltage)-(anode_material_id AND anode_voltage);
*/

//calculos para unidades mínimas o base (aparecen como electrodos en planilla)
const base_unit_charge_energy =
  cathode_capacity * charge_voltage * cathode_mass * 0.001
const base_unit_charge_power = charge_voltage * current_min
const base_unit_charge_capacity = cathode_mass * cathode_capacity
const base_unit_charge_energy_density =
  (base_unit_charge_energy / base_unit_total_mass) * 1000
const base_unit_charge_power_density =
  (base_unit_charge_power / base_unit_total_mass) * 1000
const base_unit_discharge_energy =
  cathode_capacity * discharge_voltage * cathode_mass * 0.001
const base_unit_discharge_power = discharge_voltage * current_min
const base_unit_discharge_capacity = base_unit_charge_capacity
const base_unit_efficiency_energy =
  base_unit_discharge_energy / base_unit_charge_energy
const base_unit_efficiency_power =
  base_unit_discharge_power / base_unit_charge_power
const base_unit_efficiency_capacity =
  base_unit_discharge_capacity / base_unit_charge_capacity
const base_unit_discharge_energy_density =
  (base_unit_total_mass / base_unit_discharge_energy) * 1000
const base_unit_discharge_power_density =
  (base_unit_total_mass / base_unit_discharge_power) * 1000

//calculos para celdas
const cell_current = base_unit_charge_capacity * n_base_units
const cell_volume = area * n_base_units * (1 / n_base_units) * 0.001
const cell_charge_energy = base_unit_charge_energy * n_base_units
const cell_charge_power = charge_voltage * cell_current
const cell_charge_capacity = base_unit_charge_capacity * n_base_units
const cell_charge_energy_density = (cell_charge_energy / cell_total_mass) * 1000
const cell_charge_power_density = (cell_charge_power / cell_total_mass) * 1000
const cell_discharge_energy = base_unit_discharge_energy * n_base_units
const cell_discharge_power = discharge_voltage * cell_current
const cell_discharge_capacity = cell_charge_capacity
const cell_discharge_energy_density =
  (cell_discharge_energy / cell_total_mass) * 1000
const cell_discharge_power_density =
  (cell_discharge_power / cell_total_mass) * 1000

//calculos para modulo
const module_charge_voltage = charge_voltage * n_series
const module_charge_capacity = cell_charge_capacity * n_parallel
const module_charge_energy = module_charge_voltage * module_charge_capacity
const module_charge_power = module_charge_energy * slow_charge_rate_id
const module_charge_energy_density = module_charge_energy / module_total_mass
const module_charge_power_density = module_charge_power / module_total_mass
const module_discharge_voltage = discharge_voltage * n_series
const module_discharge_capacity = cell_discharge_capacity * n_parallel
const module_discharge_energy =
  module_discharge_voltage * module_discharge_capacity
const module_discharge_power = module_discharge_energy * slow_charge_rate_id
const module_discharge_energy_density =
  module_discharge_energy / module_total_mass
const module_discharge_power_density =
  module_discharge_power / module_total_mass

/* //ALTAS CORRIENTES
const cathode_capacity=cathode_material_id AND fast_charge_rate_id AND cathode_capacity;
const charge_voltage=(cathode_material_id AND fast_charge_rate_id AND cathode_charge_voltage) -(anode_material_id AND anode_voltage);;
const discharge_voltage=(cathode_material_id AND fast_charge_rate_id AND cathode_discharge_voltage)-(anode_material_id AND anode_voltage);
//calculos para unidades mínimas o base (aparecen como electrodos en planilla)
const base_unit_charge_energy=cathode_capacity*charge_voltage*cathode_mass*0.001;
const base_unit_charge_power=charge_voltage*current_min;
const base_unit_charge_capacity=cathode_mass*cathode_capacity;
const base_unit_charge_energy_density=(base_unit_charge_energy/base_unit_total_mass)*1000;
const base_unit_charge_power_density=(base_unit_charge_power/base_unit_total_mass)*1000;
const base_unit_discharge_energy=cathode_capacity*discharge_voltage*cathode_mass*0.001;
const base_unit_discharge_power=discharge_voltage*current_min;
const base_unit_discharge_capacity=base_unit_charge_capacity;
const base_unit_efficiency_energy=base_unit_discharge_energy/base_unit_charge_energy;
const base_unit_efficiency_power=base_unit_discharge_power/base_unit_charge_power;
const base_unit_efficiency_capacity=base_unit_discharge_capacity/base_unit_charge_capacity;
const base_unit_discharge_energy_density=(base_unit_total_mass/base_unit_discharge_energy)*1000;
const base_unit_discharge_power_density=(base_unit_total_mass/base_unit_discharge_power)*1000;

//calculos para celdas
const cell_current=base_unit_charge_capacity*n_base_units;
const cell_volume=area*n_base_units*(1/n_base_units)*0.001;
const cell_charge_energy=base_unit_charge_energy*n_base_units;
const cell_charge_power=charge_voltage*cell_current;
const cell_charge_capacity=base_unit_charge_capacity*n_base_units;
const cell_charge_energy_density=(cell_charge_energy/cell_total_mass)*1000;
const cell_charge_power_density=(cell_charge_power/cell_total_mass)*1000;
const cell_discharge_energy=base_unit_discharge_energy*n_base_units;
const cell_discharge_power=discharge_voltage*cell_current;
const cell_discharge_capacity=cell_charge_capacity;
const cell_discharge_energy_density=(cell_discharge_energy/cell_total_mass)*1000;
const cell_discharge_power_density=(cell_discharge_power/cell_total_mass)*1000;

//calculos para modulo
const module_charge_voltage=charge_voltage*n_series;
const module_charge_capacity=cell_charge_capacity*n_parallel;
const module_charge_energy=module_charge_voltage*module_charge_capacity;
const module_charge_power=module_charge_energy*slow_charge_rate_id;
const module_charge_energy_density=module_charge_energy/module_total_mass;
const module_charge_power_density=module_charge_power/module_total_mass;
const module_discharge_voltage=discharge_voltage*n_series;
const module_discharge_capacity=cell_discharge_capacity*n_parallel;
const module_discharge_energy=module_discharge_voltage*module_discharge_capacity;
const module_discharge_power=module_discharge_energy*slow_charge_rate_id;
const module_discharge_energy_density=module_discharge_energy/module_total_mass;
const module_discharge_power_density=module_discharge_power/module_total_mass; */

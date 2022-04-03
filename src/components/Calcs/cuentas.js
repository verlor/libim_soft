//import { form_feed } from './test'
import { setSuma } from '../Resultados/slice'
import * as fixed from '../../utils/constants'
import { current } from '@reduxjs/toolkit'

//calculos preliminares

function step_1(data, denom) {
  const {
    //cathode_material_id,
    //anode_material_id,
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
    anode_real_capacity,
    anode_theor_voltage,
    cathode_theor_capacity,
    sr_cathode_capacity,
    sr_cathode_charge_voltage,
    sr_cathode_discharge_voltage,
    fr_cathode_capacity,
    fr_cathode_charge_voltage,
    fr_cathode_discharge_voltage,
  } = { ...data }

  const charge_thickness_dependency_cda = {
    name: 'Charge thickness dependency',
    s_name: 'ch_thick_d',
    value: cathode_load.value * coating_thickness.value,
    unit: 'um',
    unit_a: cathode_load.unit + ' * ' + coating_thickness.unit, //unidades raras, ver
  }
  const cathode_mass = {
    name: 'Cathode active material mass',
    s_name: 'ca_am_m',
    value:
      area.value *
      cathode_load.value *
      fixed.N_COAT.value *
      fixed.g_mg.value *
      (n_base_units.value / denom.value),
    unit: 'g',
    unit_a:
      area.unit +
      ' * ' +
      cathode_load.unit +
      ' * ' +
      fixed.N_COAT.unit +
      ' * ' +
      fixed.g_mg.unit +
      ' * (' +
      n_base_units.unit +
      ' / ' +
      denom.unit +
      ')',
  }
  const cathode_additives = {
    name: 'Cathode additives',
    s_name: 'ca_add',
    value: (cathode_mass.value * cathode_add.value) / (100 - cathode_add.value),
    unit: 'g',
    unit_a:
      '(' +
      cathode_mass.unit +
      ' * ' +
      cathode_add.unit +
      ') / (100 - ' +
      cathode_add.unit +
      ')',
  }
  const cathode_mass_st = {
    name: 'Cathode material + additives mass',
    s_name: 'ca_add_m',
    value: cathode_mass.value + cathode_additives.value,
    unit: 'g',
    unit_a: cathode_mass.unit + ' + ' + cathode_additives.unit,
  }
  const cathode_collector_mat = {
    name: 'Cathode collector mass',
    s_name: 'ca_col_m',
    value:
      area.value *
      curr_collect_thickness_al.value *
      fixed.AL_DENSITY.value *
      fixed.cm_um.value *
      (n_base_units.value / denom.value),
    unit: 'g',
    unit_a:
      area.unit +
      ' * ' +
      curr_collect_thickness_al.unit +
      ' * ' +
      fixed.AL_DENSITY.unit +
      ' * ' +
      fixed.cm_um.unit +
      ' * ' +
      (n_base_units.unit + ' / ' + denom.unit),
  }
  const cathode_total_mass = {
    name: 'Cathode total mass',
    s_name: 'ca_tot_m',
    value: cathode_mass_st.value + cathode_collector_mat.value,
    unit: 'g',
    unit_a: cathode_mass_st.unit + ' + ' + cathode_collector_mat.unit,
  }
  //console.log("ca",charge_thickness_dependency_cda,cathode_mass,cathode_additives,cathode_mass_st,cathode_collector_mat,cathode_total_mass)

  const anode_mass = {
    name: 'Anode active material mass',
    s_name: 'an_am_m',
    value:
      (sr_cathode_capacity.value / anode_real_capacity.value) *
      area.value *
      cathode_load.value *
      fixed.N_COAT.value *
      fixed.g_mg.value *
      (n_base_units.value / denom.value),
    unit: 'g',
    unit_a:
      '(' +
      sr_cathode_capacity.unit +
      ' / ' +
      anode_real_capacity.unit +
      ') * ' +
      area.unit +
      ' * ' +
      cathode_load.unit +
      ' * ' +
      fixed.N_COAT.unit +
      ' * ' +
      fixed.g_mg.unit +
      ' * (' +
      n_base_units.unit +
      ' / ' +
      denom.unit +
      ')',
  }
  const anode_additives = {
    name: 'Anode additives',
    s_name: 'an_add',
    value: (anode_mass.value * anode_add.value) / (100 - anode_add.value),
    unit: 'g',
    unit_a:
      '(' +
      anode_mass.unit +
      ' * ' +
      anode_add.unit +
      ') / (100 - ' +
      anode_add.unit +
      ')',
  }
  const anode_mass_st = {
    name: 'Anode material + additives mass',
    s_name: 'an_add_m',
    value: anode_mass.value + anode_additives.value,
    unit: 'g',
    unit_a: anode_mass.unit + ' + ' + anode_additives.unit,
  }
  const anode_collector_mat = {
    name: 'Anode collector mass',
    s_name: 'an_col_m',
    value:
      area.value *
      curr_collect_thickness_cu.value *
      fixed.cm_um.value *
      fixed.CU_DENSITY.value *
      (1 + n_base_units.value / denom.value),
    unit: 'g',
    unit_a:
      area.unit +
      ' * ' +
      curr_collect_thickness_cu.unit +
      ' * ' +
      fixed.cm_um.unit +
      ' * ' +
      fixed.CU_DENSITY.unit +
      ' * (1 + ' +
      n_base_units.unit +
      ' / ' +
      denom.unit +
      ')',
  }
  const anode_total_mass = {
    name: 'Anode total mass',
    s_name: 'an_tot_m',
    value: anode_mass_st.value + anode_collector_mat.value,
    unit: 'g',
    unit_a: anode_mass_st.unit + ' + ' + anode_collector_mat.unit,
  }

  //console.log("an",anode_mass,anode_additives,anode_mass_st,anode_collector_mat,anode_total_mass)

  const electrodes_total_mass = {
    name: 'Electrodes total mass',
    s_name: 'el_tot_m',
    value: cathode_total_mass.value + anode_total_mass.value,
    unit: 'g',
    unit_a: cathode_total_mass.unit + ' + ' + anode_total_mass.unit,
  }
  const separator_mass = {
    name: 'Separator mass',
    s_name: 'sep_m',
    value:
      area.value *
      separator_thickness.value *
      fixed.cm_um.value *
      fixed.SEPARATOR_DENSITY.value *
      ((2 * n_base_units.value) / denom.value),
    unit: 'g',
    unit_a:
      area.unit +
      ' * ' +
      separator_thickness.unit +
      ' * ' +
      fixed.cm_um.unit +
      ' * ' +
      fixed.SEPARATOR_DENSITY.unit +
      ' * ((2 * ' +
      n_base_units.unit +
      ') / ' +
      denom.unit +
      ')',
  }
  const electrolyte_cathode_mass = {
    name: 'Electrolyte mass in cathode',
    s_name: 'el_ca_m',
    value:
      area.value *
      charge_thickness_dependency_cda.value *
      fixed.cm_um.value *
      electrolyte_id.value * 
      fixed.CATHODE_POROSITY.value *
      fixed.N_COAT.value *
      (n_base_units.value / denom.value),
    unit: 'g',
    unit_a:
      area.unit +
      ' * ' +
      charge_thickness_dependency_cda.unit +
      ' * ' +
      fixed.cm_um.unit +
      ' * ' +
      electrolyte_id.unit +
      ' * ' +
      fixed.CATHODE_POROSITY.unit +
      ' * ' +
      fixed.N_COAT.unit +
      ' * (' +
      n_base_units.unit +
      ' / ' +
      denom.unit +
      ')',
  }
  const electrolyte_anode_mass = {
    name: 'Electrolyte mass in anode',
    s_name: 'el_an_m',
    value:
      area.value *
      charge_thickness_dependency_cda.value *
      fixed.cm_um.value *
      electrolyte_id.value * 
      fixed.ANODE_POROSITY.value *
      fixed.N_COAT.value *
      (n_base_units.value / denom.value),
    unit: 'g',
    unit_a:
      area.unit +
      ' * ' +
      charge_thickness_dependency_cda.unit +
      ' * ' +
      fixed.cm_um.unit +
      ' * ' +
      electrolyte_id.value + 
      ' * ' +
      fixed.ANODE_POROSITY.unit +
      ' * ' +
      fixed.N_COAT.unit +
      ' * (' +
      n_base_units.unit +
      ' / ' +
      denom.unit +
      ')',
  }
  const electrolyte_separator_mass = {
    name: 'Electrolyte mass in separator',
    s_name: 'el_se_m',
    value:
      area.value *
      separator_thickness.value *
      electrolyte_id.value *
      fixed.SEPARATOR_POROSITY.value *
      fixed.cm_um.value *
      ((2 * n_base_units.value) / denom.value), // 2 separators per base unit,
    unit: 'g',
    unit_a:
      area.unit +
      ' * ' +
      separator_thickness.unit +
      ' * ' +
      electrolyte_id.unit +
      ' * ' +
      fixed.SEPARATOR_POROSITY.unit +
      ' * ' +
      fixed.cm_um.unit +
      ' * ((2 * ' +
      n_base_units.unit +
      ') / ' +
      denom.unit +
      ')',
  }

  const electrolyte_total_mass = {
    name: 'Electrolyte total mass',
    s_name: 'El_tot_m',
    value:
      electrolyte_cathode_mass.value +
      electrolyte_anode_mass.value +
      electrolyte_separator_mass.value,
    unit: 'g',
    unit_a:
      electrolyte_cathode_mass.unit +
      ' + ' +
      electrolyte_anode_mass.unit +
      ' + ' +
      electrolyte_separator_mass.unit,
  }
  const total_mass = {
    name: 'Total mass',
    s_name: 'Total_m',
    value:
      electrodes_total_mass.value +
      separator_mass.value +
      electrolyte_total_mass.value,
    unit: 'g',
    unit_a:
      electrodes_total_mass.unit +
      ' + ' +
      separator_mass.unit +
      ' + ' +
      electrolyte_total_mass.unit,
  }
  //console.log("tre",electrodes_total_mass,separator_mass,electrolyte_cathode_mass, electrolyte_anode_mass, electrolyte_separator_mass, electrolyte_total_mass,total_mass)

  return {
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
    electrolyte_cathode_mass,
    electrolyte_anode_mass,
    electrolyte_separator_mass,
    electrolyte_total_mass,
    total_mass,
  }
}

function step_2(data, pre_base_unit, pre_cell, module_total_mass, c_rate) {
  const {
    // cathode_material_id,
    // anode_material_id,
    // electrolyte_id,
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
    anode_real_capacity,
    anode_theor_voltage,
    cathode_theor_capacity,
    sr_cathode_capacity,
    sr_cathode_charge_voltage,
    sr_cathode_discharge_voltage,
    fr_cathode_capacity,
    fr_cathode_charge_voltage,
    fr_cathode_discharge_voltage,
  } = { ...data }

  //const { cathode_capacity, charge_voltage, discharge_voltage } = { ...c_rate }

  const current = {
    name: 'Current',
    s_name: 'Current',
    value: data.cathode_theor_capacity.value *
    pre_base_unit.cathode_mass.value *
    fixed.A_mA.value * ( c_rate === slow_charge_rate_id ? slow_charge_rate_id.value : fast_charge_rate_id.value ),
    unit: 'A',
    unit_a: data.cathode_theor_capacity.unit +
    ' * ' +
    pre_base_unit.cathode_mass.unit +
    ' * ' +
    fixed.A_mA.unit +
    ' * ' + 
    ( c_rate === slow_charge_rate_id ? slow_charge_rate_id.unit : fast_charge_rate_id.unit )
  }
    const charge_rate = {
    name: 'Charge rate',
    s_name: 'C_Rate',
    value:
      c_rate === slow_charge_rate_id
        ? slow_charge_rate_id.value
        : fast_charge_rate_id.value,
    unit:
      c_rate === slow_charge_rate_id
        ? slow_charge_rate_id.unit
        : fast_charge_rate_id.unit,
    unit_a:
      c_rate === slow_charge_rate_id
        ? slow_charge_rate_id.unit
        : fast_charge_rate_id.unit,
  }
  const cathode_capacity =
    c_rate === slow_charge_rate_id
      ? data.sr_cathode_capacity
      : data.fr_cathode_capacity

  const charge_voltage = {
    name: 'Charge voltage',
    s_name: 'ch_V',
    value:
      (c_rate === slow_charge_rate_id ? data.sr_cathode_charge_voltage.value : data.fr_cathode_charge_voltage.value) - data.anode_theor_voltage.value,
    unit: 'V',
    unit_a: (c_rate === slow_charge_rate_id ? data.sr_cathode_charge_voltage.unit : data.fr_cathode_charge_voltage.unit) +
    ' - ' + data.anode_theor_voltage.unit,  
  }
  const discharge_voltage = {
    name: 'Discharge voltage',
    s_name: 'dch_V',
    value:
      (c_rate === slow_charge_rate_id
        ? data.sr_cathode_discharge_voltage.value : data.fr_cathode_discharge_voltage.value) - data.anode_theor_voltage.value,
    unit: 'V',
    unit_a:
      (c_rate === slow_charge_rate_id 
        ? data.sr_cathode_discharge_voltage.unit : data.fr_cathode_discharge_voltage.unit) + ' - ' + data.anode_theor_voltage.unit,
  }

  console.log("current",current,"charge_rate",charge_rate,"cathode_capacity",cathode_capacity,"charge_voltage",charge_voltage,"discharge_voltage",discharge_voltage)
  
  //Calculando
  //Base unit
  const base_unit_charge_energy = {
    name: 'Charge energy',
    s_name: 'Ch_E',
    value:
      cathode_capacity.value *
      charge_voltage.value *
      pre_base_unit.cathode_mass.value *
      fixed.W_mW.value,
    unit: 'Wh',
    unit_a:
      cathode_capacity.unit + " * " +
      charge_voltage.unit + " * " +
      pre_base_unit.cathode_mass.unit  + " * " +
      fixed.W_mW.unit,
  }
  const base_unit_charge_power =  {
    name: "Charge power",
    s_name: "Ch_pow",
    value: charge_voltage.value * current.value,
    unit:"W",
    unit_a: charge_voltage.unit + " * " + current.unit,
    }
  const base_unit_charge_capacity ={
    name: "Charge capacity",
    s_name: "Ch_cap",
    value: pre_base_unit.cathode_mass.value * cathode_capacity.value * fixed.W_mW.value,
    unit:"Ah",
    unit_a: pre_base_unit.cathode_mass.unit + " * " + cathode_capacity.unit + " * " + fixed.W_mW.unit,
    } 
  const base_unit_charge_energy_density ={
    name: "Charge energy density",
    s_name: "Ch_E_rho",
    value: base_unit_charge_energy.value / (pre_base_unit.total_mass.value * fixed.kg_g.value),
    unit:"Wh kg-1",
    unit_a: base_unit_charge_energy.unit + "/ (" +pre_base_unit.total_mass.unit + " * " + fixed.kg_g.unit + ")",
    }
  const base_unit_charge_power_density ={
    name: "Charge power density",
    s_name: "Ch_p_rho",
    value: base_unit_charge_power.value / (pre_base_unit.total_mass.value * fixed.kg_g.value),
    unit:"W kg-1",
    unit_a: base_unit_charge_power.unit + "/ (" +pre_base_unit.total_mass.unit + " * " + fixed.kg_g.unit + ")",
    }
  const base_unit_discharge_energy = {
    name: "Discharge energy",
    s_name: "Dch_E",
    value: cathode_capacity.value * discharge_voltage.value * pre_base_unit.cathode_mass.value * fixed.W_mW.value,
    unit:"Wh",
    unit_a: cathode_capacity.unit + " * " + discharge_voltage.unit + " * " + pre_base_unit.cathode_mass.unit + " * " + fixed.W_mW.unit,
    }

  const base_unit_discharge_power = {
    name: "Discharge power",
    s_name: "Dch_pow",
    value: discharge_voltage.value * current.value,
    unit:"W",
    unit_a: discharge_voltage.unit + " * " + current.unit,
    }
  const base_unit_discharge_capacity = {
    name: "Discharge capacity",
    s_name: "Dch_cap",
    value: base_unit_charge_capacity.value,
    unit:base_unit_charge_capacity.unit,
    unit_a: base_unit_charge_capacity.unit,
    }
  const base_unit_efficiency_energy =  {
    name: "Energy efficiency",
    s_name: "E_effi",
    value: base_unit_discharge_energy.value / base_unit_charge_energy.value,
    unit:"[]",
    unit_a: base_unit_discharge_energy.unit + " / " + base_unit_charge_energy.unit,
    }
  const base_unit_efficiency_power = {
    name: "Power efficiency",
    s_name: "Pow_effi",
    value: base_unit_discharge_power.value / base_unit_charge_power.value,
    unit:"[]",
    unit_a: base_unit_discharge_power.unit + " / " + base_unit_charge_power.unit,
    }
  const base_unit_efficiency_capacity =  {
    name: "Capacity efficiency",
    s_name: "Cap_effi",
    value: base_unit_discharge_capacity.value / base_unit_charge_capacity.value,
    unit:"[]",
    unit_a: base_unit_discharge_capacity.unit + " / " + base_unit_charge_capacity.unit,
    }
  const base_unit_discharge_energy_density ={
    name: "Discharge energy density",
    s_name: "Dch_E_rho",
    value: base_unit_discharge_energy.value / (pre_base_unit.total_mass.value * fixed.kg_g.value),
    unit:"Wh kg-1",
    unit_a: base_unit_discharge_energy.unit + " / (" + pre_base_unit.total_mass.unit  + " * " +  fixed.kg_g.unit + ")",
    }
  const base_unit_discharge_power_density = {
    name: "Discharge power density",
    s_name: "Dch_p_rho",
    value: base_unit_discharge_power.value / (pre_base_unit.total_mass.value * fixed.kg_g.value),
    unit:"W kg-1",
    unit_a: base_unit_discharge_power.unit + " / (" + pre_base_unit.total_mass.unit + " * " + fixed.kg_g.unit + ")",
    }
  const base_unit_volume =  {
    name: "Volume",
    s_name: "Volume",
    value: (data.curr_collect_thickness_al.value +
      data.curr_collect_thickness_cu.value * 2 +
      data.coating_thickness.value * 4 +
      data.separator_thickness.value * 2) * fixed.cm_um.value *
    data.area.value,
    unit:"cm3",
    unit_a: "(" + data.curr_collect_thickness_al.unit + " + " +
      data.curr_collect_thickness_cu.unit + " * " + 2 + " + " +
      data.coating_thickness.unit + " * " + 4 + " + " +
      data.separator_thickness.unit + " * " + 2 + ") * " + fixed.cm_um.unit + " * " +
    data.area.unit,
    }
    //console.log('uu', base_unit_discharge_power,base_unit_discharge_capacity,base_unit_efficiency_energy,base_unit_efficiency_power,base_unit_efficiency_capacity,base_unit_discharge_energy_density,base_unit_discharge_power_density,base_unit_volume)  
  
    //Cell
  const cell_current ={
    name: "Current",
    s_name: "Current",
    value: base_unit_charge_capacity.value * data.n_base_units.value * charge_rate.value,
    unit: "A",
    unit_a: base_unit_charge_capacity.unit+ " * " +data.n_base_units.unit + " * " + charge_rate.unit,
    }
  const cell_charge_energy = {
    name: 'Charge energy',
    s_name: 'Ch_E',
    value: base_unit_charge_energy.value * data.n_base_units.value,
    unit:"Wh",
    unit_a: base_unit_charge_energy.unit + " * " + data.n_base_units.unit,
    }
  const cell_charge_power = {
    name: "Charge power",
    s_name: "Ch_pow",
    value: charge_voltage.value * cell_current.value,
    unit:"W",
    unit_a: charge_voltage.unit + " * " + cell_current.unit,
    }
  const cell_charge_capacity = {
    name: "Charge capacity",
    s_name: "Ch_cap",
    value: base_unit_charge_capacity.value * data.n_base_units.value,
    unit:"Ah",
    unit_a: base_unit_charge_capacity.unit + " * " + data.n_base_units.unit,
    }
  const cell_charge_energy_density ={
    name: "Charge energy density",
    s_name: "Ch_E_rho",
    value:  cell_charge_energy.value / (pre_cell.total_mass.value * fixed.kg_g.value),
    unit:"Wh kg-1",
    unit_a: cell_charge_energy.unit + " / (" + pre_cell.total_mass.unit + " * " + fixed.kg_g.unit + ")",
    }
  const cell_charge_power_density ={
    name: "Charge power density",
    s_name: "Ch_p_rho",
    value: cell_charge_power.value / (pre_cell.total_mass.value * fixed.kg_g.value),
    unit:"W kg-1",
    unit_a: cell_charge_power.unit + " / (" + pre_cell.total_mass.unit + " * " + fixed.kg_g.unit + ")",
    }
  const cell_discharge_energy = {
    name: "Discharge energy",
    s_name: "Dch_E",
    value: base_unit_discharge_energy.value * data.n_base_units.value,
    unit:"Wh",
    unit_a: base_unit_discharge_energy.unit + " * " + data.n_base_units.unit,
    }
  const cell_discharge_power = {
    name: "Discharge power",
    s_name: "Dch_pow",
    value: discharge_voltage.value * cell_current.value,
    unit:"W",
    unit_a: discharge_voltage.unit + " * " + cell_current.unit,
    }
  const cell_discharge_capacity = {
    name: "Discharge capacity",
    s_name: "Dch_cap",
    value: cell_charge_capacity.value,
    unit:cell_charge_capacity.unit,
    unit_a: cell_charge_capacity.unit,
    }
  const cell_discharge_energy_density ={
    name: "Discharge energy density",
    s_name: "Dch_E_rho",
    value: cell_discharge_energy.value / (pre_cell.total_mass.value * fixed.kg_g.value),
    unit:"Wh kg-1",
    unit_a: cell_discharge_energy.unit + " / (" + pre_cell.total_mass.unit + " * " + fixed.kg_g.unit + ")",
    }
  const cell_discharge_power_density ={
    name: "Discharge power density",
    s_name: "Dch_p_rho",
    value: cell_discharge_power.value / (pre_cell.total_mass.value * fixed.kg_g.value),
    unit:"W kg-1",
    unit_a: cell_discharge_power.unit + " / (" + pre_cell.total_mass.unit + " * " + fixed.kg_g.unit + ")",
    }
  const cell_volume ={
    name: "Volume",
    s_name: "Volume",
    value: (data.curr_collect_thickness_al.value * data.n_base_units.value +
      data.curr_collect_thickness_cu.value * (data.n_base_units.value + 1) +
      data.coating_thickness.value * data.n_base_units.value * 4 +
      data.separator_thickness.value * data.n_base_units.value * 2) * fixed.cm_um.value *
    data.area.value ,
    unit:"cm3",
    unit_a: "(" + data.curr_collect_thickness_al.unit + " * " + data.n_base_units.unit + " + " + 
      data.curr_collect_thickness_cu.unit + " * (" + data.n_base_units.unit + " + " + 1 + ") + " +
      data.coating_thickness.unit + " * " + data.n_base_units.unit + " * " + 4 + " + " +
      data.separator_thickness.unit + " * " + data.n_base_units.unit + " * " + 2 + ") * " + fixed.cm_um.unit + " * " +
    data.area.unit ,
    }
    //console.log('cell',cell_current,cell_charge_energy,cell_charge_power,cell_charge_capacity,cell_charge_energy_density,cell_charge_power_density,cell_discharge_energy,cell_discharge_power,cell_discharge_capacity,cell_discharge_energy_density,cell_discharge_power_density,cell_volume)

  //Module
  const module_charge_voltage =  {
    name: 'Charge voltage',
    s_name: 'Ch_V',
    value: charge_voltage.value * data.n_series.value,
    unit:"V",
    unit_a: charge_voltage.unit + " * " + data.n_series.unit,
    }
  const module_charge_capacity =  {
    name: "Charge capacity",
    s_name: "Ch_cap",
    value: cell_charge_capacity.value * data.n_parallel.value,
    unit:"Ah",
    unit_a: cell_charge_capacity.unit + " * " + data.n_parallel.unit,
    }
  const module_charge_energy = {
    name: 'Charge energy',
    s_name: 'Ch_E',
    value: module_charge_voltage.value * module_charge_capacity.value,
    unit:"Wh",
    unit_a: module_charge_voltage.unit + " * " + module_charge_capacity.unit,
    }
  const module_charge_power = {
    name: "Charge power",
    s_name: "Ch_pow",
    value: module_charge_energy.value * charge_rate.value,
    unit:"W",
    unit_a: module_charge_energy.unit + " * " + charge_rate.unit,
    }
  const module_charge_energy_density =  {
    name: "Charge energy density",
    s_name: "Ch_E_rho",
    value: module_charge_energy.value / module_total_mass.value,
    unit:"Wh kg-1",
    unit_a: module_charge_energy.unit + " / " + module_total_mass.unit,
    }
  const module_charge_power_density = {
    name: "Charge power density",
    s_name: "Ch_p_rho",
    value: module_charge_power.value / module_total_mass.value,
    unit:"W kg-1",
    unit_a: module_charge_power.unit + " / " + module_total_mass.unit,
    }
  const module_discharge_voltage =  {
    name: "Discharge voltage",
    s_name: "Dch_V",
    value: discharge_voltage.value * data.n_series.value,
    unit:"V",
    unit_a: discharge_voltage.unit + " * " + data.n_series.unit,
    } 
  const module_discharge_capacity = {
    name: "Discharge capacity",
    s_name: "Dch_cap",
    value: cell_discharge_capacity.value * data.n_parallel.value,
    unit:"Ah",
    unit_a: cell_discharge_capacity.unit + " * " + data.n_parallel.unit,
    }
  const module_discharge_energy = {
    name: "Discharge energy",
    s_name: "Dch_E",
    value: module_discharge_voltage.value * module_discharge_capacity.value,
    unit:"Wh",
    unit_a: module_discharge_voltage.unit + " * " + module_discharge_capacity.unit,
    } 
  const module_discharge_power =  {
    name: "Discharge power",
    s_name: "Dch_pow",
    value: module_discharge_energy.value * charge_rate.value,
    unit:"W",
    unit_a: module_discharge_energy.unit + " * " + charge_rate.unit,
    }
  const module_discharge_energy_density = {
    name: "Discharge energy density",
    s_name: "Dch_E_rho",
    value: module_discharge_energy.value / module_total_mass.value,
    unit:"Wh kg-1",
    unit_a: module_discharge_energy.unit + " / " + module_total_mass.unit,
    }
  const module_discharge_power_density = {
    name: "Discharge power density",
    s_name: "Dch_p_rho",
    value: module_discharge_power.value / module_total_mass.value,
    unit:"W kg-1",
    unit_a: module_discharge_power.unit + " / " + module_total_mass.unit,
    }
  const module_volume = {
    name: "Volume",
    s_name: "Volume",
    value: cell_volume.value * (data.n_series.value * data.n_parallel.value),
    unit:"cm3",
    unit_a: cell_volume.unit  + " * (" + data.n_series.unit + " * " + data.n_parallel.unit + ")",
    } //verificar Lupe series*parallel
    
   // console.log('mod',module_charge_voltage, module_charge_capacity,module_charge_energy,module_charge_power,module_charge_energy_density,module_charge_power_density,module_discharge_voltage, module_discharge_capacity, module_discharge_energy,module_discharge_power,module_discharge_energy_density,module_discharge_power_density,module_volume,)

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
    cathode_mass,
  } = { ...data }

  const pre_base_unit = step_1(data, data.n_base_units)
  const pre_cell = step_1(data, fixed.CONV_ONE)
  const module_total_mass = {
    name: 'Module total mass',
    s_name: 'Md_tot_m',
    value:
      pre_cell.total_mass.value *
      data.n_series.value *
      data.n_parallel.value *
      fixed.kg_g.value,
    unit: 'kg',
    unit_a:
      pre_cell.total_mass.unit +
      ' * ' +
      data.n_series.unit +
      ' * ' +
      data.n_parallel.unit +
      ' * ' +
      fixed.kg_g.unit,
  }
  const slow_rate = step_2(
    data,
    pre_base_unit,
    pre_cell,
    module_total_mass,
    data.slow_charge_rate_id
  )
  const fast_rate = step_2(
    data,
    pre_base_unit,
    pre_cell,
    module_total_mass,
    data.fast_charge_rate_id
  )

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

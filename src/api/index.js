export const propsCall = async ({ param1, param2, param3 }) => {
  try {
    const resp = await fetch(`https://api.github.coms/repos/gatsbyjs/gatsby`, {
      method: 'GET',
    })
    if (resp.status === 200) {
      return resp.json()
      // return {
      //     cathode_capacity: 130, //cathode_material_id AND fast_charge_rate_id AND cathode_capacity;
      //     charge_voltage: 4, //(cathode_material_id AND fast_charge_rate_id AND cathode_charge_voltage) -(anode_material_id AND anode_voltage);
      //     discharge_voltage: 2.2,
      // }
    } else {
      return {
        ok: false,
        msg: 'api call error',
      }
    }
  } catch (err) {
    return err
  }

  // .then(response => response.json()) // parse JSON from request
  // .then(resultData => {
  //   setStarsCount(resultData.stargazers_count)
  // }) // set data for the number of stars
}

const API_URL = 'http://127.0.0.1:3000/materials'

export const propsCall = async (id) =>
  fetch(`${API_URL}/${id}`, {
    method: 'GET',
  }).then((res) => res.json())

export const getMaterialsFetcher = (params) =>
  fetch(`${API_URL + params}`, {
    method: 'GET',
  }).then((res) => res.json())

export const postNewMaterial = (params) =>
  fetch(`${API_URL}`, {
    method: 'POST',
    headers: {"Content-Type": "application/json; charset=utf-8"},
    body:params,
  }).then((res) => res.json())
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
    body: JSON.stringify({...params}),
  }).then((res) => res.json())

export const delMaterial = async (id) =>
  fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  })
 
export const modMaterial = async (id, params) =>
  fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: {"Content-Type": "application/json; charset=utf-8"},
    body:  JSON.stringify(params),
  })

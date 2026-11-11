import axios from 'axios'

const BASE_URL = 'http://localhost:3001/persons'

const getAll = () => {
  return axios
    .get(BASE_URL)
    .then(response => response.data)
}

const create = (person) => {
  return axios
    .post(BASE_URL, person)
    .then(response => response.data)  
}

const remove = (id) => {
    return axios
      .delete(`${BASE_URL}/${id}`)
      .then(response => response.data)
}

const update = (id, person) => {
    return axios
        .put(`${BASE_URL}/${id}`, person)
        .then(response => response.data)
}

export default { getAll, create, remove, update }
import axios from "axios";
const baseUrl = "http://localhost:3001/api/persons";

const getAll = () => axios.get(baseUrl).then((response) => response.data);

const createPerson = (newPerson) =>
  axios.post(baseUrl, newPerson).then((response) => response.data);

const deletePerson = (id) =>
  axios.delete(`${baseUrl}/${id}`).then((response) => response.data);

const updatePerson = (id, updatedPerson) =>
  axios
    .put(`${baseUrl}/${id}`, updatedPerson)
    .then((response) => response.data);

export default {
  getAll,
  createPerson,
  deletePerson,
  updatePerson,
};

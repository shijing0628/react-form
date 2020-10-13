import axios from 'axios';
//const baseURL = 'http://localhost:3001/api/notes';
const baseURL = '/api/notes';

const getAll = () => {
 return axios.get(baseURL);
}

const create = newObj => {
 return axios.post(baseURL, newObj);
}

const update = (id, newObj) => {
 return axios.put(`${baseURL}/${id}`, newObj);
}

export default { getAll, create, update }
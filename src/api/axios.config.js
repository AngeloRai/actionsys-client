import axios from 'axios'

const apis = {
  development: 'http://localhost:4000',
  production: 'https://actionsys.herokuapp.com/'
}

// Configura axios para receber url base automaticamente, evitando repetição nas requisições.
const api = axios.create({
  baseURL: apis[process.env.NODE_ENV]
})


export default api


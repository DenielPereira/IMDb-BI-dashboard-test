import axios from 'axios'

const API = axios.create({
  baseURL: 'https://api.hgbrasil.com/',
})

API.interceptors.request.use((config) => {
  config.params = {
    ...config.params,
    format: 'json-cors',
    key: import.meta.env.VITE_API_KEY
  }
  return config
})

export default API

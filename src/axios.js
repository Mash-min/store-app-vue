import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8000/'
axios.defaults.headers['Authorization'] = 'Bearer ' + sessionStorage.getItem('token')
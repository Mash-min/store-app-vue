import axios from 'axios'

// axios.defaults.baseURL = 'http://localhost:8000/'
axios.defaults.baseURL = 'https://mm-store-app.herokuapp.com/'
axios.defaults.headers['Authorization'] = 'Bearer ' + localStorage.getItem('token')

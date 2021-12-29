import axios from 'axios'



// axios.defaults.baseURL = "http://10.126.27.105:8080"
axios.defaults.baseURL = "http://10.126.74.22:8080"
const request = axios.create({
    timeout: 5000,
    headers: {
        'Content-type': "application/json;charset=utf-8"
    }
})
export default request
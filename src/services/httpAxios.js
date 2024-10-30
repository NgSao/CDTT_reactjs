import axios from "axios";

const httpAxios = axios.create({
    baseURL: 'http://192.168.51.147:8000/api/',
    // timeout: 1000,
    // headers: { 'X-Custom-Header': 'foobar' }
    // headers: {
    //     'Content-Type': 'application/json',
    // },
});


httpAxios.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    return Promise.reject(error);
});
export default httpAxios;
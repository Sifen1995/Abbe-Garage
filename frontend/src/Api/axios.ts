import axios, { type AxiosInstance } from 'axios';

const instance:AxiosInstance=axios.create({
    baseURL:'http://localhost:4500/api'
});

export default instance;
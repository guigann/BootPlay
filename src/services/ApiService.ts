import axios from 'axios';

export const user_api = axios.create({
    baseURL: 'http://localhost:8081/api'
});

export const integration_api = axios.create({
    baseURL: 'http://localhost:8082/api'
});
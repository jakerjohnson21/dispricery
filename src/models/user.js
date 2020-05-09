import axios from 'axios';

const API_URL = "http://localhost:3000/api/v1";

export default class UserModel {
    static register(data) {
        let request = axios.post(`${API_URL}/auth/register`, data);
        return request;
    }

    static login(credentials) {
        let request = axios.post(`${API_URL}/auth/login`, credentials, {
            withCredentials: true
        })

        return request;
    }

    static logout() {
        let request = axios.delete(`${API_URL}/auth/logout`, {
            withCredentials: true
        })

        return request;
    }

    static getUser = (data) => {
        let request = axios.get(`${API_URL}/user/${data}`, {
            withCredentials: true
        })

        return request;
    }
};
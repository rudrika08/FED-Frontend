import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000";

let headers = {}

if (localStorage.token) {
    console.log(localStorage.getItem('token'));
    headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
}

const axiosClient = axios.create({
    baseURL: baseURL,
    headers
});

export default axiosClient;
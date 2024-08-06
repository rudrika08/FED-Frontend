import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000";

let headers = {}

const Token = localStorage.getItem("token");
if (Token) {
    headers.Authorization = `Bearer ${Token}`;
}

const axiosClient = axios.create({
    baseURL: baseURL,
    headers
});

export default axiosClient;
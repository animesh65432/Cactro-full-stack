import axios from "axios";

const api = axios.create({
    baseURL: "https://cactro-full-stack-1.onrender.com",
});

// https://cactro-full-stack-1.onrender.com
export default api;

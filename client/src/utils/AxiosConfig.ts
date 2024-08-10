import axios from "axios";

let backendURL
if (process.env.NODE_ENV === 'production') {
    backendURL = "https://universeblog-api.onrender.com/api/";
} else{
    backendURL = "http://localhost:3000/api/";
}

const axiosInstance = axios.create({
    baseURL: backendURL,
    headers: {
        'Content-Type': 'application/json'
    },
});

export default axiosInstance;
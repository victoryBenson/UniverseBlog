import axios from "axios";

let backendURL
if (process.env.NODE_ENV === 'production') {
    backendURL = "https://rebornv2api.onrender.com/api/blogs";
} else{
    backendURL = "http://localhost:3000/api/blogs";
}

const axiosInstance = axios.create({
    baseURL: backendURL,
    headers: {
        'Content-Type': 'application/json'
    },
});

export default axiosInstance
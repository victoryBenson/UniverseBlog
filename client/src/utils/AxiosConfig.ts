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
        'Content-Type': 'application/json',
        // Authorization: "Bearer " + token 
    },
});

// Add a request interceptor to set the authorization header
// axiosInstance.interceptors.request.use(
//     (config) => {
//       // Retrieve the token from local storage or any other secure place
//       const token = localStorage.getItem('authToken');
  
//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
  
//       return config;
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
// )
export default axiosInstance
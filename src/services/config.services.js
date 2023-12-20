//initial configuration for each call to BE
import axios from "axios";

const service = axios.create({
    // baseURL: process.env.REACT_APP_SERVER_URL,
    baseURL: "http://localhost:5005/api"
});

service.interceptors.request.use((config) => {
    // Search the Token that is stored in local storage
    const authToken = localStorage.getItem("authToken");
    // console.log("authToken", authToken);
  
    const tokenFull = `Bearer ${authToken}`;
  
    // Add the token to headers.authorization
    if (authToken) {
      config.headers.authorization = tokenFull;
    }
    return config;
  });

export default service;
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/elections",
  timeout: 10000,
  withCredentials: true,
});

// Add a request interceptor to automatically append trailing slashes
api.interceptors.request.use((config) => {
  if (config.url && !config.url.endsWith("/")) {
    config.url = `${config.url}/`;
  }
  return config;
});

export default api;

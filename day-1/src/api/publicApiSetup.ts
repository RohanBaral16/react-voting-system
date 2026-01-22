import axios from "axios";

const publicApi = axios.create({
  baseURL: "http://localhost:8000/elections",
  timeout: 10000,
  withCredentials: false,
});

publicApi.interceptors.request.use((config) => {
  if (config.url && !config.url.endsWith("/")) {
    config.url = `${config.url}/`;
  }
  return config;
});

export default publicApi;

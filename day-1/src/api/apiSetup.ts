import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/elections",
  timeout: 10000,
  withCredentials: true,
  xsrfCookieName: 'csrftoken', 
  xsrfHeaderName: 'X-CSRFToken',
});


export default api;

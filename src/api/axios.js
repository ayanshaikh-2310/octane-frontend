import axios from "axios";

const api = axios.create({
  baseURL: "http://3.111.169.191:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

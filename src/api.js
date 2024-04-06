import axios from "axios";

const DB_URL = process.env.REACT_APP_DB_URL;

const api = axios.create({
  baseURL: DB_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

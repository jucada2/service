import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8000" }); //falta link del balanceador de carga

export default API;

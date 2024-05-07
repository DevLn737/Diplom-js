import axios from "axios";


axios.defaults.baseURL = "http://localhost:4000/api/";
axios.defaults.headers = { "Content-Type": "application/json" };

export default axios;
import axios from "axios";
import {logout} from "@/utils/auth.js"
// import { getToken } from "@/utils/auth.js";

// axios.defaults.headers.common["Authorization"] = getToken();
axios.defaults.baseURL = "server:4000/api/";
axios.defaults.headers = {"Content-Type": "application/json"};

axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response.status === 401 || error.response.status === 403) {
            // Если пользователь не авторизован, или закончился срок токена, выкидываем из системы
            logout()
        }
        return Promise.reject(error);
    }
);

export default axios;
import axios from "axios";
import { logout } from "@/utils/auth.js";
import { getToken } from "@/utils/auth.js";

axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;
axios.defaults.headers = { "Content-Type": "application/json" };

// Получает и прикрепляет access-token ко всем запросам
axios.interceptors.request.use(
  (request) => {
    request.headers["Authorization"] = `Bearer ${getToken()}`;
    return request;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401 || error.response.status === 403) {
      // Если пользователь не авторизован, или закончился срок токена, выкидываем из системы
      logout();
    }
    return Promise.reject(error);
  },
);

export default axios;

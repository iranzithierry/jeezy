import axios, { AxiosInstance } from "axios";
import authHeader from "./auth-headers";
import { logout } from "@/lib/sessions";


const authAxios = axios.create();

// request interceptor for adding token
authAxios.interceptors.request.use((config) => {
    config.headers = authHeader();
    return config;
});

authAxios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response.status === 401) {
           logout()
        }
        return Promise.reject(error);
    }
);
export default authAxios
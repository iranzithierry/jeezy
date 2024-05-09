import { getCookie } from "@/lib/cookies";
import axios from "axios";

const authAxios = async () => {
    try {
        const accessToken = await getCookie('access.token');
        let authorizationHeader = {};
        
        if (accessToken && accessToken.length !== 0) {
            authorizationHeader = { "Authorization": `Bearer ${accessToken}` };
        }

        const instance = axios.create({
            headers: {
                ...authorizationHeader,
                "Content-Type": "application/json",
                timeout: 1000,
            },
        });

        return instance;
    } catch (error) {
        console.error("Error while creating Axios instance:", error);
        return axios.create();
    }
};

export default authAxios;

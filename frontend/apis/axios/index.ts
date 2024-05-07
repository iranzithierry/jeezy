import axios from "axios";
import { cookies } from "next/headers";
import { getCookie, hasCookie } from 'cookies-next';

let authorizationHeader = {};
const accessToken = getCookie('access.token');
if (accessToken && accessToken.length !== 0) {
    authorizationHeader = { "Authorization": accessToken, }
}
const authAxios = axios.create({
    headers: {
        ...authorizationHeader,
        "Content-Type": "application/json",
        timeout: 1000,
    },
});

export default authAxios;
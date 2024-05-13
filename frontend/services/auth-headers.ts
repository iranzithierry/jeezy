import COOKIE_NAMES from "@/constants/cookies-names";
import { getCookie } from "@/lib/cookies";
import { AxiosRequestHeaders } from "axios";

export default async function authHeader(): AxiosRequestHeaders {
    const accessToken = await getCookie(COOKIE_NAMES.ACCESS_TOKEN)
    if (!accessToken) {
        return {};
    }
    return { Authorization: `Token ${accessToken}` };
}

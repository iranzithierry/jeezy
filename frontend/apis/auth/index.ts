'use server'
import authAxios from "../axios";
import { cookies } from "next/headers";
import { createSession } from "@/lib/sessions";
import { extractErrorValues } from "@/lib/utils";
import BACKEND_URLS from "@/constants/backend-urls";
import COOKIE_NAMES from "@/constants/cookies-names";
import { BaseResponse, LoginResponse } from "@/types";
import { deleteCookie, setCookie } from "@/lib/cookies";
import COOKIE_TIME from "@/constants/cookies-time";

export async function login(data: any) {
    const fetcherConfig = {
        url: BACKEND_URLS.LOGIN,
        body: JSON.stringify(data),
        method: "post"
    }
    const response: LoginResponse = await fetcher(fetcherConfig)
    if ("success" in response) {
        if (!response.success) {
            return { "error": true, "message": response.message }
        } else {
            await authorize(response)
            return { "error": false, "message": response.message }
        }
    } else {
        return { "error": true, "message": extractErrorValues(response) }
    }
}
export async function install_user(installationId: string) {

    try {
        const { data } = await (await authAxios()).post(`${BACKEND_URLS.GITHUB_INSTALLATION}`, JSON.stringify({ "installation_id": installationId }));
        if ("success" in data && data.success) {
            return { "error": false, "message": data.message }
        }
        if ("success" in data && !data.success) {
            return { "error": true, "message": data.message }
        } else {
            return { "error": true, "message": extractErrorValues(data) }
        }
    } catch (error: any) {
        return { "error": true, "message": error?.response?.data?.detail ?? error?.response?.data?.message ?? error?.message }
    }
}
export async function sign_up(data: any) {
    const fetcherConfig = {
        url: BACKEND_URLS.SIGNUP,
        body: JSON.stringify(data),
        method: "post"
    }
    const response: BaseResponse = await fetcher(fetcherConfig)
    if ("success" in response) {
        if (!response.success) {
            return { "error": true, "message": response.message }
        } else {
            return { "error": false, "message": response.message }
        }
    } else {
        return { "error": true, "message": extractErrorValues(response) }
    }
}
export async function new_github_access_token() {
    const { data } = await (await authAxios()).post(BACKEND_URLS.NEW_GITHUB_ACCESS_TOKEN);
    if ("success" in data && data.success) {
        setCookie(COOKIE_NAMES.GITHUB_PRIVATE_ACCESS_TOKEN, data.message, { maxAge: COOKIE_TIME.GITHUB_PRIVATE_ACCESS, path: "/" })
        return data.message as string
    } else {
        return ''
    }
}

export async function verify_email(data: any) {
    const fetcherConfig = {
        url: BACKEND_URLS.EMAIL_VERIFICATION,
        body: JSON.stringify(data),
        method: "post"
    }
    const response: LoginResponse = await fetcher(fetcherConfig)
    if ("success" in response) {
        if (!response.success) {
            return { "error": true, "message": response.message }
        } else {
            await authorize(response)
            return { "error": false, "message": response.message }
        }
    } else {
        return { "error": true, "message": extractErrorValues(response) }
    }
}
export async function logout() {
    await deleteCookie('session')
    await deleteCookie(COOKIE_NAMES.REFRESH_TOKEN)
    await deleteCookie(COOKIE_NAMES.ACCESS_TOKEN)
    return true
}

type FetcherConfigType = { url: string; token?: string; method?: string; body?: any; };

const fetcher = async (config: FetcherConfigType) => {
    const { url, token, method, body } = config;

    let authorizationHeader = {};
    if (token) {
        authorizationHeader = { 'Authorization': `Bearer ${token}` };
    }
    const response = await fetch(url, {
        method: method || 'GET',
        headers: {
            'Content-Type': 'application/json',
            ...authorizationHeader
        },
        body: body || null
    });
    const data = await response.json();
    return data;
}

const authorize = async (data: LoginResponse) => {
    try {
        cookies().set({ name: COOKIE_NAMES.ACCESS_TOKEN, value: data.tokens.access, maxAge: COOKIE_TIME.ACCESS_TOKEN, path: "/", httpOnly: true, })
        cookies().set({ name: COOKIE_NAMES.REFRESH_TOKEN, value: data.tokens.refresh, maxAge: COOKIE_TIME.REFRESH_TOKEN, path: "/", httpOnly: true })
    } catch (error) {
        const err: any = error
        throw new Error(err.message)
    } finally {
        createSession({ user: data.user })
    }
}
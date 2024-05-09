'use server'
import { BaseResponse, LoginResponse } from "@/types";
import { extractErrorValues } from "@/lib/utils";
import { createSession } from "@/lib/sessions";
import { cookies } from "next/headers";
import { deleteCookie, setCookie } from "@/lib/cookies";
import authAxios from "../axios";

export async function login(data: any) {
    const fetcherConfig = {
        url: "http://127.0.0.1:8000/api/auth/login/",
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
export async function sign_up(data: any) {
    const fetcherConfig = {
        url: "http://127.0.0.1:8000/api/auth/register/",
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
export async function get_new_pvt_access_token() {
    const { data } = await (await authAxios()).post("http://127.0.0.1:8000/api/auth/github/access_token");
    if ("success" in data && data.success) {
        setCookie("__gh.pvte.access_token", data.message, { maxAge: 60*60, path: "/"})
        return data.message as string
    } else {
        return ''
    }
}

export async function verify_email(data: any) {
    const fetcherConfig = {
        url: "http://127.0.0.1:8000/api/auth/verify_email/",
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
export async function logout() {
    await deleteCookie('session')
    await deleteCookie('refresh.token')
    await deleteCookie('access.token')
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
        cookies().set({ name: "access.token", value: data.tokens.access, maxAge: 8 * 60 * 60, path: "/", httpOnly: true, })
        cookies().set({ name: "refresh.token", value: data.tokens.refresh, maxAge: 5 * 24 * 60 * 60, path: "/", httpOnly: true })
    } catch (error) {
        const err: any = error
        throw new Error(err.message)
    } finally {
        createSession({ user: data.user })
    }
}
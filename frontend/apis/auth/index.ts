'use server'
import { BaseResponse, LoginResponse } from "@/types";
import { method } from "lodash";
import { signIn } from "@/auth"
import { extractErrorValues } from "@/lib/utils";

export async function login(data: any) {
    const fetcherConfig = {
        url: "http:127.0.0.1:8000/api/auth/login/",
        body: JSON.stringify(data),
        method: "post"
    }
    const response: LoginResponse = await fetcher(fetcherConfig)
    if (!response.success) {
        return { "error": true, "message": response.message }
    } else {
        let stringifiedResponse = JSON.stringify(response)
        signIn("credentials", { stringifiedResponse, redirect: false })
        return { "error": false, "message": response.message }
    }
}
export async function sign_up(data: any) {
    const fetcherConfig = {
        url: "http:127.0.0.1:8000/api/auth/register/",
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
        return { "error": true, "message": extractErrorValues(response)[0] }
    }
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
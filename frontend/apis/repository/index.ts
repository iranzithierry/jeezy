import { auth } from "@/auth";
import { UrlType, getGithubUrl } from "@/constants/urls";
import { SearchRepoResponse } from "@/types/repos";
import { cookies } from "next/headers";

export async function all(ghToken: string) {
    const fetcherConfig = {
        url: "all_by_languages" as UrlType,
        token: ghToken,
    }
    const data: SearchRepoResponse = await fetcher(fetcherConfig)
    if (data) return data?.items
    return [] 
}
export async function search(query: string) {
    "use server";
    const fetcherConfig = {
        url: "search" as UrlType,
        token: cookies().get('gh.installation.token')?.value,
        params: query
    }
    const data: SearchRepoResponse = await fetcher(fetcherConfig)
    if (data) return data?.items
    return [] 
}
type FetcherConfigType = { url: UrlType; token?: string; params?: string; method?: "post" | "get"; body?: any; };
const fetcher = async (config: FetcherConfigType) => {
    const { url, token, params, method, body } = config;

    const session = await auth();

    if (!session?.user?.username) {
        console.error("No authorization username availale");
        return null

    };

    let authorizationHeader = {};
    if (token) {
        authorizationHeader = { 'Authorization': `Bearer ${token}` };
    }
    try {
        const response = await fetch(getGithubUrl(session?.user?.username, url) + (params || ''), {
            method: method || 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...authorizationHeader
            },
            body: body || null
        });
        try {
            if (!response.ok) return ;
            const data = await response.json();
            return data;
        } catch (error: any) {
            console.error("FETCH ERROR 1:", error.message);
            return null;
        }
    } catch (error: any) {
        console.error("FETCH ERROR 2:", error.message);
        return null;
    }
}

const getClientCookie = (name: string) => {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=');
        if (cookieName === name) {
            return cookieValue;
        }
    }
    return null;
};
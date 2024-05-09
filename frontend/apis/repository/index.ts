import { auth } from "@/auth";
import { UrlType, getGithubUrl } from "@/constants/urls";
import { getSession } from "@/lib/sessions";
import { SearchRepoResponse } from "@/types/repos";
import { cookies } from "next/headers";

export async function all() {
    "use server";
    const fetcherConfig = {
        url: "all_by_languages" as UrlType,
        token: cookies().get('__gh.pvte.access_token')?.value,
    }
    const data: SearchRepoResponse = await fetcher(fetcherConfig)
    if (data) return data?.items
    return [] 
}
export async function search(query: string) {
    "use server";
    const fetcherConfig = {
        url: "search" as UrlType,
        token: cookies().get('__gh.pvte.access_token')?.value,
        params: query
    }
    const data: SearchRepoResponse = await fetcher(fetcherConfig)
    if (data) return data?.items
    return [] 
}
type FetcherConfigType = { url: UrlType; token?: string; params?: string; method?: "post" | "get"; body?: any; };
const fetcher = async (config: FetcherConfigType) => {
    "use server";
    const { url, token, params, method, body } = config;

    const session: any =  await getSession()
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
            if (!response.ok) return null;
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
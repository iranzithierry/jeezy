import { auth } from "@/auth";
import COOKIE_NAMES from "@/constants/cookies-names";
import { UrlType, getGithubUrl } from "@/constants/urls";
import { getSession } from "@/lib/sessions";
import { SearchRepoResponse } from "@/types/repos";
import { cookies } from "next/headers";
import authAxios from "../axios";
import { getCookie } from "@/lib/cookies";
import axios from "axios";

export async function all() {
    "use server";
    const axiosOptions = {
        url: "https://api.github.com/search/repositories?q=language:typescript,javascript,html+user:{username}&type=Repositories",
    }
    const data: SearchRepoResponse = await apiCall(axiosOptions)
    if (data) return data?.items
    return []
}
export async function search(query: string) {
    "use server";
    const axiosOptions = {
        url: "https://api.github.com/search/repositories?q=user:{username}+",
        params: query
    }
    const data: SearchRepoResponse = await apiCall(axiosOptions)
    if (data) return data?.items
    return []
}

type AxiosOptions = { url: string; params?: string; };
const apiCall = async (options: AxiosOptions) => {

    const { url, params } = options;

    const session: any = await getSession()
    if (!session?.user?.installed_github) {
        console.error("User has not installed github");
        return null

    };
    const accessToken = await getCookie(COOKIE_NAMES.GITHUB_PRIVATE_ACCESS_TOKEN);
    console.log(accessToken);
    
    let authorizationHeader = {};
    
    if (accessToken && accessToken.length !== 0) {
        authorizationHeader = { "Authorization": `Bearer ${accessToken}` };
    }
    const dynamicUrl = url.replace("{username}", session.user.username)
    const dynamicOptions = {
        url: dynamicUrl,
        params: params ? params : {},
        method: 'GET',
        ...authorizationHeader
    }
    try {
        const response = await axios.request(dynamicOptions);
        return response.data;
    } catch (error) {
        console.log('error: ', error);
        return {};
    }
}
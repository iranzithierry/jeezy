import ResultPage from './result';
import BACKEND_URLS from "@/constants/backend-urls";
import { AxiosError } from "axios";
import { redirect } from "next/navigation";
import axiosAuth from "@/lib/hooks/use-axios-auth";
import { createSession } from '@/lib/sessions';
import { LoginResponse } from '@/types/auth';


export default function Page({ searchParams }: { searchParams: { installation_id: string } }) {
    return (
        <ResultPage ConnectGithub={ConnectGithub} installation_id={searchParams.installation_id} />
    );
}


export async function ConnectGithub(installationId: string) {
    "use server";
    try {
        const { data }: { data: LoginResponse } = await axiosAuth.post(BACKEND_URLS.GITHUB_INSTALLATION, JSON.stringify({ "installation_id": installationId }))
        if (data?.success) {
            await createSession({ user: data.user })
            return { success: true, message: data.message }
        }
        else {
            return { success: false, message: data.message }
        }
    } catch (err) {
        const error = err as AxiosError
        if (error?.response?.status === 401) {
            return redirect('/refresh?redirect_back=/dashboard')
        }
        // @ts-ignore
        return { success: false, message: error.response?.data?.message ?? error.message }
    }
}
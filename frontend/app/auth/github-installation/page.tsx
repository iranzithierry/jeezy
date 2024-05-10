"use client";
import { toast } from 'sonner';
import { setCookie } from '@/lib/cookies';
import BACKEND_URL from '@/constants/backend-urls';
import React, { useEffect, useCallback, useState } from 'react';
import { LinkButton } from '@/components/ui/link-button';
import { createSession } from '@/lib/server-actions/sessions';
import COOKIE_NAMES from '@/constants/cookies-names';
import authAxios from '@/apis/axios';
import COOKIE_TIME from '@/constants/cookies-time';
import { SpinnerIcon } from '@/components/ui/icons';
import { useRouter } from 'next/navigation';
import { install_user } from '@/apis/auth';

export default function Page({ searchParams }: { searchParams: { installation_id: string } }) {
    const router = useRouter()
    const [status, setStatus] = useState('Processing')
    const installGithubUser = useCallback(async (installationId: string | undefined) => {
        if (installationId && installationId.length !== 0) {
            try {
                const response: { error: boolean, message: string } | any = await install_user(installationId)
                if (response.error) {
                    toast.error(response.message);
                } else {
                    setStatus("Approved")
                    toast.success("Done now you can close this window");
                    setCookie(COOKIE_NAMES.GITHUB_PRIVATE_ACCESS_TOKEN, response.message, { maxAge: COOKIE_TIME.ACCESS_TOKEN, path: "/", httpOnly: true })
                    createSession({ user: response.user }) // to save username
                }
            } catch (error: any) {
                toast.error(error?.response?.data?.detail ?? error?.response?.data?.message ?? error?.message);
            }
        }
    }, []);

    useEffect(() => {
        installGithubUser(searchParams.installation_id);
    }, [searchParams, installGithubUser]);

    return (
        <div className="container relative h-screen flex items-center justify-center">
            <div className="lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 ">
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-5xl font-bold tracking-tight">
                            Installation {status} {status == "Processing" && (<SpinnerIcon className="mr-2 h-4 w-4 animate-spin" />)}
                        </h1>
                        {status == "Approved" && (
                            <>
                                <p className="text-base text-muted-foreground">
                                    Thank you for installing Jeezy&apos;s GitHub App!
                                </p>
                                <div className='mt-8'>
                                    <p className='text-base font-gray-800 max-w-[700px]'>
                                        Your will now be able to deploy Git repositories of your GitHub organization to Jeezy. Make sure to let them know!
                                    </p>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

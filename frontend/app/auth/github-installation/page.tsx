"use client";
import { toast } from 'sonner';
import authAxios from '@/apis/axios';
import { setCookie } from '@/lib/cookies';
import { useSearchParams } from 'next/navigation';
import BACKEND_URL from '@/constants/backend-urls';
import React, { useEffect, useCallback } from 'react';
import { LinkButton } from '@/components/ui/link-button';
import { createSession } from '@/lib/server-actions/sessions';
import COOKIE_NAMES from '@/constants/cookies-names';

export default function Page() {
    const params = useSearchParams();
    const getGitHubToken = useCallback(async (installationId: string | undefined) => {
        if (installationId && installationId.length !== 0) {
            try {
                const body = { "installation_id": installationId };
                const { data } = await (await authAxios()).post(`/backend-api/${BACKEND_URL.GITHUB_INSTALLATION}`, JSON.stringify(body));
                if ("success" in data && data.success) {
                    toast.success("Done now you can close this pop up");
                    setCookie(COOKIE_NAMES.ACCESS_TOKEN, data.message, {maxAge: COOKIE_TIME.ACCESS_TOKEN, path: "/", httpOnly: true})
                    createSession({user: data.user})
                }
                if ("success" in data && !data.success) {
                    toast.error(data.message);
                }
            } catch (error: any) {
                toast.error(error?.response?.data?.detail ?? error?.response?.data?.message ?? error?.message );
            }
        }
    }, []);

    useEffect(() => {
        const installationId = params.getAll("installation_id")[0];
        getGitHubToken(installationId);
    }, [params]);

    return (
        <div className="container relative h-screen flex items-center justify-center">
            <div className="lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 ">
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-5xl font-bold tracking-tight">
                            Installation Approved
                        </h1>
                        <p className="text-base text-muted-foreground">
                            Thank you for installing Jeezy&apos;s GitHub App!
                        </p>
                        <div className='mt-8'>
                            <p className='text-base font-gray-800 max-w-[700px]'>
                                Your will now be able to deploy Git repositories of your GitHub organization to Jeezy. Make sure to let them know!
                            </p>
                        </div>
                        <div className='mt-6'>
                            <LinkButton size={'lg'} linkTo='/dashboard'>
                                Dashboard
                            </LinkButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

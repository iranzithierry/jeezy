"use client";
import authAxios from '@/apis/axios';
import { LinkButton } from '@/components/ui/link-button';
import { useSearchParams } from 'next/navigation'
import React from 'react'
import { useEffect } from 'react';
import { toast } from "sonner"


export default function Page() {
    const params = useSearchParams()
    const getGitHubToken = async (installationId: string | undefined) => {
        if (installationId !== undefined && installationId?.length !== 0) {
            try {
                let body = { "installation_id": installationId };
                const { data } = await authAxios.post("/api/auth/github/installation", JSON.stringify(body))
                if (!data.message.startWith("ghs")) {
                    toast(data.message)
                } else {
                    toast.success("Success")
                }
            } catch (error: any) {
                toast.error(error?.message)
            }
        }
    };
    useEffect(() => {
        getGitHubToken(params.getAll("installation_id")[0])
    }, [])

    return (
        <div className="container relative  h-screen flex items-center justify-center">
            <div className="lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 ">
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-5xl font-bold tracking-tight">
                            Installation Approved
                        </h1>
                        <p className="text-base text-muted-foreground">
                            Thank you for installing Jeezy's GitHub App!
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
    )
}


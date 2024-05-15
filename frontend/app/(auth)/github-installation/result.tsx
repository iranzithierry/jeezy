"use client";
import React, { useEffect, useState } from 'react';
import { SpinnerIcon } from '@/components/ui/icons';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function ResultPage({ ConnectGithub, installation_id }: { ConnectGithub: (installationId: string) => Promise<{ success: boolean; message: any; }>, installation_id: string }) {
    const router = useRouter()
    const [status, setStatus] = useState('Processing')

    if (installation_id && installation_id.length !== 0) {
        useEffect(() => {
            async function connectGithub() {
                const { success, message }: { success: boolean; message: any; } = await ConnectGithub(installation_id)
                if(success){
                    toast.success(message)
                    setStatus("Approved")
                }else{
                    toast.error(message)
                    setStatus("Failed")
                }
            }
            connectGithub()
        }, [])
    }

    return (
        <div className="container relative h-screen flex items-center justify-center">
            <div className="lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 ">
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-5xl font-bold tracking-tight mx-auto flex items-center">
                            Installation {status} {status === "Processing" && <SpinnerIcon className="ml-2 h-8 w-8 animate-spin stroke-zinc-950" />}
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

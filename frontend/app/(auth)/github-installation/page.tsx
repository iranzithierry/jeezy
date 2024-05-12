"use client";
import React, {useState } from 'react';
import { SpinnerIcon } from '@/components/ui/icons';
import { useRouter } from 'next/navigation';

export default function Page({ searchParams }: { searchParams: { installation_id: string } }) {
    const router = useRouter()
    const [status, setStatus] = useState('Processing')

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

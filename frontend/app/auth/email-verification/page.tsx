"use client";
import { toast } from "sonner";
import React, { useState, useEffect } from "react";
import { Form } from "@/components/auth/form";
import FormSkeleton from "@/components/auth/form-skeleton";
import { useRouter } from "next/navigation";

export default function EmailVerificationPage({ searchParams }: { searchParams: { token: string, email: string } }) {
    const [error, setError] = useState('');
    const router = useRouter()
    useEffect(() => {
        if (!searchParams?.token) {
            toast.error("You can't verify your email address without a verification token.")
            setError("You can't verify your email address without a verification token.")
        }
        if (!searchParams?.email) {
            toast.error("Something went wrong. Please try again or resend the email verification link")
            setError("Please try again or resend the email verification link")
        }
        if (!searchParams?.email?.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)){
            toast.error("Invalid email address")
            setError("Invalid email address")
        }
    }, [searchParams]);

    const extra_data = { "token": searchParams.token, "email": searchParams.email }

    const handleCallback = async (email: string) => {
        router.push('/dashboard')
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen gap-6">
            {error.length < 1 ? (
                <>
                    <div className="space-y-2 text-center">
                        <h1 className="text-3xl font-bold">Pending Email Verification</h1>
                        <p className="text-gray-500 dark:text-gray-400">
                            Thank you for verifying your email address. To complete your sign up, please fill out the remaining
                            registration form.
                        </p>
                    </div>
                    <React.Suspense fallback={<FormSkeleton />}>
                        <Form type="verify_email" withGithub={false} extraData={extra_data}  callback={handleCallback}/>
                    </React.Suspense>
                </>
            ): (
                <div className="space-y-2 text-center">
                        <h1 className="text-3xl font-bold">Something went wrong</h1>
                        <p className="text-gray-500 dark:text-gray-400">
                            {error}
                        </p>
                    </div>
            )}
        </div>
    )
}

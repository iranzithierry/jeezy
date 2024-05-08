"use client";
import { UserAuthForm } from "@/components/auth/user-auth-form"
import { useSearchParams } from "next/navigation"
import { toast } from "sonner";
import React, { useState, useEffect } from "react";
import AuthLoadingSkeleton from "@/components/auth/auth-loading-skeleton";

export default function EmailVerificationPage() {
    const params = useSearchParams();
    const [errorInToken, setErrorInToken] = useState('');

    const verification_email = params.getAll("email")[0]
    const verification_token = params.getAll("token")[0]
    useEffect(() => {
        if (!verification_token) {
            toast.error("You can't verify your email address without a verification token.")
            setErrorInToken("You can't verify your email address without a verification token.");
        }
        if (!verification_email) {
            toast.error("Something went wrong. Please try again or resend the email verification link")
            setErrorInToken("Something went wrong. Please try again or resend the email verification link");
        }
        if (!verification_email.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)){
            toast.error("Invalid email address")
            setErrorInToken("You are using link with invalid email address");
        }
        // Set errorInToken based on conditions
    }, [params]);

    const extra_data = { "token": verification_token, "email": verification_email }

    return (
        <div className="flex flex-col items-center justify-center h-screen gap-6">
            {errorInToken.length < 1 ? (
                <>
                    <div className="space-y-2 text-center">
                        <h1 className="text-3xl font-bold">Pending Email Verification</h1>
                        <p className="text-gray-500 dark:text-gray-400">
                            Thank you for verifying your email address. To complete your sign up, please fill out the remaining
                            registration form.
                        </p>
                    </div>
                    <React.Suspense fallback={<AuthLoadingSkeleton />}>
                        <UserAuthForm type="verify_email" withGithub={false} extraData={extra_data} />
                    </React.Suspense>
                </>
            ): (
                <div className="space-y-2 text-center">
                        <h1 className="text-3xl font-bold">Something went wrong</h1>
                        <p className="text-gray-500 dark:text-gray-400">
                            {errorInToken}
                        </p>
                    </div>
            )}
        </div>
    )
}

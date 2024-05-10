"use client";
import { useState } from "react";
import { LinkButton } from "../ui/link-button";
import { Form } from "./form";
import { Mail } from "lucide-react";

export default function EmailForm() {
    const [emailSent, setEmailSent] = useState('');
    const handleCallback = (email: string) => {
        setEmailSent(email);
    }
    return (
        <>
            {emailSent ?
                (<div className="flex flex-col items-center justify-center h-screen gap-6" >
                    <div className="space-y-2 text-center">
                        <h1 className="text-3xl font-bold">Email Verification Sent</h1>
                        <p className="text-gray-500 dark:text-gray-400">
                            We&apos;ve sent a verification email to your inbox. Please check your email and click the link to verify your
                            account.
                        </p>
                    </div>
                    <LinkButton target="_blank" linkTo="https://mail.google.com/mail/u/0/#inbox" variant={'outline'}>
                        <Mail className="h-4 w-4 mr-2" />
                        Check Inbox
                    </LinkButton>
                </div >
                ) :
                (<Form callback={handleCallback} />)}
        </>
    )
}
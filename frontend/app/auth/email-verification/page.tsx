
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { UserAuthForm } from "@/components/auth/user-auth-form"

export default function Component() {
    return (
        <div className="flex flex-col items-center justify-center h-screen gap-6">
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold">Email Verified</h1>
                <p className="text-gray-500 dark:text-gray-400">
                    Thank you for verifying your email address. To complete your sign up, please fill out the remaining
                    registration form.
                </p>
            </div>
            <UserAuthForm type="complete" withGithub={false}  />
        </div>
    )
}
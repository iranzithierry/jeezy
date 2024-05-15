import Link from "next/link"
import { Metadata } from "next"
import { LinkButton } from "@/components/ui/link-button"
import EmailForm from "@/components/auth/email-form"
import { LoginResponse } from "@/types/auth"
import axios from "axios"
import BACKEND_URLS from "@/constants/backend-urls"
import { authenticate } from "@/lib/sessions"
import { redirect } from "next/navigation"
import { BaseResponse } from "@/types/http"

export const metadata: Metadata = {
    title: "Sign up",
}

export default function SignUp() {
    return (
        <>
            <div className="absolute top-0 right-0 p-4 z-20">
                <LinkButton linkTo="/login" variant={'outline'}>
                    Login
                </LinkButton>
            </div>
            <div className="container relative  h-screen flex items-center justify-center">
                <div className="lg:p-8">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6">
                        <div className="flex flex-col space-y-2 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight">
                                Create an account
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Enter your email below to create your account
                            </p>
                        </div>
                        <EmailForm submitHandler={submitHandler} otpSubmitHandler={otpSubmitHandler} />
                        <div className="sm:w-[400px] mx-auto">
                            <p className="px-8 text-center text-sm text-muted-foreground">
                                By clicking continue, you agree to our{" "}
                                <Link href="/terms" className="underline underline-offset-4 hover:text-primary" >
                                    Terms of Service
                                </Link>
                                {" "}and{" "}
                                <Link href="/privacy" className="underline underline-offset-4 hover:text-primary" >
                                    Privacy Policy
                                </Link>.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
const submitHandler = async (userData: { email: string }) => {
    "use server";
    try {
        const { data }: { data: BaseResponse } = await axios.post(BACKEND_URLS.SIGNUP, userData)
        if (!data.success) {
            return { "error": true, "message": data.message }
        } else {
            return { "error": false, "message": data.message }
        }
    } catch (error: any) {
        return { "error": true, "message": error?.response?.data?.detail ?? error?.response?.data?.email ?? error?.response?.data?.message ?? error?.message }
    }
}
const otpSubmitHandler = async (userData: { name: string, password: string, otp: string }) => {
    "use server";
    try {
        const { data }: { data: LoginResponse } = await axios.post(BACKEND_URLS.EMAIL_VERIFICATION, userData)
        if (!data.success) {
            return { "error": true, "message": data.message }
        } else {
            try {
                await authenticate(data)
            } catch (error) {
                return { "error": true, "message": "Something goes wrong with our end." }
            } finally {
                return { "error": false, "message": "Done" }
            }
        }
    } catch (error: any) {
        return { "error": true, "message": error?.response?.data?.detail ?? error?.response?.data?.message ?? error?.response?.data?.email ?? error?.message }
    }
}
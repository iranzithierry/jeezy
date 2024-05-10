import { Metadata } from "next"
import { Form } from "@/components/auth/form"
import { LinkButton } from "@/components/ui/link-button"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
    title: "Login",
}

export default async function LoginPage() {
    const handleCallback = async (response: any) => {
        "use server";
        redirect('/dashboard')
    }
    return (
        <>
            <div className="absolute top-0 right-0 p-4 z-20">
                <LinkButton linkTo="/auth/signup" variant={'outline'}>
                    Sign up
                </LinkButton>
            </div>
            <div className="container relative  h-screen flex items-center justify-center">
                <div className="lg:p-8">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        <div className="flex flex-col space-y-2 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight">
                                Login
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Enter your email below to login  your account
                            </p>
                        </div>
                        <Form type="signin" callback={handleCallback} />
                    </div>
                </div>
            </div>
        </>
    )
}

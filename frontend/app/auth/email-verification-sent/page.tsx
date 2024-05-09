import { LinkButton } from "@/components/ui/link-button"
export default function Page() {
    return (
        <div className="flex flex-col items-center justify-center h-screen gap-6">
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold">Email Verification Sent</h1>
                <p className="text-gray-500 dark:text-gray-400">
                    We&apos;ve sent a verification email to your inbox. Please check your email and click the link to verify your
                    account.
                </p>
            </div>
            <LinkButton linkTo="/dashboard" variant={'outline'}>
                Return to Dashboard
            </LinkButton>
        </div>
    )
}
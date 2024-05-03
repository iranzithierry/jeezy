
import { BotIcon } from "@/components/icons"
import Link from "next/link"

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-[100dvh] gap-6">
            <BotIcon className="w-32 h-32 text-gray-500 dark:text-gray-400" />
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold">Oops! Page not found.</h1>
                <p className="text-gray-500 dark:text-gray-400">The page you're looking for doesn't exist.</p>
            </div>
            <Link
                className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                href="/"
            >
                Go to Home
            </Link>
        </div>
    )
}

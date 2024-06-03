/**
 * v0 by Vercel.
 * @see https://v0.dev/t/Cks2JGVfpKE
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LinkButton } from "../ui/link-button"

export default function MaintenancePage() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-100 px-4 dark:bg-gray-900">
      <div className="max-w-3xl space-y-8 text-center">
        <div className="flex items-center justify-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50">Jeezy</h1>
        </div>
        <div className="space-y-4">
          <p className="text-gray-500 dark:text-gray-400">
            Our platform is currently undergoing scheduled maintenance. We apologize for the inconvenience and expect to
            be back up and running shortly.
          </p>
          <div className="flex items-center justify-center gap-4">
           <LinkButton linkTo="/github">
           <GithubIcon className="mr-2 h-4 w-4" />
              Contribute on GitHub</LinkButton>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 md:gap-6 text-center sm:text-left">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Features</h2>
            <ul className="list-none sm:list-disc pl-6 text-gray-500 dark:text-gray-400">
              <li>Built with Next.js</li>
              <li>Integrated with Django backend</li>
              <li>Responsive and accessible design</li>
              <li>Open source and community-driven</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">About Jeezy</h2>
            <p className="text-gray-500 dark:text-gray-400">
              Jeezy is a powerful and flexible platform that helps teams of all sizes build, test, and deploy
              high-quality web applications. With its intuitive interface and robust features, Jeezy makes it easy to
              manage your projects and collaborate with your team.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function GithubIcon({...props}) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}

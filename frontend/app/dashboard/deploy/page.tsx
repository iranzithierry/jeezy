import { User } from '@/types'
import { getCookie } from '@/lib/cookies'
import { getSession } from '@/lib/sessions'
import ReposList from '@/components/repos-list'
import { all, search } from '@/apis/repository'
import COOKIE_NAMES from '@/constants/cookies-names'
import { new_github_access_token } from '@/apis/auth'
import InstallGithub from '@/components/dashboard/subs/install-github'

export default async function Page() {
    const repos = await all()
    console.log(repos);
    
    return (<Content repos={repos} />)
}
async function Content({ repos = [] }: { repos: any }) {
    "use client";
    const session = await getSession("session")
    const user = session?.user as User
    if (user?.installed_github) {
        const currentAccessToken = await getCookie(COOKIE_NAMES.GITHUB_PRIVATE_ACCESS_TOKEN)
        if (!currentAccessToken) {
            await new_github_access_token()
        }
    }
    return (
        <main className="items-center flex h-full flex-col">
            <div className="max-w-6xl w-full mx-auto grid gap-2">
                <h1 className="font-semibold text-3xl">Let&apos;s build something new.</h1>
                <p className='max-w-[600px] text-gray-500 text-sm/relaxed dark:text-gray-400 text-left'>
                    To deploy a new Project, import an existing Git Repository .
                </p>
            </div>
            {user?.installed_github ?
                (<ReposList repos={repos} search={search} />):
                (<InstallGithub />) 
            }
        </main >
    )
}
import React from 'react'
import ReposList from './components/repos-list'
import Installation from './components/installation'
import { all, search } from '@/apis/repository'
import { cookies } from 'next/headers'
import { Repo } from '@/types/repos'

export default async function Page() {
    let repositories: Repo[] = []
    const ghToken = cookies().get("gh.installation.token")?.value
    if (ghToken && ghToken.length !== 0) {
        repositories = await all(ghToken)
    }

    return (
        <main className="flex min-h-[calc(100vh_-_theme(spacing.16))]  flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10 dark:bg-gray-800/40">
            <div className="max-w-6xl w-full mx-auto grid gap-2">
                <h1 className="font-semibold text-3xl">Let&apos;s build something new.</h1>
                <p className='max-w-[600px] text-gray-500 text-sm/relaxed dark:text-gray-400 text-left'>
                    To deploy a new Project, import an existing Git Repository .
                </p>
            </div>

            {ghToken && ghToken.length !== 0 ?
                (<ReposList repos={repositories} search={search} />) :
                (<Installation />)
            }
        </main >
    )
}

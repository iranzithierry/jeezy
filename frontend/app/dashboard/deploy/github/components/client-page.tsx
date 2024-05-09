"use client";
import React, { useEffect, useState } from 'react'
import ReposList from './repos-list'
import Installation from './installation'
import { Repo } from '@/types/repos'
import { get_new_pvt_access_token } from '@/apis/auth'
import { getCookie } from '@/lib/cookies'

export default function ClientPage({ search, repos }: { search: Function, repos: Repo[] }) {
    const [repositories, setRepositories] = useState<Repo[]>(repos);
    useEffect(() => {
        const get = async () => {
            const currentAccessToken = await getCookie("__gh.pvte.access_token")
            if (!currentAccessToken) {
                await get_new_pvt_access_token()
            }
        }
        get()
    }, [])
    return (
        <main className="flex min-h-[calc(100vh_-_theme(spacing.16))]  flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10 dark:bg-gray-800/40">
            <div className="max-w-6xl w-full mx-auto grid gap-2">
                <h1 className="font-semibold text-3xl">Let&apos;s build something new.</h1>
                <p className='max-w-[600px] text-gray-500 text-sm/relaxed dark:text-gray-400 text-left'>
                    To deploy a new Project, import an existing Git Repository .
                </p>
            </div>
            {repositories && repositories.length !== 0 ?
                (<ReposList repos={repositories} search={search} />) :
                (<Installation />)
            }
        </main >
    )
}

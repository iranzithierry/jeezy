import React, { Suspense } from 'react'
import { Metadata } from 'next'
import { ProjectsTable } from '@/components/dashboard/projects-table'
import BACKEND_URLS from '@/constants/backend-urls'
import useAxiosAuth from '@/lib/hooks/use-axios-auth'
import { AxiosError } from 'axios'
import { redirect } from 'next/navigation'
import { getSession } from '@/lib/sessions'
import { LinkButton } from '@/components/ui/link-button'

export const metadata: Metadata = {
    title: "Dashboard",
}

export default async function Dashboard() {
    const session = await getSession()
    const projects = session?.user.installed_github ? await getProjects() : []

    return (
        <main className="flex min-h-[calc(100vh_-_theme(spacing.16))]  flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
            <div className="max-w-6xl w-full mx-auto grid gap-2">
                <h1 className="font-semibold text-3xl">Overview</h1>
            </div>
            {session?.user.installed_github ? 
                (<ProjectsTable projects={projects} />) :
                (<div className='w-full justify-center flex items-center flex-1'>
                    <LinkButton linkTo='/dashboard/connect_github'>Create your first project</LinkButton>
                </div>)
            }
        </main>
    )


}
async function getProjects() {
    try {
        const { data } = await useAxiosAuth.get(BACKEND_URLS.PROJECTS)
        return data.data
    } catch (err) {
        const error = err as AxiosError
        if (error?.response?.status === 401) {
            return redirect('/refresh?redirect_back=/dashboard')
        }
    }
}
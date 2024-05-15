import React, { Suspense } from 'react'
import { Metadata } from 'next'
import { ProjectsTable } from '@/components/dashboard/projects-table'
import BACKEND_URLS from '@/constants/backend-urls'
import useAxiosAuth from '@/lib/hooks/use-axios-auth'
import { AxiosError } from 'axios'
import { redirect } from 'next/navigation'

export default async function Dashboard() {
    const projects = await getProjects()

    return (
        <main className="flex min-h-[calc(100vh_-_theme(spacing.16))]  flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
            <div className="max-w-6xl w-full mx-auto grid gap-2">
                <h1 className="font-semibold text-3xl">Overview</h1>
            </div>
            <div className="grid gap-6 max-w-6xl w-full mx-auto">
                <ProjectsTable projects={projects} />
            </div>
        </main>
    )


}
async function getProjects() {
    try {
        const { data } = await useAxiosAuth.get(BACKEND_URLS.PROJECTS)
        return data
    } catch (err) {
        const error = err as AxiosError
        if (error?.response?.status === 401) {
            return redirect('/refresh?redirect_back=/dashboard')
        }
    }
}
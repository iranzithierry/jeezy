import React, { Suspense, useState } from 'react'
import BACKEND_URLS from '@/constants/backend-urls'
import useAxiosAuth from '@/lib/hooks/use-axios-auth'
import { BaseResponse } from '@/types/http'
import { extractErrorValues } from '@/lib/utils'
import { ProjectsResponse } from '@/types/projects-response'
import dynamic from 'next/dynamic'
import { CardTitle, CardDescription, CardHeader, Card } from "@/components/ui/card"
import EnvSettings, { EnvsType } from '@/components/dashboard/forms/env-settings'
import BuildSettings from '@/components/dashboard/forms/build-settings'

export default async function Page({ params }: { params: { id: string } }) {
    const project: ProjectsResponse = await getProject(params.id)
    const ProjectSettings = dynamic(() => import('@/components/dashboard/forms/project-settings'), {
        loading: () => <p>Loading...</p>,
    })
    
    return (
        <div className='space-y-2'>
            <Card>
                <CardHeader>
                    <CardTitle>Project Settings</CardTitle>
                    <CardDescription>Configure your project settings.</CardDescription>
                </CardHeader>
                <ProjectSettings  submitHandler={submitHandler} project={project.name} repository={project.git_repository} />
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Environment Variables</CardTitle>
                    <CardDescription>Set environment variables for your project.</CardDescription>
                </CardHeader>
                <EnvSettings submitHandler={submitHandler} />
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Build Settings</CardTitle>
                    <CardDescription>Configure your build settings.</CardDescription>
                </CardHeader>
                <BuildSettings submitHandler={submitHandler} />
            </Card>
        </div>)
}
const submitHandler = async (formData: any, type: string) => {
    "use server";
    try {
        const { data }: { data: BaseResponse } = await useAxiosAuth.post(BACKEND_URLS.CREATE_PROJECTS + type, formData)
        return data;
    } catch (error: any) {
        return { "success": false, "message": error?.response?.data?.detail ?? extractErrorValues(error?.response?.data) ?? error?.response?.data?.message ?? error?.message }
    }
}
const getProject = async (id: string) => {
    "use server";
    try {
        const { data }: { data: { success: boolean, data: any } } = await useAxiosAuth.get(BACKEND_URLS.RETREIVE_PROJECT + id + "/")
        console.log(data, BACKEND_URLS.RETREIVE_PROJECT + id + "/");
        return data.data;
    } catch (error: any) {
        return { "success": false, "data": error?.response?.data?.detail ?? error?.response?.data?.data ?? error?.message }
    }
}
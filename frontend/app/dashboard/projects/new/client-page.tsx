"use client"
import React, { useEffect, useState } from 'react'
import { CardTitle, CardDescription, CardHeader, Card } from "@/components/ui/card"
import ProjectSettings from '@/components/dashboard/forms/project-settings'
import EnvSettings from '@/components/dashboard/forms/env-settings'
import BuildSettings from '@/components/dashboard/forms/build-settings'
import BACKEND_URLS from '@/constants/backend-urls'
import useAxiosAuth from '@/lib/hooks/use-axios-auth'
import { AxiosError } from 'axios'
import { BaseResponse } from '@/types/http'
import { extractErrorValues } from '@/lib/utils'
import { ProjectsResponse } from '@/types/projects-response'

export default function ClientPage({ submitHandler, project }: { submitHandler: (formData: any, type: string) => Promise<{success: boolean; message: any;}>, project: any , envs: any,  builds: any }) {
    const [currentProjectId, setProjectId] = useState(null)
    useEffect(() => {
        setProjectId(project?.id)
    },[project])
    return (
        <div className="grid gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Project Settings</CardTitle>
                    <CardDescription>Configure your project settings.</CardDescription>
                </CardHeader>
                <ProjectSettings currentProjectId={currentProjectId} submitHandler={submitHandler} project={project} repository={project} />
            </Card>
            {/* <Card>
                <CardHeader>
                    <CardTitle>Environment Variables</CardTitle>
                    <CardDescription>Set environment variables for your project.</CardDescription>
                </CardHeader>
                <EnvSettings currentProjectId={currentProjectId} submitHandler={submitHandler} />
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Build Settings</CardTitle>
                    <CardDescription>Configure your build settings.</CardDescription>
                </CardHeader>
                <BuildSettings currentProjectId={currentProjectId} submitHandler={submitHandler} />
            </Card> */}
        </div>
    )
}
"use client"
import React, { useEffect, useState } from 'react'
import { CardTitle, CardDescription, CardHeader, Card } from "@/components/ui/card"
import ProjectSettings from '@/components/dashboard/forms/project-settings'
import EnvSettings, { EnvsType } from '@/components/dashboard/forms/env-settings'
import BuildSettings from '@/components/dashboard/forms/build-settings'
import BACKEND_URLS from '@/constants/backend-urls'
import useAxiosAuth from '@/lib/hooks/use-axios-auth'
import { AxiosError } from 'axios'
import { BaseResponse } from '@/types/http'
import { extractErrorValues } from '@/lib/utils'
import { ProjectsResponse } from '@/types/projects-response'

export default function ClientPage({ submitHandler, project, envs, builds }: { submitHandler: (formData: any, type: string) => Promise<{success: boolean; message: any;}>, project: ProjectsResponse , envs: EnvsType[] | null,  builds: any }) {
    const [currentProjectId, setProjectId] = useState(null)
    // @ts-ignore
    useEffect(() => setProjectId(project?.id),[project])
    return (
        <div className="grid gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Project Settings</CardTitle>
                    <CardDescription>Configure your project settings.</CardDescription>
                </CardHeader>
                <ProjectSettings currentProjectId={currentProjectId} submitHandler={submitHandler} project={project.name} repository={project.repository_source} />
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Environment Variables</CardTitle>
                    <CardDescription>Set environment variables for your project.</CardDescription>
                </CardHeader>
                <EnvSettings envs={envs} submitHandler={submitHandler} />
            </Card>
            {/* <Card>
                <CardHeader>
                    <CardTitle>Build Settings</CardTitle>
                    <CardDescription>Configure your build settings.</CardDescription>
                </CardHeader>
                <BuildSettings currentProjectId={currentProjectId} submitHandler={submitHandler} />
            </Card> */}
        </div>
    )
}
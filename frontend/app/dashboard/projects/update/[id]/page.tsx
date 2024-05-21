import React, { Suspense, useState } from 'react'
import BACKEND_URLS from '@/constants/backend-urls'
import useAxiosAuth from '@/lib/hooks/use-axios-auth'
import { BaseResponse } from '@/types/http'
import { extractErrorValues } from '@/lib/utils'
import { ProjectsResponse } from '@/types/projects-response'
import dynamic from 'next/dynamic'

export default async function Page({ params }: {params: {id: string}}) {
    const project: ProjectsResponse = await getProject(params.id)
    // const ClientPage = dynamic(() => import('./client-page'), {
    //     loading: () => <p>Loading...</p>,
    //   })
    return (
    <div>
        <Suspense fallback={<p>Loading ...</p>}>
            Project {project?.name}
            {/* <ClientPage submitHandler={submitHandler} project={project}/> */}
        </Suspense>
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
        const { data }: { data: { success: boolean, data: any} } = await useAxiosAuth.get(BACKEND_URLS.RETREIVE_PROJECT + id+"/")
        return data.data;
    } catch (error: any) {
        return { "success": false, "data": error?.response?.data?.detail ?? error?.response?.data?.data ?? error?.message }
    }
}
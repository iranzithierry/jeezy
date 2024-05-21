"use client";
import React from 'react'
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { CardContent, CardFooter } from "@/components/ui/card"
import SubmitButton from '@/components/ui/submit-button'

export default function ProjectSettings({ project, repository, submitHandler, currentProjectId }: { project: string, repository: string, submitHandler: (formData: any, type: string) => Promise<{ success: boolean; message: any; }>, currentProjectId: string | null }) {
    const [submitting, setSubmitting] = React.useState<boolean>(false)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (data: any) => {
        setSubmitting(true)
        const response = await submitHandler(data, "basic")
        if (response) {
          const { success, message } = response
          !success ? toast.error(message) : toast.success("Saved")
        }
        setSubmitting(false)
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent>
                <div className="space-y-2">
                    <Label htmlFor="project-name">Project Name</Label>
                    <Input disabled={submitting} id="project-name" placeholder="Enter project name" defaultValue={project}
                        {...register('project_name', { required: { value: true, message: "Project name is required" } })}
                    />
                    {/* @ts-ignore */}
                    {errors.project_name && <span className="mt-2 text-xs font-medium leading-none text-red-500">{errors?.project_name?.message}</span>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="git-repo">Git Repository</Label>
                    <Input contentEditable={false} id="git-repo" placeholder="Enter Git repository URL" value={repository}
                        {...register('git_repository', { required: { value: true, message: "Git repository is required" } })}
                    />
                    {/* @ts-ignore */}
                    {errors.git_repository && <span className="mt-2 text-xs font-medium leading-none text-red-500">{errors?.git_repository?.message}</span>}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="root-dir">Root Directory</Label>
                    <Input disabled={submitting} id="root-dir" placeholder="Enter root directory"
                        {...register('root_directory', { required: { value: true, message: "Root directory of your project is required" } })}
                    />
                    {/* @ts-ignore */}
                    {errors.root_directory && <span className="mt-2 text-xs font-medium leading-none text-red-500">{errors?.root_directory?.message}</span>}
                </div>
            </CardContent>
            <CardFooter className="border-t p-6">
                <SubmitButton label='save' submitting={submitting} />
            </CardFooter>
        </form>
    )
}

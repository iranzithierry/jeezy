"use client";
import React from 'react'
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { CardContent, CardFooter } from "@/components/ui/card"
import SubmitButton from '@/components/ui/submit-button'
import { Button } from '@/components/ui/button';
import { PlusIcon, TrashIcon } from 'lucide-react';

export default function EnvSettings({ submitHandler }: { submitHandler: (formData: any, type: string) => Promise<{ success: boolean; message: any; }> }) {
    const [submitting, setSubmitting] = React.useState<boolean>(false)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (data: any) => {
        setSubmitting(true)
        // let fullData = { ...data, {"project": loca}}
        const response = await submitHandler(data, "environment_variables")
        if (response) {
            const { success, message } = response
            !success ? toast.error(message) : toast.success("Saved")
            // success && localStorage.setItem("project", message)
        }
        setSubmitting(false)
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="flex flex-col gap-4">
                <div className="grid grid-cols-[1fr_1fr_auto] gap-4">
                    <div>
                        <Input disabled={submitting} placeholder="Key"
                            {...register('key', { required: { value: true, message: "Key is required" } })}
                        />
                        {/* @ts-ignore */}
                        {errors.key && <span className="mt-2 text-xs font-medium leading-none text-red-500">{errors?.key?.message}</span>}
                    </div>
                    <div>
                        <Input disabled={submitting} placeholder="Value"
                            {...register('value', { required: { value: true, message: "Value is required" } })} />
                            {/* @ts-ignore */}
                        {errors.value && <span className="mt-2 text-xs font-medium leading-none text-red-500">{errors?.value?.message}</span>}
                    </div>
                    <div className='flex gap-1'>
                        <Button size="icon" variant="outline">
                            <PlusIcon className="w-5 h-5" />
                        </Button>
                        <Button size="icon" variant="destructive">
                            <TrashIcon className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="border-t p-6">
                <SubmitButton label='save' submitting={false} />
            </CardFooter>
        </form>
    )
}

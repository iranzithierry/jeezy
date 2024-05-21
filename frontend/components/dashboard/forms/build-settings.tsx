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

export default function BuildSettings({ submitHandler, currentProjectId }: { submitHandler: (formData: any, type: string) => Promise<{success: boolean; message: any;}>, currentProjectId: string | null }) {
    const [submitting, setSubmitting] = React.useState<boolean>(false)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (data: any) => {
        
    }
    return (
        <form>
            <CardContent className='grid gap-4'>
                <div className="space-y-2">
                    <Label htmlFor="build-command">Build Command</Label>
                    <Input id="build-command" placeholder="Enter build command" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="output-dir">Output Directory</Label>
                    <Input id="output-dir" placeholder="Enter output directory" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="install-command">Install Command</Label>
                    <Input id="install-command" placeholder="Enter install command" />
                </div>
            </CardContent>
            <CardFooter className="border-t p-6">
                <SubmitButton label='save' submitting={false} />
            </CardFooter>
        </form>
    )
}

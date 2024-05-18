"use client";
import React, { useState } from 'react';
import { toast } from "sonner";
import { useForm, useFieldArray } from "react-hook-form";
import { Input } from '@/components/ui/input';
import { CardContent, CardFooter } from "@/components/ui/card";
import SubmitButton from '@/components/ui/submit-button';
import { Button } from '@/components/ui/button';
import { PlusIcon, TrashIcon } from 'lucide-react';

type EnvsType = {
    key: string,
    value: string
};

export default function EnvSettings({ submitHandler }: { submitHandler: (formData: any, type: string) => Promise<{ success: boolean; message: any; }> }) {
    const [submitting, setSubmitting] = useState<boolean>(false);
    const { register, handleSubmit, control, formState: { errors } } = useForm();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "envs"
    });

    const onSubmit = async (data: any) => {
        setSubmitting(true);
        const current_project = window.localStorage.getItem("project");
        let fullData = { ...data, "project": current_project };
        const response = await submitHandler(fullData, "environment_variables");
        if (response) {
            const { success, message } = response;
            !success ? toast.error(message) : toast.success("Saved");
        }
        setSubmitting(false);
    };

    const handleAddEnv = () => {
        append({ key: "", value: "" });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="flex flex-col gap-4">
                {fields.map((env, index) => (
                    <div key={env.id} className="grid grid-cols-[1fr_1fr_auto] gap-4">
                        <div>
                            <Input
                                disabled={submitting}
                                placeholder="Key"
                                {...register(`envs.${index}.key`, { required: { value: true, message: "Key is required" } })}
                            />
                            {/* @ts-ignore */}
                            {errors.envs?.[index]?.key && <span className="mt-2 text-xs font-medium leading-none text-red-500">{errors.envs[index].key.message}</span>}
                        </div>
                        <div>
                            <Input
                                disabled={submitting}
                                placeholder="Value"
                                {...register(`envs.${index}.value`, { required: { value: true, message: "Value is required" } })}
                            />
                            {/* @ts-ignore */}
                            {errors.envs?.[index]?.value && <span className="mt-2 text-xs font-medium leading-none text-red-500">{errors.envs[index].value.message}</span>}
                        </div>
                        <div className='flex gap-1'>
                            <Button type='button' size="icon" variant="outline" onClick={handleAddEnv}>
                                <PlusIcon className="w-5 h-5" />
                            </Button>
                            <Button type='button' size="icon" variant="destructive" onClick={() => remove(index)}>
                                <TrashIcon className="w-5 h-5" />
                            </Button>
                        </div>
                    </div>
                ))}
                {fields.length === 0 && (
                    <Button type='button' variant="outline" onClick={handleAddEnv}>
                        <PlusIcon className="w-5 h-5 mr-2" /> Add Environment Variable
                    </Button>
                )}
            </CardContent>
            <CardFooter className="border-t p-6">
                <SubmitButton label='Save' submitting={submitting} />
            </CardFooter>
        </form>
    );
}

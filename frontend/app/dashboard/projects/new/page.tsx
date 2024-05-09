"use client";
import React from 'react'
import { CardTitle, CardDescription, CardHeader, CardContent, Card, CardFooter } from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { PlusIcon, TrashIcon } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

export default  function Page({ props }: any) {
    const params = useSearchParams()
    console.log( params.getAll("repository"));
   
    return (
        <div className="grid gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Project Settings</CardTitle>
                    <CardDescription>Configure your project settings.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="grid gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="project-name">Project Name</Label>
                            <Input id="project-name" placeholder="Enter project name" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="git-repo">Git Repository</Label>
                            <Input id="git-repo" placeholder="Enter Git repository URL" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="root-dir">Root Directory</Label>
                            <Input id="root-dir" placeholder="Enter root directory" />
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="border-t p-6">
                    <Button>Save</Button>
                </CardFooter>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Environment Variables</CardTitle>
                    <CardDescription>Set environment variables for your project.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="flex flex-col gap-4">
                        <div className="grid grid-cols-[1fr_1fr_auto] gap-4">
                            <Input placeholder="Name" />
                            <Input placeholder="Value" />
                            <div className='flex gap-1'>
                                <Button size="icon" variant="outline">
                                    <PlusIcon className="w-5 h-5" />
                                </Button>
                                <Button size="icon" variant="destructive">
                                    <TrashIcon className="w-5 h-5" />
                                </Button>
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="border-t p-6">
                    <Button>Save</Button>
                </CardFooter>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Build Settings</CardTitle>
                    <CardDescription>Configure your build settings.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="grid gap-4">
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
                    </form>
                </CardContent>
                <CardFooter className="border-t p-6">
                    <Button>Save</Button>
                </CardFooter>
            </Card>
        </div>
    )
}
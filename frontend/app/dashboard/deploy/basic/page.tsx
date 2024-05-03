import React from 'react'
import { CardTitle, CardDescription, CardHeader, CardContent, Card, CardFooter } from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

export default function Page() {
    return (
        <div className="grid gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Project Settings</CardTitle>
                    <CardDescription>Configure your project settings before deployment.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="grid gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="project-name">Project Name</Label>
                                <Input id="project-name" placeholder="My Project" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="git-url">Git Repository URL</Label>
                                <Input id="git-url" placeholder="https://github.com/user/repo.git" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="build-command">Build Command</Label>
                                <Input id="build-command" placeholder="npm run build" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="output-dir">Output Directory</Label>
                                <Input id="output-dir" placeholder="/dist" />
                            </div>
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

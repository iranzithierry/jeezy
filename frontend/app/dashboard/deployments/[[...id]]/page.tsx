import React, { Suspense } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenuTrigger, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenu, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ChevronDownIcon, EllipsisVertical, GitBranchIcon, GitCommitVerticalIcon } from 'lucide-react'
import { Metadata } from 'next'
import Section from '@/components/layout/section'
import BACKEND_URLS from '@/constants/backend-urls'
import { AxiosError } from 'axios'
import { redirect } from 'next/navigation'
import useAxiosAuth from '@/lib/hooks/use-axios-auth'
import { Deployment } from '@/types/projects-response'
import { timeSince } from '@/lib/utils'

export const metadata: Metadata = {
    title: "Deployments",
}

interface PageProps {
    params: {
        id: string
    }
}

export default async function page({ params }: PageProps) {
    const projectId = params.id || ""
    const deployments: Deployment[] = await getDeployments(projectId)
    return (
        <Section title='Deployments'>
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                <Input placeholder="Search deployments..." type="search" />
                <div className="flex items-center gap-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className="bg-white dark:bg-card" variant="outline">
                                Status
                                <ChevronDownIcon className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuCheckboxItem checked className='flex items-center'>
                                Ready
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem className='flex items-center'>
                                Failed
                            </DropdownMenuCheckboxItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <div className="border rounded-lg overflow-hidden grid gap-4 lg:gap-px">
                {deployments && deployments.map((deployment, _) => (
                    <div key={deployment.id} className="flex flex-col lg:flex-row bg-white text-sm p-2 relative dark:bg-card">
                        <div className="p-2 grid gap-1 flex-1">
                            <div className="font-medium">First deployment</div>
                            <div className="text-gray-500 dark:text-gray-400">
                                Production
                                <Badge className="bg-white dark:bg-card" variant="outline">
                                    Current
                                </Badge>
                            </div>
                        </div>
                        <Separator className="my-2 lg:hidden" />
                        <div className="p-2 flex items-center flex-1">
                            <div className="flex items-start gap-2">
                                <span className="inline-flex w-3 h-3 bg-green-400 rounded-full translate-y-1" />
                                {deployment.status}
                            </div>
                        </div>
                        <Separator className="my-2 lg:hidden" />
                        <div className="p-2 grid gap-1 flex-1">
                            <div className="flex items-center gap-2">
                                <GitBranchIcon className="w-4 h-4" />
                                {deployment.branch}
                            </div>
                            <div className="flex items-center gap-2">
                                <GitCommitVerticalIcon className="w-4 h-4" />
                                <span className="line-clamp-1">{deployment.commit}</span>
                            </div>
                        </div>
                        <Separator className="my-2 lg:hidden" />
                        <div className="p-2 grid gap-1 flex-1">
                            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">{timeSince(deployment.deployed_at)} by iranzithierry</div>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button className="absolute top-4 right-4" size="icon" variant="ghost">
                                    <EllipsisVertical className="w-4 h-4" />
                                    <span className="sr-only">Toggle menu</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>View Deployment</DropdownMenuItem>
                                <DropdownMenuItem>Redeploy</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem disabled>Rollback</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                ))}
            </div>
        </Section>
    )
}
async function getDeployments(projectId?: number | string) {
    try {
        const { data } = await useAxiosAuth.get(BACKEND_URLS.PROJECTS + projectId)
        return data.deployments
    } catch (err) {
        const error = err as AxiosError
        if (error?.response?.status === 401) {
            return redirect('/refresh?redirect_back=/dashboard')
        }
    }
}
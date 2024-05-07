import React, { Suspense } from 'react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PopoverTrigger, PopoverContent, Popover } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { DropdownMenuTrigger, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenu, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CalendarClockIcon, ChevronDownIcon, CloudUpload, GitBranchIcon, GitCommitVerticalIcon, MoveHorizontalIcon } from 'lucide-react'
import { Metadata } from 'next'
import { Card, CardContent } from '@/components/ui/card'
import { LinkButton } from '@/components/ui/link-button'
import Image from 'next/image'

export const metadata: Metadata = {
    title: "Dashboard",
}
export default function Dashboard() {
    return (
        <main className="flex min-h-[calc(100vh_-_theme(spacing.16))]  flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10 dark:bg-gray-800/40">
            <div className="max-w-6xl w-full mx-auto grid gap-2">
                <h1 className="font-semibold text-3xl">Deployments</h1>
            </div>
            <div className="grid gap-6 max-w-6xl w-full mx-auto">
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                    <Input className="bg-white md:flex-1 dark:bg-gray-950" placeholder="Search deployments..." type="search" />
                    <div className="flex items-center gap-4">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button className="bg-white dark:bg-gray-950" variant="outline">
                                    Sort
                                    <ChevronDownIcon className="ml-2 h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuCheckboxItem checked>Sort by activity</DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem>Sort by name</DropdownMenuCheckboxItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
                <div className="border rounded-lg overflow-hidden grid gap-4 lg:gap-px lg:bg-gray-100">
                    <div  className='flex justify-center items-center  p-6 flex-col'>
                    <div className='p-4'>
                        <div className='text-center flex justify-center flex-col'>
                            <Card className='!p-4 w-fit mx-auto'>
                                <CardContent className='flex justify-center items-center !p-0'>
                                    <CloudUpload className='h-8 w-8' />
                                </CardContent>
                            </Card>
                            <h5 className='text-base font-semibold'>
                                Deploy your first project
                            </h5>
                        </div>
                        <p className='max-w-[600px] text-gray-500 text-sm/relaxed dark:text-gray-400 text-center'>
                            Easily deploy your project to Jeezy with a single click. Our platform will handle the rest, ensuring your application is scalable and secure.
                        </p>
                    </div>
                    <div>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button>Import Project</Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[400px] p-4">
                            <div className="grid gap-4">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-lg font-semibold">Deploy to Jeezy</h4>
                                    <Image
                                        alt="Frameworks group"
                                        className="rounded-md"
                                        height="60"
                                        src="/images/templates-group.png"
                                        style={{
                                            aspectRatio: "100/60",
                                            objectFit: "cover",
                                        }}
                                        width="100"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <LinkButton linkTo='/dashboard/deploy/github' variant="outline">Deploy with Github</LinkButton>
                                    <LinkButton linkTo='/dashboard/templates' variant="outline">Deploy with Template</LinkButton>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                    </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

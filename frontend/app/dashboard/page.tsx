import React, { Suspense } from 'react'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PopoverTrigger, PopoverContent, Popover } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { DropdownMenuTrigger, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenu, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CalendarClockIcon, ChevronDownIcon, GitBranchIcon, GitCommitVerticalIcon, MoveHorizontalIcon } from 'lucide-react'
import { Metadata } from 'next'

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
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button className="pl-3 flex-1 bg-white justify-start" variant="outline">
                                    <CalendarClockIcon className="mr-2 h-4 w-4 shrink-0" />
                                    Select Date
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent align="end" className="w-auto p-0">
                                <Calendar mode="range" numberOfMonths={2} />
                            </PopoverContent>
                        </Popover>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button className="bg-white dark:bg-gray-950" variant="outline">
                                    Status
                                    <ChevronDownIcon className="ml-2 h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuCheckboxItem checked>Ready</DropdownMenuCheckboxItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
                <div className="border rounded-lg overflow-hidden grid gap-4 lg:gap-px lg:bg-gray-100">
                    <div className="flex flex-col lg:flex-row bg-white text-sm p-2 relative dark:bg-gray-950">
                        <div className="p-2 grid gap-1 flex-1">
                            <div className="font-medium">AdIqWrked</div>
                            <div className="text-gray-500 dark:text-gray-400">
                                Production
                                <Badge className="bg-white dark:bg-gray-950" variant="outline">
                                    Current
                                </Badge>
                            </div>
                        </div>
                        <Separator className="my-2 lg:hidden" />
                        <div className="p-2 grid gap-1 flex-1">
                            <div className="flex items-start gap-2">
                                <span className="inline-flex w-3 h-3 bg-green-400 rounded-full translate-y-1" />
                                <div>
                                    Ready
                                    <div className="text-gray-500 dark:text-gray-400">2m 35s</div>
                                </div>
                            </div>
                        </div>
                        <Separator className="my-2 lg:hidden" />
                        <div className="p-2 grid gap-1 flex-1">
                            <div className="flex items-center gap-2">
                                <GitBranchIcon className="w-4 h-4" />
                                main
                            </div>
                            <div className="flex items-center gap-2">
                                <GitCommitVerticalIcon className="w-4 h-4" />
                                <span className="line-clamp-1">fix: auth issues for third-party integration</span>
                            </div>
                        </div>
                        <Separator className="my-2 lg:hidden" />
                        <div className="p-2 grid gap-1 flex-1">
                            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">17m ago by shadcn</div>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button className="absolute top-4 right-4" size="icon" variant="ghost">
                                    <MoveHorizontalIcon className="w-4 h-4" />
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
                    <div className="flex flex-col lg:flex-row bg-white text-sm p-2 relative dark:bg-gray-950">
                        <div className="p-2 grid gap-1 flex-1">
                            <div className="font-medium">PMVpfLNj</div>
                            <div className="text-gray-500 dark:text-gray-400">Preview</div>
                        </div>
                        <Separator className="my-2 lg:hidden" />
                        <div className="p-2 grid gap-1 flex-1">
                            <div className="flex items-start gap-2">
                                <span className="inline-flex w-3 h-3 bg-green-400 rounded-full translate-y-1" />
                                <div>
                                    Ready
                                    <div className="text-gray-500 dark:text-gray-400">1m 23s</div>
                                </div>
                            </div>
                        </div>
                        <Separator className="my-2 lg:hidden" />
                        <div className="p-2 grid gap-1 flex-1">
                            <div className="flex items-center gap-2">
                                <GitBranchIcon className="w-4 h-4" />
                                max/logging
                            </div>
                            <div className="flex items-center gap-2">
                                <GitCommitVerticalIcon className="w-4 h-4" />
                                <span className="line-clamp-1">feat: implement action logging</span>
                            </div>
                        </div>
                        <Separator className="my-2 lg:hidden" />
                        <div className="p-2 grid gap-1 flex-1">
                            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">32m ago by maxleiter</div>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button className="absolute top-4 right-4" size="icon" variant="ghost">
                                    <MoveHorizontalIcon className="w-4 h-4" />
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
                    <div className="flex flex-col lg:flex-row bg-white text-sm p-2 relative dark:bg-gray-950">
                        <div className="p-2 grid gap-1 flex-1">
                            <div className="font-medium">YP47Kdjb</div>
                            <div className="text-gray-500 dark:text-gray-400">Preview</div>
                        </div>
                        <Separator className="my-2 lg:hidden" />
                        <div className="p-2 grid gap-1 flex-1">
                            <div className="flex items-start gap-2">
                                <span className="inline-flex w-3 h-3 bg-red-400 rounded-full translate-y-1" />
                                <div>
                                    Failed
                                    <div className="text-gray-500 dark:text-gray-400">4m 22s</div>
                                </div>
                            </div>
                        </div>
                        <Separator className="my-2 lg:hidden" />
                        <div className="p-2 grid gap-1 flex-1">
                            <div className="flex items-center gap-2">
                                <GitBranchIcon className="w-4 h-4" />
                                shadcn/history-sidebar
                            </div>
                            <div className="flex items-center gap-2">
                                <GitCommitVerticalIcon className="w-4 h-4" />
                                <span className="line-clamp-1">feat: implement history sidebar</span>
                            </div>
                        </div>
                        <Separator className="my-2 lg:hidden" />
                        <div className="p-2 grid gap-1 flex-1">
                            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">1 day ago by shadcn</div>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button className="absolute top-4 right-4" size="icon" variant="ghost">
                                    <MoveHorizontalIcon className="w-4 h-4" />
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
                </div>
            </div>
        </main>
    )
}

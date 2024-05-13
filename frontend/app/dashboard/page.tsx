import React, { Suspense } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenuTrigger,DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"
import { ChevronDownIcon} from 'lucide-react'
import { Metadata } from 'next'
import { ProjectsTable } from '@/components/dashboard/projects-table'
export const metadata: Metadata = {
    title: "Dashboard",
}
export default function Dashboard() {
    return (
        <main className="flex min-h-[calc(100vh_-_theme(spacing.16))]  flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
            <div className="max-w-6xl w-full mx-auto grid gap-2">
                <h1 className="font-semibold text-3xl">Overview</h1>
            </div>
            <div className="grid gap-6 max-w-6xl w-full mx-auto">
            <ProjectsTable/>
            </div>
        </main>
    )
}

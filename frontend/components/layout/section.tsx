import { cn } from '@/lib/utils'
import React from 'react'

type SectionProps
export default function Section({ children, title, heading, headingClassLists,  }: { title: string, heading: React.ReactNode, children: React.ReactNode }) {
    return (
        <>
            <div className="max-w-6xl w-full mx-auto grid gap-2">
                <h1 className="font-semibold text-3xl">{title}</h1>
            </div>
            <div className="grid gap-6 max-w-6xl w-full mx-auto">
                <div className={cn("flex items-center gap-2 md:gap-4", headingClassLists)}>
                    {heading}
                </div>
                <div className="border rounded-lg overflow-hidden grid gap-4 lg:gap-px lg:bg-gray-100">
                    <div className="flex flex-col lg:flex-row bg-white text-sm p-2 relative dark:bg-gray-950">
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}

import React from 'react'
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import Nav from './nav'
import Logo from '../logo'

export default function Sidebar() {
    return (
        <div className="hidden border-r bg-muted/40 md:block">
            <div className="flex flex-col h-full max-h-screen gap-2">
                <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                    <Logo/>
                    <Button variant="outline" size="icon" className="w-8 h-8 ml-auto">
                        <Bell className="w-4 h-4" />
                        <span className="sr-only">Toggle notifications</span>
                    </Button>
                </div>
                <div className="flex-1">
                    <Nav />
                </div>
            </div>
        </div>
    )
}

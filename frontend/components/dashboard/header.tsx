"use client";
import React from "react";
import { Menu, Plus, } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import NavItem from "./nav"
import UserMenu from '@/components/layout/user-menu';
import Logo from "../logo";
import NotificationMenu from "../layout/notification-menu";

export default function Header({ session, logout }: { session: any, logout: Function }) {
    return (
        <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
            <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                <Logo />
                <NavItem />
            </nav>
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="shrink-0 md:hidden" >
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <nav className="grid gap-6 text-lg font-medium">
                        <Logo />
                        <NavItem />
                    </nav>
                </SheetContent>
            </Sheet>
            <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                <div className="ml-auto sm:flex-initial space-x-2">
                    <Button>
                        <Plus className="h-5 w-5" />
                        <span className="sr-only">Create New</span>
                        New
                    </Button>
                    <NotificationMenu/>
                </div>
                <UserMenu user={session?.user} logout={logout} />
            </div>
        </header>
    )
}

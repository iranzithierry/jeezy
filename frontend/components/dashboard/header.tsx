import React from "react";
import { Menu, Search, } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import Nav from "./nav"
import UserDropdown from '@/components/layout/user-dropdown';
import { auth } from "@/auth";

export default async function Header() {
    const session = await auth();
    return (
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                        <Menu className="w-5 h-5" />
                        <span className="sr-only">Toggle menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="flex flex-col">
                    <Nav />
                </SheetContent>
            </Sheet>
            <div className="flex-1 w-full">
                <form>
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input type="search" placeholder="Search project/deployments..." className="w-full pl-8 shadow-none appearance-none bg-background md:w-2/3 lg:w-1/3" />
                    </div>
                </form>
            </div>
            <React.Suspense fallback={<div className="flex-1 overflow-auto" />}>
                <UserDropdown session={session} />
            </React.Suspense>
        </header>
    )
}

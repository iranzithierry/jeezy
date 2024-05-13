"use client";
import React from 'react'
import { AlertTriangle, BellDot } from "lucide-react"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"

export default function NotificationMenu() {
    return (
        <Popover>
            <PopoverTrigger className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2'>
                    <BellDot className="h-5 w-5" />
                    <span className="sr-only">Toggle notifications</span>
            </PopoverTrigger>
            <PopoverContent className="w-[28rem]" align="end">
                <Tabs defaultValue="account">
                    <TabsList>
                        <TabsTrigger value="inbox">Inbox</TabsTrigger>
                        <TabsTrigger value="viewed">Viewed</TabsTrigger>
                    </TabsList>
                    <TabsContent value="inbox">
                        <div className="px-2">
                            <div className="flex items-start space-x-4 rounded-md bg-background cursor-pointer hover:bg-accent p-2 text-accent-foreground transition-all">
                                <div>
                                    <div className="bg-muted rounded-full p-2 flex items-center justify-center">
                                        <AlertTriangle className="mt-px h-8 w-8 text-yellow-500" />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium leading-none">Failed Deployment</p>
                                    <p className="text-sm text-muted-foreground">
                                        Jeezy failed to deploy in the Production environment
                                    </p>
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="viewed"></TabsContent>
                </Tabs>
            </PopoverContent>
        </Popover>
    )
}

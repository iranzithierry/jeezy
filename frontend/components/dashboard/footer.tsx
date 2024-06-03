"use client";
import { ClipboardIcon, Share2 } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'
import { LinkButton } from '../ui/link-button'
import { PopoverTrigger, PopoverContent, Popover } from "@/components/ui/popover"
import { toast } from 'sonner'

export default function Footer() {
    return (
        <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6">
            <div className='flex'>
                <Popover>
                    <div className='flex items-stretch gap-4 sm:gap-6'>
                        <PopoverTrigger asChild>
                            <Button variant={'outline'}>
                                <Share2 className='h-4 w-4 mr-2' /> Invite Friend
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent align='start' className="p-4 w-fit">
                            <div className="grid gap-4">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-xs font-semibold">You can invite anyone to Render directly via</h4>
                                </div>
                                <div className="border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 rounded-md px-3 text-sm justify-between flex items-center">
                                    <p className='font-semibold'>https://jeezy.dev/register?referral=thierry</p>
                                    <Button className='!p-0 h-fit' variant={'ghost'} onClick={() => { try { navigator.clipboard.writeText("https://jeezy.dev/register?referral=thierry") } catch (error: any) { toast.error(error.message) } finally { toast.success("Copied") } }}>
                                        <ClipboardIcon className='h-3.5 w-3.5 ml-2' />
                                    </Button>
                                </div>
                            </div>
                        </PopoverContent>
                        <LinkButton variant={'outline'} className='h-full'>
                            Contact Support
                        </LinkButton>
                    </div>
                </Popover>
            </div>
        </footer>
    )
}

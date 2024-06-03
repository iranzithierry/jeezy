import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

export default function Testimonials() {
    return (
        <section className="w-full py-12 md:py-24 lg:py-32 border-t">
            <div className="container px-4 md:px-6">
                <div className="grid gap-10 sm:px-10 md:gap-16 md:grid-cols-2">
                    <div className="space-y-4">
                        <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">Testimonials</div>
                        <h2 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                            What Our Customers Say
                        </h2>
                    </div>
                    <div className="flex flex-col items-start space-y-4">
                        <blockquote className="rounded-md border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-950">
                            <p className="text-gray-500 dark:text-gray-400">
                                &quot;EY&apos;s document management system has been a game-changer for our organization. It has streamlined our
                                workflows and made collaboration a breeze.&quot;
                            </p>
                            <div className="mt-4 flex items-center space-x-4">
                                <Avatar>
                                    <AvatarImage src="/avatars/01.png" />
                                    <AvatarFallback>SD</AvatarFallback>
                                </Avatar>
                                <div>
                                    <div className="font-semibold">Sofia Davis</div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">Head of Operations, Acme Inc.</div>
                                </div>
                            </div>
                        </blockquote>
                        <blockquote className="rounded-md border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-950">
                            <p className="text-gray-500 dark:text-gray-400">
                                &quot;I was hesitant to switch to a new document management system, but EY&apos;s solution has exceeded all my
                                expectations. It&apos;s intuitive, secure, and has saved us so much time.&quot;
                            </p>
                            <div className="mt-4 flex items-center space-x-4">
                                <Avatar>
                                    <AvatarImage src="/avatars/02.png" />
                                    <AvatarFallback>JD</AvatarFallback>
                                </Avatar>
                                <div>
                                    <div className="font-semibold">John Doe</div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">IT Manager, Globex Corporation</div>
                                </div>
                            </div>
                        </blockquote>
                    </div>
                </div>
            </div>
        </section>
    )
}

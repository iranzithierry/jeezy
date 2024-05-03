import React from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import Link from 'next/link'

export default function Subscribe() {
    return (
        <section className="w-full py-12 md:py-24 lg:py-32 border-t">
            <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
                <div className="space-y-3">
                    <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Ready to Get Started?</h2>
                    <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                        Sign up for our VPS platform and start deploying your apps today.
                    </p>
                </div>
                <div className="mx-auto w-full max-w-sm space-y-2">
                    <form className="flex space-x-2">
                        <Input className="max-w-lg flex-1" placeholder="Enter your email" type="email" />
                        <Button type="submit">Submit</Button>
                    </form>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        Sign up to start your free trial.
                        <Link className="underline underline-offset-2" href="#">
                            Terms & Conditions
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    )
}

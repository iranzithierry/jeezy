"use client";
import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { SpinnerIcon } from '@/components/ui/icons'
import { GithubIcon } from '@/components/icons'
export default function Installation() {
    const [authenticating, setAuthenticating] = useState(false)
    const authenticate = () => {
        setAuthenticating(true)
        const windowFeatures = "left=100,top=100,width=520,height=520,popup=yes";
        const handle = window.open("https://github.com/apps/jeezy-dev/installations/new/permissions?target_id=115815954", "_blank", windowFeatures)
        if (!handle) {
            window.open("https://github.com/apps/jeezy-dev/installations/new/permissions?target_id=115815954")
        }
        setAuthenticating(false)
    }
    return (
        <div className="flex justify-center">
            <Card className='max-w-[34rem] w-full'>
                <CardHeader className='text-center'>
                    <CardTitle>Import Git Repository</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 max-h-80 overflow-y-auto">
                        <p className='text-center'>To have access on your github repositories you have to authenticate it.</p>
                        <div className='w-full flex justify-center'>
                            <Button size={'lg'} type="button" onClick={() => authenticate()}>
                                {authenticating ? (
                                    <SpinnerIcon className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                    <GithubIcon className="mr-2 h-4 w-4" />
                                )}
                                {" "}
                                GitHub
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

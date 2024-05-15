"use client";
import { GithubIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { SpinnerIcon } from '@/components/ui/icons'
// import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function PopUp() {
    const [authenticating, setAuthenticating] = useState(false)
    // const router = useRouter()
    const authenticate = () => {
        setAuthenticating(true)
        const windowFeatures = "left=100,top=100,width=820,height=720,popup=yes";
        const handle = window.open("https://github.com/apps/jeezy-dev/installations/new/permissions?target_id=115815954", "_blank", windowFeatures)
        if (!handle) {
            window.open("https://github.com/apps/jeezy-dev/installations/new/permissions?target_id=115815954")
        }
        var timer = setInterval(function () {
            if (handle?.closed) {
                clearInterval(timer);
                setAuthenticating(false)
            }
        }, 1000);
        // implementing socket to check result
    }
    return (
        <div>
            <Button disabled={authenticating} onClick={() => authenticate()} className="mx-auto" variant={'default'}>
                {authenticating ?
                    (<SpinnerIcon className="mr-2 h-4 w-4 animate-spin" />)
                    :
                    (<GithubIcon className="mr-2 h-4 w-4" />)}
                {" "}
                Connect with GitHub
            </Button>
        </div>
    )
}

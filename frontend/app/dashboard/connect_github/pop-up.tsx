"use client";
import { GithubIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { SpinnerIcon } from '@/components/ui/icons'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

export default function PopUp({ installationTargetId, redirectBack }: { installationTargetId: string | undefined, redirectBack: string | null }) {
    const [connecting, setConnecting] = useState(false)
    const router = useRouter()
    const authenticate = () => {
        setConnecting(true)
        const windowFeatures = "left=100,top=100,width=820,height=720,popup=yes";
        const handle = window.open(`https://github.com/apps/jeezy-dev/installations/new/permissions?target_id=${installationTargetId}`, "_blank", windowFeatures)
        if (!handle) {
            window.open(`https://github.com/apps/jeezy-dev/installations/new/permissions?target_id=${installationTargetId}`)
        }
        var timer = setInterval(function () {
            if (handle?.closed) {
                clearInterval(timer);
                setConnecting(false)
                router.push(redirectBack ?? '/dashboard')
            }
        }, 1000);
    }
    return (
        <div>
            <Button disabled={connecting} onClick={() => authenticate()} className="mx-auto" variant={'default'}>
                {connecting ?
                    (<SpinnerIcon className="mr-2 h-4 w-4 animate-spin" />)
                    :
                    (<GithubIcon className="mr-2 h-4 w-4" />)}
                {" "}
                Connect with GitHub
            </Button>
        </div>
    )
}

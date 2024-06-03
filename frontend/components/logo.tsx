import Link from 'next/link'
import React from 'react'
import { ServerIcon } from './icons'

export default function Logo() {
    return (
        <Link className="flex items-center justify-center" href="#">
            <ServerIcon className="h-10 w-6" />
            <span className="sr-only">Jeezy</span>
        </Link>
    )
}

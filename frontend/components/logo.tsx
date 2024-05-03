import Link from 'next/link'
import React from 'react'
import { ServerIcon } from './icons'

export default function Logo() {
    return (
        <Link className="flex items-center justify-center" href="#">
            <ServerIcon className="h-10 w-6" />
            <h3 className='text-3xl font-bold'>Jeezy</h3>
            <span className="sr-only">Jeezy</span>
        </Link>
    )
}

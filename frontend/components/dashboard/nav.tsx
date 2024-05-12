"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavItem() {
    const currentPathName = usePathname()
    const menus = [
        {
            title: 'Dashboard',
            pathName: '/dashboard',
        },
        {
            title: 'Deployments',
            pathName: '/dashboard/deployments',
        },
        {
            title: 'Projects',
            pathName: '/dashboard/projects',
        },
        {
            title: 'Logs',
            pathName: '/dashboard/logs',
        },
        {
            title: 'Settings',
            pathName: '/dashboard/settings',
        },
    ];

    return ( menus.map((menu, index) => (
            <Link
                key={index}
                href={menu.pathName}
                className={`text-muted-foreground transition-colors hover:text-foreground ${menu.pathName == currentPathName && 'font-semibold text-black  dark:text-white'}`}
            >
                {menu.title}
            </Link>
        )));
}

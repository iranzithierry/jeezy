"use client";
import React from 'react';
import Link from 'next/link';
import { Blocks, GridIcon, Home, Paperclip, PlaneIcon, Settings } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Logo from '../logo';
import { usePathname } from 'next/navigation';

const iconComponents = {
    Home: <Home />,
    Paperclip: <Paperclip />,
    PlaneIcon: <PlaneIcon />,
    GridIcon: <GridIcon />,
    Settings: <Settings />,
};

export default function Nav() {
    const currentPathName = usePathname()

    const menus = [
        {
            title: 'Dashboard',
            iconName: 'Home',
            badgeCount: 0,
            pathName: '/dashboard/',
            isCurrent: '/dashboard' == currentPathName,
        },
        {
            title: 'Deployments',
            iconName: 'PlaneIcon',
            badgeCount: 4,
            pathName: '/dashboard/deployments',
            isCurrent: '/dashboard/deployments' == currentPathName,
        },
        {
            title: 'Projects',
            iconName: 'GridIcon',
            badgeCount: 1,
            pathName: '/dashboard/projects',
            isCurrent: '/dashboard/projects' == currentPathName,
        },
        {
            title: 'Logs',
            iconName: 'Paperclip',
            badgeCount: 0,
            pathName: '/dashboard/logs',
            isCurrent: '/dashboard/logs' == currentPathName,
        },
        {
            title: 'Settings',
            iconName: 'Settings',
            badgeCount: 0,
            pathName: '/dashboard/settings',
            isCurrent: '/dashboard/settings' == currentPathName,
        },
    ];

    return (
        <nav className="grid items-start gap-0 px-2 text-sm font-medium md:gap-2 lg:px-4">
            <div className="flex md:hidden">
                <Logo />
            </div>
            {menus.map((menu, index) => (
                <Link
                    key={index}
                    href={menu.pathName}
                    className={`flex mt-4 md:mt-0 md:mx-0 mx-[-0.65rem] items-center md:gap-3 px-3 py-2 transition-all md:rounded-lg text-muted-foreground hover:text-primary ${menu.isCurrent && 'bg-muted'} gap-4 rounded-xl #hover:text-foreground`}
                >
                    {/* @ts-ignore */}
                    {iconComponents[menu.iconName]}
                    {menu.title}
                    {menu.badgeCount !== 0 && (
                        <Badge className="flex items-center justify-center w-6 h-6 ml-auto rounded-full shrink-0">
                            {menu.badgeCount}
                        </Badge>
                    )}
                </Link>
            ))}
        </nav>
    );
}

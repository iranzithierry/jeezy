"use client";
import { useState } from "react";
import { LayoutDashboard, LogOut } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import Image from "next/image";
import { User } from "@/types";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import ThemeSwitcher from "./theme-switcher";

export default function UserMenu({ user, logout }: { user: User, logout: Function }) {
  const [openPopover, setOpenPopover] = useState(false);
  if (!user) return null
  return (
    <div className="relative inline-block text-left">
      <Popover>
        <PopoverContent>
          <div className="px-4 py-2">
            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
              {user?.name}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-300 truncate">
              {user?.email}
            </p>
          </div>
          <div className="py-2">
            <Separator />
          </div>
          <div>
            <Button variant={'ghost'} className="w-full flex justify-between">
              <p className="text-sm">Dashboard</p>
              <LayoutDashboard className="w-4 h-4" />
            </Button>
            <Button variant={'ghost'} className="w-full flex justify-between" onClick={() => logout()}>
              <p className="text-sm">Logout</p>
              <LogOut className="w-4 h-4" />
            </Button>
            <div className="items-center whitespace-nowrap rounded-md text-sm font-medium h-10 px-4 py-2 w-full flex justify-between">
              <p className="text-sm">Theme</p>
              <ThemeSwitcher />
            </div>
          </div>
        </PopoverContent>
        <PopoverTrigger asChild>
          <button onClick={() => setOpenPopover(!openPopover)} className="flex items-center justify-center w-8 h-8 overflow-hidden transition-all duration-75 border border-gray-300 rounded-full focus:outline-none active:scale-95 sm:h-9 sm:w-9">
            {/* @ts-ignore */}
            <Image alt={user?.email ?? user?.name} priority={true} src={user?.image || `https://ui-avatars.com/api/?name=${user?.name?.split(" ")?.[0]?.[0]}${user?.name?.split(" ")?.[1]?.[0]}&color=FFFFFF&background=09090b`} width={40} height={40} />
          </button>
        </PopoverTrigger>
      </Popover>
    </div>
  );
}

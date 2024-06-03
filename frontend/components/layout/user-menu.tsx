"use client";
import { User } from "@/types/auth";
import Image from "next/image";
import { useState } from "react";
import { LogOut } from "lucide-react";
import { Separator } from "../ui/separator";
import ThemeSwitcher from "./theme-switcher";
import { LinkButton } from "../ui/link-button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

export default function UserMenu({ user }: { user?: User }) {
  const [openPopover, setOpenPopover] = useState(false);
  if (!user) return null
  const getNameAbreviation = (name: string) => {
    const splittedName = name.split(" ")
    if (splittedName.length > 1) {
      return name?.split(" ")?.[0]?.[0] + name?.split(" ")?.[1]?.[0]
    } else {
      return name[0]
    }

  }
  return (
    <div className="relative inline-block text-left">
      <Popover>
        <PopoverContent align="end">
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
          <div className="space-y-1">
            {/* <Button variant={'ghost'} className="w-full flex justify-between">
              <p className="text-sm">Dashboard</p>
              <LayoutDashboard className="w-4 h-4" />
            </Button> */}
            <div className="items-center whitespace-nowrap rounded-md text-sm font-medium h-10 px-4 py-2 w-full flex justify-between">
              <p className="text-sm">Theme</p>
              <ThemeSwitcher  className="-mr-1"/>
            </div>
            <Separator/>
            <LinkButton linkTo="/logout" variant={'ghost'} className="w-full flex justify-between hover:bg-destructive hover:text-white">
              <p className="text-sm">Logout</p>
              <LogOut className="w-4 h-4" />
            </LinkButton>
          </div>
        </PopoverContent>
        <PopoverTrigger asChild>
          <button onClick={() => setOpenPopover(!openPopover)} className="flex items-center justify-center w-10 h-10 overflow-hidden transition-all duration-75  rounded-full focus:outline-none active:scale-95 sm:h-10 sm:w-10">
            {/* @ts-ignore */}
            <Image alt={user?.email ?? user?.name} loader={(({ src }) => src)} priority={true} src={user?.image || `https://ui-avatars.com/api/?name=${getNameAbreviation(user?.name)}&color=FFFFFF&background=09090b`} width={50} height={50} />
          </button>
        </PopoverTrigger>
      </Popover>
    </div>
  );
}

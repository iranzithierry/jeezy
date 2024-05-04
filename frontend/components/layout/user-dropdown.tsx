"use client";
import { useState } from "react";
import { signOut } from "next-auth/react";
import { LayoutDashboard, LogOut } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import Image from "next/image";
import Link from "next/link";
import { Session } from "next-auth";

export default  function UserDropdown({ session }: { session: Session | null }) {
  const [openPopover, setOpenPopover] = useState(false);
  if(!session?.user) return null

  return (
    <div className="relative inline-block text-left">
      <Popover>
        <PopoverContent>
          <div className=" bg-white rounded-md">
            <div className="p-2">
              {session?.user?.name && (
                <p className="text-sm font-medium text-gray-900 truncate">
                  {session?.user?.name}
                </p>
              )}
              <p className="text-sm text-gray-500 truncate">
                {session?.user?.email}
              </p>
            </div>
            <Link href={'/dashboard'} className="relative flex items-center justify-start w-full p-2 space-x-2 text-sm text-left transition-all duration-75 rounded-md hover:bg-gray-100">
              <LayoutDashboard className="w-4 h-4" />
              <p className="text-sm">Dashboard</p>
            </Link>
            <button className="relative flex items-center justify-start w-full p-2 space-x-2 text-sm text-left transition-all duration-75 rounded-md hover:bg-gray-100" onClick={() => signOut()}>
              <LogOut className="w-4 h-4" />
              <p className="text-sm">Logout</p>
            </button>
          </div>
        </PopoverContent>
        <PopoverTrigger asChild>
          <button onClick={() => setOpenPopover(!openPopover)} className="flex items-center justify-center w-8 h-8 overflow-hidden transition-all duration-75 border border-gray-300 rounded-full focus:outline-none active:scale-95 sm:h-9 sm:w-9">
            {/* @ts-ignore */}
            <Image alt={session?.user?.email ?? session?.user?.name} src={session?.user?.image || `https://ui-avatars.com/api/?name=${session?.user?.name?.split(" ")?.[0]?.[0]}${session?.user?.name?.split(" ")?.[1]?.[0]}&color=FFFFFF&background=09090b`} width={40} height={40} />
          </button>
        </PopoverTrigger>
      </Popover>
    </div>
  );
}

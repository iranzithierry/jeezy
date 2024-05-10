"use client";
import { useState } from "react";
import { LayoutDashboard, LogOut } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import Image from "next/image";
import Link from "next/link";
import { User } from "@/types";
import { logout } from "@/apis/auth";
import { useRouter } from "next/navigation";

export default  function UserDropdown({ user }: { user: User }) {
  const router = useRouter()
  const [openPopover, setOpenPopover] = useState(false);
  const processLogout = async () => {
    const done = await logout()
    if(done) {
      router.push("/auth/login")
    }
  }
  if(!user) return null
  return (
    <div className="relative inline-block text-left">
      <Popover>
        <PopoverContent>
          <div className=" bg-white rounded-md">
            <div className="p-2">
              {user?.name && (
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.name}
                </p>
              )}
              <p className="text-sm text-gray-500 truncate">
                {user?.email}
              </p>
            </div>
            <Link href={'/dashboard'} className="relative flex items-center justify-start w-full p-2 space-x-2 text-sm text-left transition-all duration-75 rounded-md hover:bg-gray-100">
              <LayoutDashboard className="w-4 h-4" />
              <p className="text-sm">Dashboard</p>
            </Link>
            <button className="relative flex items-center justify-start w-full p-2 space-x-2 text-sm text-left transition-all duration-75 rounded-md hover:bg-gray-100" onClick={() => processLogout()}>
              <LogOut className="w-4 h-4" />
              <p className="text-sm">Logout</p>
            </button>
          </div>
        </PopoverContent>
        <PopoverTrigger asChild>
          <button onClick={() => setOpenPopover(!openPopover)} className="flex items-center justify-center w-8 h-8 overflow-hidden transition-all duration-75 border border-gray-300 rounded-full focus:outline-none active:scale-95 sm:h-9 sm:w-9">
            {/* @ts-ignore */}
            <Image loader={({src}) => src} alt={user?.email ?? user?.name} priority={true} src={user?.image || `https://ui-avatars.com/api/?name=${user?.name?.split(" ")?.[0]?.[0]}${user?.name?.split(" ")?.[1]?.[0]}&color=FFFFFF&background=09090b`} width={40} height={40} />
          </button>
        </PopoverTrigger>
      </Popover>
    </div>
  );
}

import AuthLoadingSkeleton from "@/components/auth/auth-loading-skeleton"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-8">
      <div className="space-y-4 text-center">
        <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-full inline-block animate-pulse">
          <Skeleton className="w-5 h-5" />
        </div>
        <Skeleton className="h-8 w-48 mx-auto" />
        <Skeleton className="h-5 w-96 mx-auto" />
      </div>
      <AuthLoadingSkeleton/>
      <Skeleton className="h-10 w-40 mx-auto" />
    </div>
  )
}

import { BaseResponse } from "@/types/http";
import ImportList from "./import-list";
import PopUp from "./pop-up";
import { AxiosError } from "axios";
import axiosAuth from "@/lib/hooks/use-axios-auth";
import BACKEND_URLS from "@/constants/backend-urls";
import { redirect } from "next/navigation";
export default async function Page() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="space-y-4">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Import GitHub Repositories</h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Connect your GitHub account to import your repositories and start building with them.
            </p>
          </div>
          {/* <PopUp /> */}
          <ImportList fetchRepositories={fetchRepositories} />
        </div>
      </div>
    </section>
  )
}

export async function fetchRepositories() {
  "use server";
  try {
      const { data }: { data: BaseResponse } = await axiosAuth.get(BACKEND_URLS.GET_USER_GITHUB_REPOSITORIES)
      if (data?.success) {
          return { success: true, message: data.message }
      }
      else {
          return { success: false, message: data.message }
      }
  } catch (err) {
      const error = err as AxiosError
      if (error?.response?.status === 401) {
          return redirect('/refresh?redirect_back=/dashboard')
      }
      // @ts-ignore
      return { success: false, message: error.response?.data?.message ?? error.message }
  }
}
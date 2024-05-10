"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { GithubIcon } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SpinnerIcon } from "../ui/icons"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { login, sign_up, verify_email } from "@/apis/auth"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { type?: string, withGithub?: boolean, callback?: Function, extraData?: { token: string; email: string } } { }

export function Form({ className, type = "signup", withGithub = true, extraData, callback, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = async (data: any) => {
    setIsLoading(true)
    let auth_function = type === "signup" ? sign_up : type === "verify_email" ? verify_email : login;
    let mergedData = { ...data, ...extraData }
    
    const response: { error: boolean, message: string } | any = await auth_function(mergedData)

    if (response.error) {
      toast.error(response.message)
    } else {
      if (callback) {
        await callback(response)
      }
      toast.success(response.message)
    }
    setIsLoading(false)
  }
  const isError = (value: any | null) => value ? true : false

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input invalid={isError(errors.email?.message)} id="email" placeholder="email" autoCapitalize="none" autoComplete="email" autoCorrect="off" value={extraData?.email} disabled={extraData?.email ? true : isLoading}
              {...type !== "verify_email" && (
                {
                  ...register('email',
                    { required: { value: true, message: "Email is required" }, pattern: { value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, message: "Email you provided is invalid" } })
                }
              )}

            />
            {/* @ts-ignore */}
            {errors.email && <span className="mt-2 text-xs font-medium leading-none text-red-500">{errors?.email?.message}</span>}
          </div>
          {type == "verify_email" && (
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="name">
                Name
              </Label>
              <Input invalid={isError(errors.name?.message)} id="name" placeholder="John Doe" autoCapitalize="none" autoComplete="name" autoCorrect="off" disabled={isLoading}
                {...register('name',
                  { required: { value: true, message: "Name is required" } })
                }
              />
              {/* @ts-ignore */}
              {errors.name &&<span className="mt-2 text-xs font-medium leading-none text-red-500">{errors?.name?.message}</span>}
            </div>
          )}
          {(type == "signin" || type == "verify_email") && (
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="password">
                Password
              </Label>
              <Input invalid={isError(errors.password?.message)} id="password" type="password" placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;" autoComplete="new-password" disabled={isLoading}
                {...register('password',
                  { required: { value: true, message: "Password is required" } })
                }
              />
              {/* @ts-ignore */}
              {errors.password && <span className="mt-2 text-xs font-medium leading-none text-red-500">{errors?.password?.message}</span> }
            </div>
          )}
          <Button disabled={isLoading}>
            {isLoading && ( <SpinnerIcon className="mr-2 h-4 w-4 animate-spin" />)}
            {type == "verify_email" ? "Continue Sign Up" : type == "signin" ? "Sign In" : "Sign Up"}
          </Button>
        </div>
      </form>
      {withGithub && (
        <>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <Button variant="outline" type="button" disabled={isLoading} onClick={() => signIn('github')}>
            {isLoading ? 
            (<SpinnerIcon className="mr-2 h-4 w-4 animate-spin" />): 
            (<GithubIcon className="mr-2 h-4 w-4" />)}
            {" "} GitHub
          </Button>
        </>
      )}
    </div>
  )
}

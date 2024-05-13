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
import { useRouter } from "next/navigation"

interface FormProps extends React.HTMLAttributes<HTMLDivElement> { type?: string, withGithub?: boolean, submitHandler: Function } { }

export function Form({ className, type = "signup", withGithub = true, submitHandler, ...props }: FormProps) {
  const router = useRouter()
  const [submitting, setSubmitting] = React.useState<boolean>(false)
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = async (data: any) => {
    setSubmitting(true)
    const response = await submitHandler(data)
    if (response) {
      const { error, message }: { error?: string, message?: string} = response
      if(message == "Done") return router.push('/dashboard')
      error ? toast.error(message) : toast.success(message)
    }
    setSubmitting(false)
  }
  const isError = (value: any | null) => value ? true : false

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          {type != "complete_registration" && (
            <div className="grid gap-1">
              <Label  htmlFor="email">
                Email
              </Label>
              <Input invalid={isError(errors.email?.message)} id="email" placeholder="email" autoCapitalize="none" autoComplete="email" autoCorrect="off" disabled={submitting}
                {...register('email',
                  { required: { value: true, message: "Email is required" }, pattern: { value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, message: "Email you provided is invalid" } })
                }
              />
              {/* @ts-ignore */}
              {errors.email && <span className="mt-2 text-xs font-medium leading-none text-red-500">{errors?.email?.message}</span>}
            </div>
          )}
          {type == "complete_registration" && (
            <div className="grid gap-1">
              <Label htmlFor="name">
                Name
              </Label>
              <Input invalid={isError(errors.name?.message)} id="name" placeholder="John Doe" autoCapitalize="none" autoComplete="name" autoCorrect="off" disabled={submitting}
                {...register('name',
                  { required: { value: true, message: "Name is required" } })
                }
              />
              {/* @ts-ignore */}
              {errors.name && <span className="mt-2 text-xs font-medium leading-none text-red-500">{errors?.name?.message}</span>}
            </div>
          )}
          {(type == "login" || type == "complete_registration") && (
            <div className="grid gap-1">
              <Label htmlFor="password">
                Password
              </Label>
              <Input invalid={isError(errors.password?.message)} id="password" type="password" placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;" autoComplete="new-password" disabled={submitting}
                {...register('password',
                  { required: { value: true, message: "Password is required" } })
                }
              />
              {/* @ts-ignore */}
              {errors.password && <span className="mt-2 text-xs font-medium leading-none text-red-500">{errors?.password?.message}</span>}
            </div>
          )}
          <Button disabled={submitting}>
            {submitting && (<SpinnerIcon className="mr-2 h-4 w-4 animate-spin" />)}
            {type == "complete_registration" ? "Continue Sign Up" : type == "login" ? "Sign In" : "Sign Up"}
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
          <Button variant="outline" type="button" disabled={submitting} onClick={() => signIn('github')}>
            {submitting ?
              (<SpinnerIcon className="mr-2 h-4 w-4 animate-spin" />) :
              (<GithubIcon className="mr-2 h-4 w-4" />)}
            {" "} GitHub
          </Button>
        </>
      )}
    </div>
  )
}

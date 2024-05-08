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
import { login, sign_up } from "@/apis/auth"
import { useRouter } from "next/navigation"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { type?: string, withGithub?: boolean } { }

export function UserAuthForm({ className, type = "signup", withGithub = true, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter()
  const onSubmit = async (data: any) => {
    setIsLoading(true)
    let auth_function = type === "signup" ? sign_up : login
    const response: { error: boolean, message: string } | any = await auth_function(data)
    if (response.error) {
      toast.error(response.message)
    } else {
      if (response.message == "Email verification link sent") {
        toast.success(response.message)
        router.push("/auth/email-verification-sent")
      }
      toast.success(response.message)
    }
    setIsLoading(false)
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="username@gmail.com"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              {...register('email',
                {
                  required: {
                    value: true,
                    message: "Email is required"
                  },
                  pattern: {
                    value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                    message: "Email you provided is invalid"
                  }
                })
              }
            />
            {errors.email &&
              // @ts-ignore
              <span className="mt-2 text-xs font-medium leading-none text-red-500">{errors?.email?.message}</span>
            }
          </div>
          {type == "complete" && (
            <div className="grid gap-1">
            <Label className="sr-only" htmlFor="name">
            Name
            </Label>
            <Input
              id="name"
              placeholder="John Doe"
              autoCapitalize="none"
              autoComplete="name"
              autoCorrect="off"
              disabled={isLoading}
              {...register('name',
                {
                  required: {
                    value: true,
                    message: "Name is required"
                  },
                })
              }
            />
            {errors.name &&
              // @ts-ignore
              <span className="mt-2 text-xs font-medium leading-none text-red-500">{errors?.name?.message}</span>
            }
          </div>
          )}
          {type == "signin" || type == "complete" && (
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="password">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                autoComplete="new-password"
                disabled={isLoading}
                {...register('password',
                  {
                    required: {
                      value: true,
                      message: "Password is required"
                    }
                  })
                }
              />
              {errors.password &&
                // @ts-ignore
                <span className="mt-2 text-xs font-medium leading-none text-red-500">{errors?.password?.message}</span>
              }
            </div>
          )}
          <Button disabled={isLoading}>
            {isLoading && (
              <SpinnerIcon className="mr-2 h-4 w-4 animate-spin" />
            )}
            {type[0].toUpperCase() + type.slice(1)} with Email
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
            {isLoading ? (
              <SpinnerIcon className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <GithubIcon className="mr-2 h-4 w-4" />
            )}{" "}
            GitHub
          </Button>
          </>
      )}
    </div>
  )
}

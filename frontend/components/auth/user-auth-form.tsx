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
import { useRouter } from "next/navigation";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { type?: string } { }

export function UserAuthForm({ className, type = "signup", ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const { register, handleSubmit, formState: { errors }, setError } = useForm();
  const onError = (error: any) => console.log(error);

  // const router = useRouter()
  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true)
      signIn("credentials", { ...data, redirect: false, callbackUrl: "/dashboard" }).then((response) => {
        if (response?.error?.endsWith("401")) {
          setError("credentialsError", { message: "There was a problem with your login" });
          return;
        }
        if (response?.error == null) {
          window.location.href = "/"
          return;
        }
        setError("credentialsError", { message: response?.error });

      })
    }
    catch (error: any) { console.error(error.message) }
    finally { setIsLoading(false) }
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
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
          {type == "signin" && (
            <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
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
    </div>
  )
}

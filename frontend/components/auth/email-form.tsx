"use client";
import { Suspense, useState } from "react";
import { LinkButton } from "../ui/link-button";
import { Form } from "./form";
import { Mail } from "lucide-react";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp"
import { Button } from "../ui/button";
import { SpinnerIcon } from "../ui/icons";
import { Label } from "../ui/label";
import FormSkeleton from "./form-skeleton";

export default function EmailForm({ submitHandler, otpSubmitHandler }: { submitHandler: Function, otpSubmitHandler: Function }) {
    const [OTP, setOTP] = useState("")
    const [emailSent, setEmailSent] = useState(false);
    const [status, setStatus] = useState<{ error?: boolean, message?: string }>({ error: false, message: "" })

    const emailSubmitHandler = async (data: { email: string }) => {
        const { error, message }: { error: boolean, message: string } = await submitHandler(data)
        setEmailSent(!error)
        return { error: error, message: message }
    }
    const submitOTPHandler = async (data: { name: string, password: string, otp?: string }) => {
        if (OTP.length < 6) {
            setStatus({ error: true, message: "Please provide an OTP code to verify your email."})
            return { error: true, message: "Please provide an OTP code to verify your email." }
        }
        data = { ...data, otp: OTP }
        const { error, message }: { error: boolean, message: string } = await otpSubmitHandler(data)
        return { error: error, message: message }
    }
    return (
        <>
            {emailSent ?
                (<div className="flex flex-col items-center justify-center h-screen gap-6" >
                    <div className="space-y-2 shrink-0">
                        <div className="w-full max-w-[27rem]">
                            <Label htmlFor="otp" className="text-start">
                                OTP Code
                            </Label>
                            <InputOTP
                                maxLength={6}
                                pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                                value={OTP}
                                onChange={(value) => setOTP(value)}
                            >
                                <InputOTPGroup>
                                    <InputOTPSlot className="px-8 py-5" index={0} />
                                    <InputOTPSlot className="px-8 py-5" index={1} />
                                    <InputOTPSlot className="px-8 py-5" index={2} />
                                </InputOTPGroup>
                                <InputOTPSeparator />
                                <InputOTPGroup>
                                    <InputOTPSlot className="px-8 py-5" index={3} />
                                    <InputOTPSlot className="px-8 py-5" index={4} />
                                    <InputOTPSlot className="px-8 py-5" index={5} />
                                </InputOTPGroup>
                            </InputOTP>
                            <div className="text-start w-full">
                                {status.error && (<p className="text-start text-sm mt-2 text-red-500">{status.message}</p>)}
                            </div>
                        </div>
                        <Suspense fallback={<FormSkeleton/>}>
                        <Form withGithub={false} submitHandler={submitOTPHandler} type="complete_registration" />
                        </Suspense>
                        <LinkButton className="w-full !mt-6" target="_blank" linkTo="https://mail.google.com/mail/u/0/#inbox" variant={'outline'}>
                            <Mail className="h-4 w-4 mr-2" />
                            Check Inbox
                        </LinkButton>
                    </div>
                </div >) :
                (<div className="sm:w-[350px] mx-auto">
                    <Form submitHandler={emailSubmitHandler} />
                </div>)}
        </>
    )
}
import React from 'react'
import { CardTitle, CardDescription, CardHeader, CardContent, Card, CardFooter } from "@/components/ui/card"
import { Button } from '@/components/ui/button'
import { GithubIcon } from '@/components/icons'
export default function Page() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Jeezy</CardTitle>
                    <CardDescription>jeezy.jeezy.com</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                        <GithubIcon className="w-5 h-5" />
                        <span>iranzithierry/jeezy</span>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                    <Button>Deploy</Button>
                </CardFooter>
            </Card>
        </div>
    )
}

import React from 'react'
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Button } from '@/components/ui/button'

const templates = [
    {
        title: 'nextjs/nextjs',
        description: 'The React Framework – created and maintained by @vercel.'
    },
    {
        title: 'shadcn/ui',
        description: 'Beautifully designed components that you can copy and paste into your apps.'
    },
    {
        title: 'vercel/vercel',
        description: 'The platform for frontend developers.'
    },
    {
        title: 'tailwindlabs/tailwindcss',
        description: 'A utility-first CSS framework for rapidly building custom designs.'
    },
    {
        title: 'prisma/prisma',
        description: 'Prisma is a next-generation ORM that makes database access easy.'
    },
    {
        title: 'radix-ui/primitives',
        description: 'A set of unstyled, accessible components for building high-quality design systems and web apps.'
    }
]

export default function Page() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template, index) => (
                <Card key={index}>
                    <CardHeader>
                        <CardTitle>{template.title}</CardTitle>
                        <CardDescription>{template.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex justify-end">
                        <Button>Deploy</Button>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

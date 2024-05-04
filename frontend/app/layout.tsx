import "@/styles/globals.css";
import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/providers"
import { Toaster } from 'sonner'
// import { Analytics } from "@vercel/analytics/react"

import { displayFont, monoFont } from "@/lib/fonts";

// import { Chivo } from 'next/font/google'
// import { Rubik } from 'next/font/google'
// const rubik = Rubik({ subsets: ['latin'], display: 'swap', variable: '--font-rubik', })
// const chivo = Chivo({ subsets: ['latin'], display: 'swap', variable: '--font-chivo', })

export const metadata: Metadata = {
  metadataBase: new URL(`https://${process.env.VERCEL_URL}`),
  title: { default: 'Jeezy', template: `%s - Jeezy` },
  icons: { icon: '/icon.svg' },
}

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ]
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("bg-background font-sans antialiased", displayFont.variable, monoFont.variable)}>
        <Toaster richColors position="top-right" />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <main>{children}</main>
        </ThemeProvider>
        {/* <Analytics /> */}
      </body>
    </html>
  );
}

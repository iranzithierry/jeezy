import Header from '@/components/dashboard/header'
import Sidebar from '@/components/dashboard/sidebar'
import { AuthProvider } from '@/context/auth';
import { getSession } from '@/lib/sessions';
import React, { Suspense } from 'react'

export default async function DashboardLayout({ children, }: { children: React.ReactNode; }) {
  async function checkSession() {
    const session = await getSession("session")
    return session
  }
  return (
    <AuthProvider session={await checkSession()}>
      <div className="grid h-screen  w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <Sidebar />
        <div className="flex flex-col">
          <Suspense fallback="...">
            <Header />
          </Suspense>
          <section className="flex flex-col flex-1 p-4 h-full dark:bg-gray-800/40">
            {children}
          </section>
        </div>
      </div >
    </AuthProvider>
  )
}

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
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <Sidebar />
        <div className="flex flex-col">
          <Suspense fallback="...">
            <Header />
          </Suspense>
          <main className="flex flex-col flex-1 gap-4 p-4 lg:gap-6 lg:p-6">
            {children}
          </main>
        </div>
      </div >
    </AuthProvider>
  )
}

import Footer from '@/components/dashboard/footer';
import Header from '@/components/dashboard/header'
import { getSession, logout } from '@/lib/sessions';
import { Session } from '@/types/auth';
import React, { Suspense } from 'react'

export default async function DashboardLayout({ children, }: { children: React.ReactNode; }) {
  async function checkSession() {
    const session = await getSession()
    return session as Session;
  }
  return (
    <div className="h-screen  w-full">
      <div className="flex flex-col">
        <Suspense fallback="...">
          <Header session={await checkSession()} />
        </Suspense>
        <section className="flex flex-col flex-1 p-4 h-full dark:bg-muted">
          {children}
        </section>
        <Footer />
      </div>
    </div >
  )
}

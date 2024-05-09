import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSession } from './lib/sessions';

const protectedRoutes = ['/dashboard']
const publicRoutes = ['/auth/login', '/auth/signup', '/']

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname
    const isProtectedRoute = protectedRoutes.includes(path)
    const isPublicRoute = publicRoutes.includes(path)

    const session = await getSession("session")
    if (isProtectedRoute && !session?.user) {
        return NextResponse.redirect(new URL('/auth/login', request.nextUrl))
    }

    if ( isPublicRoute && session?.user && !request.nextUrl.pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/dashboard', request.nextUrl))
    }
      return NextResponse.next()
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
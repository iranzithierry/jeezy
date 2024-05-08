import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Session } from "next-auth";
import { auth } from './auth';

export async function middleware(request: NextRequest) {
    const session: Session | null = await auth()
    if (!session?.user && request.nextUrl.pathname.startsWith("/dashboard")) {
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }
    return null;
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
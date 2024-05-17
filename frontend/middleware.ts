import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSession, updateAccessToken } from './lib/sessions';

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname
    if(!process.env.MAINTENANCE){
        const session = await getSession()
        if (path.startsWith('/dashboard') && !session?.user) {  
            return NextResponse.redirect(new URL(`/login?redirect_back=${path}`, request.nextUrl))
        }
        if(path.startsWith('/refresh')){
            const redirectTo = request.nextUrl.searchParams.get("redirect_back")     
            return NextResponse.redirect(new URL(redirectTo ?? path, request.nextUrl))
        }
        return await updateAccessToken(request)
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
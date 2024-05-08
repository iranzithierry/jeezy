import NextAuth, { type DefaultSession } from 'next-auth'
import GitHub from 'next-auth/providers/github'
import Credentials from "next-auth/providers/credentials"
import { LoginResponse } from './types';
import { cookies } from 'next/headers';

declare module 'next-auth' {
    interface Session {
        user: {
            username: string
        } & DefaultSession['user']
    }
}

export const { handlers: { GET, POST }, auth, signIn } = NextAuth({
    session: {
        strategy: "jwt"
    },
    providers: [
        GitHub({
            authorization: {
                url: "https://github.com/login/oauth/authorize",
                params: { scope: "read:user user:email repo" },
            }
        }),
        Credentials({
            credentials: {},
            // @ts-ignore
            authorize: async (credentials, request) => {
                const requestJson = await request.json()
                const data: LoginResponse = JSON.parse(requestJson.stringifiedResponse)
                try {
                    cookies().set({ name: "access.token", value: data.tokens.access, maxAge: 8 * 60 * 60, path: "/", httpOnly: true, })
                    cookies().set({ name: "refresh.token", value: data.tokens.refresh, maxAge: 5 * 24 * 60 * 60, path: "/", httpOnly: true })
                } catch (error) {
                    const err: any = error
                    throw new Error(err.message)
                }
                return data.user
            }
        })
    ],
    callbacks: {
        jwt: async ({ token, profile, user, account }) => {
            if (account) {
                token.accessToken = account.access_token;
            }
            if (account?.provider == "github") {
                if (profile) {
                    const data = {"email": profile.email, "access_token": account.access_token}
                    const response = await fetch("http://127.0.0.1:8000/api/auth/github/authenticate/", {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json"
                        },
                        body: JSON.stringify(data)
                    });
                    const responseData: LoginResponse = await response.json();
                    if (responseData.success) {
                        cookies().set({ name: "access.token", value: responseData.tokens.access, maxAge: 8 * 60 * 60, path: "/", httpOnly: true, })
                        cookies().set({ name: "refresh.token", value: responseData.tokens.refresh, maxAge: 5 * 24 * 60 * 60, path: "/", httpOnly: true })
                    }
                    token.id = profile?.id
                    token.image = profile?.avatar_url
                    token.username = profile?.login
                }
            }
            return token
        },
        session: async ({ session, token }) => {
            if (session?.user && token?.username) {
                session.user.username = String(token.username)
            }
            return session
        },
        authorized({ auth }) {
            return !!auth?.user
        }
    },
})
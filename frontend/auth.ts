import NextAuth, { type DefaultSession } from 'next-auth'
import GitHub from 'next-auth/providers/github'
import Credentials from "next-auth/providers/credentials"
import { AbstractUser } from './types';
import { cookies } from 'next/headers';

declare module 'next-auth' {
    interface Session {
        user: {
            /** The user's id. */
            username: string
        } & DefaultSession['user']
    }
}

export const { handlers: { GET, POST }, auth } = NextAuth({
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
            credentials: {
                email: { label: "email" },
                password: { label: "Password", type: "password" }
            },
            // @ts-ignore
            authorize: async (credentials) => {
                try {
                    const response = await fetch("http://127.0.0.1:8000/api/auth/sign-in/", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(credentials)
                    })
                    let tempMessage = null
                    let responseData = await response.json();
                    if ("detail" in responseData){
                        tempMessage = responseData.detail
                    }
                    if ("message" in responseData){
                        tempMessage = responseData.message
                    }
                    if (!response.ok) throw new Error(tempMessage)
                    const data: AbstractUser = responseData
                    if (!data.user) return null;
                    cookies().set({ name: "access.token", value: data.access, maxAge: 8 * 60 * 60, path: "/", httpOnly: true, })
                    cookies().set({ name: "refresh.token", value: data.refresh, maxAge: 5 * 24 * 60 * 60, path: "/", httpOnly: true })
                    return data.user
                } catch (error) {
                    const err: any = error
                    console.log("ERR", err);
                    throw new Error(err.message)
                }

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
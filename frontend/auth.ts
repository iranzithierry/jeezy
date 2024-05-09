import NextAuth, { type DefaultSession } from 'next-auth'
import GitHub from 'next-auth/providers/github'
import { LoginResponse } from './types';
import { cookies } from 'next/headers';
import { createSession } from './lib/sessions';

export const { handlers: { GET, POST }, auth, signIn } = NextAuth({
    session: {
        strategy: "jwt"
    },
    providers: [GitHub],
    callbacks: {
        jwt: async ({ token, profile, user, account }) => {
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
                        createSession({user: responseData.user})
                    }
                }
            }
            return token
        },
        authorized({ auth }) {
            return !!auth?.user
        }
    },
})
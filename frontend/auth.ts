import NextAuth, { type DefaultSession } from 'next-auth'
import GitHub from 'next-auth/providers/github'
import { LoginResponse } from './types';
import { cookies } from 'next/headers';
import { createSession } from './lib/sessions';
import BACKEND_URLS from './constants/backend-urls';
import COOKIE_NAMES from './constants/cookies-names';
import COOKIE_TIME from './constants/cookies-time';

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
                    const response = await fetch(`${BACKEND_URLS.GITHUB_AUTHENTICATE}`, {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json"
                        },
                        body: JSON.stringify(data)
                    });
                    const responseData: LoginResponse = await response.json();
                    if (responseData.success) {
                        cookies().set({ name: COOKIE_NAMES.ACCESS_TOKEN, value: responseData.tokens.access, maxAge: COOKIE_TIME.ACCESS_TOKEN, path: "/", httpOnly: true, })
                        cookies().set({ name: COOKIE_NAMES.REFRESH_TOKEN, value: responseData.tokens.refresh, maxAge: COOKIE_TIME.REFRESH_TOKEN, path: "/", httpOnly: true })
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
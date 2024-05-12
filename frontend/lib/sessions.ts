import 'server-only'
import { cookies } from 'next/headers'
import { decrypt, encrypt } from './jwt'
import COOKIE_NAMES from '@/constants/cookies-names'
import COOKIE_TIME from '@/constants/cookies-time'
import { deleteCookie } from './cookies'
import { redirect } from 'next/navigation'

export async function createSession(payload: object, key = "session", expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000) {
  const session = await encrypt(payload)

  cookies().set(key, session, { httpOnly: true, secure: true, expires: expiresAt, sameSite: 'lax', path: '/', })
}


export async function updateSession(key = "session", expiresAt = Date.now() + 75 * 24 * 60 * 60) {
  const session = cookies().get(key)?.value
  const payload = await decrypt(session)

  if (!session || !payload) {
    return null
  }
  const expires = new Date(expiresAt)
  cookies().set(key, session, { httpOnly: true, secure: true, expires: expires, sameSite: 'lax', path: '/', })
}
export async function getSession(key = "session") {
  const cookie = cookies().get(key)?.value
  try {
    const session = await decrypt(cookie)
    return session
  } catch (error) { return null }
}
export async function authenticate(data: any) {
  try {
    cookies().set({ name: COOKIE_NAMES.ACCESS_TOKEN, value: data.tokens.access, maxAge: COOKIE_TIME.ACCESS_TOKEN, path: "/", httpOnly: true, })
    cookies().set({ name: COOKIE_NAMES.REFRESH_TOKEN, value: data.tokens.refresh, maxAge: COOKIE_TIME.REFRESH_TOKEN, path: "/", httpOnly: true })
  } catch (error: any) {
    throw new Error(error.message)
  }
  finally { createSession({ user: data.user }) }
}

export async function logout() {
  try {
    await deleteCookie('session')
    await deleteCookie(COOKIE_NAMES.REFRESH_TOKEN)
    await deleteCookie(COOKIE_NAMES.ACCESS_TOKEN)
  } catch (error: any) {
    throw new Error(error.message)
  } finally { redirect('/login') }
}
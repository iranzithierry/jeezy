import 'server-only'
import { cookies } from 'next/headers'
import { decrypt, encrypt } from './jwt'

export async function createSession(payload: object, key = "session", expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000) {
  const expires = new Date(expiresAt)
  const session = await encrypt({ ...payload, ...expires })

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
  } catch (error) {
    return null
  }
}
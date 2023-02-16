import { api } from '@/services/api'
import { recoverUserInfo } from '@/services/AuthService'
import axios from 'axios'

import { useRouter } from 'next/router'
import { setCookie, parseCookies } from 'nookies'
import { createContext, useEffect, useState } from 'react'

type User = {
  id: string
  name: string
  email: string
  phone: string
}

type SignInData = {
  email: string
  password: string
}

type AuthContextType = {
  isAuthenticated: boolean
  user: User | null
  signIn: ({ email, password }: SignInData) => Promise<void>
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  const isAuthenticated = !!user

  useEffect(() => {
    const { 'moreschi.token': token } = parseCookies()

    if (token) {
      const tokenJson = JSON.parse(token)
      recoverUserInfo(tokenJson)
        .then(response => {
          setUser(response.data.body)
        })
        .catch(e => console.error(e))
    }
  }, [])

  async function signIn({ email, password }: SignInData) {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/signin`,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        data: {
          email: email,
          password: password
        }
      }
    )

    const { token, user } = response.data.body

    setCookie(undefined, 'moreschi.token', JSON.stringify({ token, user }), {
      maxAge: 60 * 60 * 1 // 1 hour
    })

    api.defaults.headers['Authorization'] = `Bearer ${token}`

    setUser(user)

    router.push('/')
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}

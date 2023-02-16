import axios from 'axios'

import { parseCookies } from 'nookies'

type SignInRequestData = {
  email: string
  password: string
}

type SignInResponseData = {
  token: string
  id: string
  name: string
  email: string
  phone: string
}

export async function signInRequest({ email, password }: SignInRequestData) {
  return await axios
    .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signin`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      data: {
        email: email,
        password: password
      }
    })
    .then(response => console.log(response))
}

export async function recoverUserInfo(token: any) {
  return await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/users/id/${token.user.id}`
  )
}

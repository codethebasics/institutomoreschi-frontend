import axios from 'axios'
import { parseCookies } from 'nookies'

const { 'moreschi.token': token } = parseCookies()

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
})

api.defaults.headers['Content-Type'] = 'application/json'
api.defaults.headers['Accept'] = 'application/json'

api.interceptors.request.use(config => {
  return config
})

if (token) {
  const tokenJSON = JSON.parse(token)
  const jwt = tokenJSON.token
  api.defaults.headers['Authorization'] = `Bearer ${jwt}`
}

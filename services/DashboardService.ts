import axios from 'axios'

export function getTotals(): Promise<any> {
  return axios.get(`${process.env.NEXT_PUBLIC_API_URL}/dashboard`)
}

export default {
  getTotals
}

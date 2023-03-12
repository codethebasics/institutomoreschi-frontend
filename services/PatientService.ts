import axios from 'axios'

export async function list(): Promise<any> {
  return axios.get(`${process.env.NEXT_PUBLIC_API_URL}/patients`)
}

export async function findById(id: string): Promise<any> {
  return axios.get(`${process.env.NEXT_PUBLIC_API_URL}/patients/${id}`)
}

export async function findByEmail(email: string): Promise<any> {
  return axios.get(`${process.env.NEXT_PUBLIC_API_URL}/patients?email=${email}`)
}

export default {
  list,
  findById,
  findByEmail
}

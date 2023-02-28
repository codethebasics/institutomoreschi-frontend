import axios from 'axios'

export async function findById(id: string): Promise<any> {
  return await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/id/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  })
}

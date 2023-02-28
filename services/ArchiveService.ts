import axios from 'axios'

export async function findById(id: string): Promise<any> {
  return await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/archive/id/${id}`,
    {
      headers: {
        'Content-Type': 'image/jpeg',
        Accept: 'image/jpeg'
      }
    }
  )
}

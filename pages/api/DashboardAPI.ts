import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/dashboard`
    )
    console.log('response', response)
    res.status(200).json(response)
  } catch (e: any) {
    res.status(500).json({ message: 'Erro durante consulta de dashboard' })
  }
}

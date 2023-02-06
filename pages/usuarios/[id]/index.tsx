import axios from 'axios'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import UserAvatar from '@/components/users/UserAvatar'

export default function UsersFindByIdPage() {
  const router = useRouter()
  const { id } = router.query

  const [user, setUser] = useState({})

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/users/id/${id}`)
      .then(response => setUser(() => response.data))
      .catch(e => console.error(e))
  }, [])

  return (
    <div>
      <UserAvatar user={user} size={125} />
    </div>
  )
}

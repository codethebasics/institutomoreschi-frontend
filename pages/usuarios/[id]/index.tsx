import { useRouter } from 'next/router'

export default function UsersFindByIdPage() {
  const router = useRouter()
  const { id } = router.query

  return <div>UsersFindByIdPage {id}</div>
}

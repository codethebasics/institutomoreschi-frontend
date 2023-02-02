import { useRouter } from 'next/router'

export default function RoleFindByIdPage() {
  const router = useRouter()
  const { id } = router.query

  return <div>RoleFindByIdPage {id}</div>
}

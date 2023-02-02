import { useRouter } from 'next/router'

export default function UsersRolesPage() {
  const router = useRouter()
  const { id } = router.query

  return <div>UsersRolesPage {id}</div>
}

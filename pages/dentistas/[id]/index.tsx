import { useRouter } from 'next/router'

export default function DentistFindByIdPage() {
  const router = useRouter()
  const { id } = router.query

  return <div>DentistFindByIdPage {id}</div>
}

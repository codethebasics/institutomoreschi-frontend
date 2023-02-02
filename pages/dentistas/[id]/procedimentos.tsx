import { useRouter } from 'next/router'

export default function DentistProceduresPage() {
  const router = useRouter()
  const { id } = router.query

  return <div>DentistProceduresPage {id}</div>
}

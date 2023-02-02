import { useRouter } from 'next/router'

export default function DentistPatientPage() {
  const router = useRouter()
  const { id } = router.query

  return <div>DentistPatientPage {id}</div>
}

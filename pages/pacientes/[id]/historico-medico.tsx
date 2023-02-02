import { useRouter } from 'next/router'
import React from 'react'

export default function PatientMedicalHistoryPage() {
  const router = useRouter()
  const { id } = router.query

  return <div>PatientMedicalHistoryPage {id}</div>
}

import { useRouter } from 'next/router'
import React from 'react'

export default function PatientHealthInsurancePage() {
  const router = useRouter()
  const { id } = router.query

  return <div>PatientHealthInsurancePage {id}</div>
}

import { useRouter } from 'next/router'
import React from 'react'

export default function PatientProcedurePage() {
  const router = useRouter()
  const { id } = router.query

  return <div>PatientProcedurePage {id}</div>
}

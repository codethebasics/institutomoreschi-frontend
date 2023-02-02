import { useRouter } from 'next/router'
import React from 'react'

export default function PatientFindByIdPage() {
  const router = useRouter()
  const { id } = router.query

  return <div>PatientFindByIdPage {id}</div>
}

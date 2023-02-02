import React from 'react'

import { useRouter } from 'next/router'

export default function DentistAgendaPage() {
  const router = useRouter()
  const { id } = router.query

  return <div>DentistAgendaPage {id}</div>
}

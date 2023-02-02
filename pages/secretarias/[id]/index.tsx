import React from 'react'

import { useRouter } from 'next/router'

export default function SecretariesFindByIdPage() {
  const router = useRouter()
  const { id } = router.query

  return <div>SecretariesFindByIdPage {id}</div>
}

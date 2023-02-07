import axios from 'axios'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import UserAvatar from '@/components/users/UserAvatar'
import styled from '@emotion/styled'

interface User {
  id: string
  name: string
  email: string
  active: string
}

const Container = styled.div`
  padding: 1rem;
`

const AvatarSection = styled.section`
  display: flex;
  justify-content: center;
`

const BioSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem 0;

  > div:first-of-type {
    font-size: 3rem;
    font-weight: bold;
  }

  > div:nth-of-type(2n) {
    font-size: 1.8rem;
    font-weight: bold;
  }

  > div:last-of-type {
    font-size: 1.4rem;
  }
`

const ActionSection = styled.section`
  padding: 0.5rem;
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  flex-wrap: wrap;
`

const ActionCard = styled.div`
  background: #f5f5f5;
  display: flex;
  flex-grow: 1;
  padding: 1rem;
  justify-content: center;
  border: 1px solid #ddd;
`

export default function UsersFindByIdPage() {
  const router = useRouter()
  const { id } = router.query

  const [user, setUser] = useState<User>()

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/users/id/${id}`)
      .then(response => response.data)
      .then(data => data.body)
      .then(body => setUser(() => body))
      .catch(e => console.error(e))
  }, [])

  return (
    <Container>
      <AvatarSection>
        <UserAvatar user={user} size={125} />
      </AvatarSection>
      <BioSection>
        {user ? (
          <>
            <div>{user.name}</div>
            <div>{'(61) 9 8577 0401'}</div>
            <div>{user.email}</div>
          </>
        ) : null}
      </BioSection>
      <ActionSection>
        <ActionCard>Histórico Médico</ActionCard>
        <ActionCard>Arquivos</ActionCard>
        <ActionCard>Agenda</ActionCard>
      </ActionSection>
    </Container>
  )
}

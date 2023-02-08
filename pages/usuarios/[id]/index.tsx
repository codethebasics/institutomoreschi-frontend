import axios from 'axios'
import UserAvatar from '@/components/users/UserAvatar'
import styled from '@emotion/styled'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

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
    font-weight: bold;
    font-size: 2rem;
  }

  > div:nth-of-type(2n) {
    font-weight: bold;
    font-size: 1.3rem;
  }

  > div:last-of-type {
    font-size: 1.3rem;
  }
`

const ActionSection = styled.section`
  padding: 0.5rem;
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  flex-wrap: wrap;
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
        <UserAvatar user={user} size={100} />
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
        <Tabs variant="enclosed" size="lg" width="100%">
          <TabList>
            <Tab>Histórico</Tab>
            <Tab>Agenda</Tab>
            <Tab>Convênios</Tab>
            <Tab>Procedimentos</Tab>
          </TabList>
          <TabPanels>
            <TabPanel maxHeight="45vh" overflowY="auto">
              <p>Início</p>
              <p>Histórico Médico</p>
              <p>Histórico Médico</p>
              <p>Histórico Médico</p>
              <p>Histórico Médico</p>
              <p>Histórico Médico</p>
              <p>Histórico Médico</p>
              <p>Histórico Médico</p>
              <p>Histórico Médico</p>
              <p>Histórico Médico</p>
              <p>Histórico Médico</p>
              <p>Histórico Médico</p>
              <p>Histórico Médico</p>
              <p>Histórico Médico</p>
              <p>Histórico Médico</p>
              <p>Fim</p>
            </TabPanel>
            <TabPanel>
              <p>Agenda</p>
            </TabPanel>
            <TabPanel>
              <p>Convênios</p>
            </TabPanel>
            <TabPanel>
              <p>Procedimentos</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </ActionSection>
    </Container>
  )
}

import axios from 'axios'
import UserAvatar from '@/components/users/UserAvatar'
import styled from '@emotion/styled'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'

import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import HealthHistoryPage from '@/components/patients/HealthHistoryPage'
import PatientAgendaPage from '@/components/patients/PatientAgendaPage'
import PatientProceduresView from '@/components/patients/PatientProceduresView'
import PatientHealthInsurancePage from '@/components/patients/PatientHealthInsurancePage'

interface User {
  id: string
  name: string
  email: string
  active: string
}

const Container = styled.div`
  padding: 1rem;
`

const Top = styled.div`
  display: flex;
  align-items: center;
`

const AvatarSection = styled.section`
  display: flex;
  justify-content: center;
`

const BioSection = styled.section`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 0 1rem;

  > div:first-of-type {
    font-weight: bold;
    font-size: 1.9rem;
  }

  > div:nth-of-type(2n) {
    font-size: 1.3rem;
    font-weight: 500;
  }

  > div:last-of-type {
    font-size: 1.3rem;
    font-weight: 500;
    color: #05448d;
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
  const [phone, setPhone] = useState<any>(undefined)

  useEffect(() => {
    const { 'moreschi.token': token }: any = parseCookies()
    const tokenJson = JSON.parse(token)
    setPhone(tokenJson?.user?.phone)
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/users/id/${id}`)
      .then(response => response.data)
      .then(data => data.body)
      .then(body => setUser(() => body))
      .catch(e => console.error(e))
  }, [])

  return (
    <Container>
      <Top>
        <AvatarSection>
          <UserAvatar user={user} size={70} />
        </AvatarSection>
        <BioSection>
          {user ? (
            <>
              <div>{user.name}</div>
              <div>{phone}</div>
              <div>{user.email}</div>
            </>
          ) : null}
        </BioSection>
      </Top>
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
              <HealthHistoryPage />
            </TabPanel>
            <TabPanel>
              <PatientAgendaPage />
            </TabPanel>
            <TabPanel>
              <PatientHealthInsurancePage />
            </TabPanel>
            <TabPanel>
              <PatientProceduresView />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </ActionSection>
    </Container>
  )
}

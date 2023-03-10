import UserAvatar from '@/components/users/UserAvatar'
import styled from '@emotion/styled'
import axios from 'axios'

import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'
import { useEffect, useState } from 'react'

import HealthHistoryPage from '@/components/patients/HealthHistoryPage'

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
  padding: 0 1rem;
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
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`

export default function UsersFindByIdPage() {
  const router = useRouter()
  const { id } = router.query
  const [user, setUser] = useState<User>()
  const [patient, setPatient] = useState<any>()
  const [phone, setPhone] = useState<any>(undefined)

  useEffect(() => {
    const { 'moreschi.token': token }: any = parseCookies()
    const tokenJson = JSON.parse(token)

    setPhone(tokenJson?.user?.phone)

    fetchUserInfo()
      .then(response => response.data)
      .then(data => data.body)
      .then(body => {
        console.log('body', body)
      })
      .catch(e => console.error(e))

    fetchPatientInfo()
      .then(response => response.data)
      .then(data => setPatient(data))
      .catch(e => console.error(e))
  }, [])

  const fetchUserInfo = async () => {
    console.log('fetchUserInfo')
    return axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/id/${id}`)
  }

  const fetchPatientInfo = async () => {
    console.log('fetchPatientInfo')
    return axios.get(`${process.env.NEXT_PUBLIC_API_URL}/patients/userId/${id}`)
  }

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
        <HealthHistoryPage />
      </ActionSection>
    </Container>
  )
}

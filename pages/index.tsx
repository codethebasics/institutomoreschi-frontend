import * as DashboardService from '@/services/DashboardService'

import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import { getAPIClient } from '@/services/ApiClient'
import { useEffect } from 'react'
import { findById } from '@/services/UserService'
import { useState } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import Dashboard from './dashboard'

const StyledDashboardCard = styled.div`
  background: #fff;
  color: #444;
  border: 1px solid #444;
  box-shadow: 0 3px 5px #ddd;
  border-radius: 5px;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .title {
    text-transform: uppercase;
    font-weight: 500;
  }

  .count {
    font-size: 4rem;
  }
`

const DashboardCard = ({ title, count }: any) => {
  return (
    <StyledDashboardCard>
      <div className="title">{title}</div>
      <div className="count">{count}</div>
    </StyledDashboardCard>
  )
}

const Container = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

interface Count {
  totalPatients: number
  totalDentists: number
  totalSecretaries: number
  totalUsers: number
}

export default function Home() {
  const [user, setUser] = useState<any>(null)
  const [totals, setTotals] = useState<Count>()

  const router = useRouter()

  const handleNavigation = (to: string) => {
    router.push(`/${to}`)
  }

  useEffect(() => {
    const cookies = parseCookies()
    const token: any = cookies['moreschi.token']
    const parsedToken = JSON.parse(token)
    const user = parsedToken.user

    if (user.id) {
      findById(user.id)
        .then(response => setUser(response.data.body))
        .catch(e => console.error(e))
    }

    DashboardService.getTotals()
      .then(response => setTotals(response.data))
      .catch(e => console.error(e))
  }, [])

  return (
    <Container>
      <Dashboard />
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const apiClient = getAPIClient(ctx)
  const { ['moreschi.token']: token } = parseCookies(ctx)

  if (!token) {
    return {
      redirect: {
        destination: '/entrar',
        permanent: false
      }
    }
  }

  return {
    props: {}
  }
}

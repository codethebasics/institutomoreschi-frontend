import * as DashboardService from '@/services/DashboardService'

import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import { getAPIClient } from '@/services/ApiClient'
import { useEffect } from 'react'
import { findById } from '@/services/UserService'
import { useState } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'

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
  width: 100%;
  max-width: 300px;
  margin: 0 auto;

  .title {
    text-transform: uppercase;
    font-weight: 500;
  }

  .count {
    font-size: 4rem;
    display: flex;
  }
`

const DashboardCard = ({ title, count, onClick }: any) => {
  return (
    <StyledDashboardCard onClick={onClick}>
      <div className="title">{title}</div>
      <div className="count">{count}</div>
    </StyledDashboardCard>
  )
}

const Container = styled.div`
  padding: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`

interface Count {
  totalPatients: number
  totalDentists: number
  totalSecretaries: number
  totalUsers: number
}

export default function Dashboard() {
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
      <DashboardCard
        title="Pacientes"
        count={totals?.totalPatients}
        onClick={() => handleNavigation('pacientes')}
      />
      <DashboardCard
        title="Dentistas"
        count={totals?.totalDentists}
        onClick={() => handleNavigation('dentistas')}
      />
      <DashboardCard
        title="Secretárias"
        count={totals?.totalSecretaries}
        onClick={() => handleNavigation('secretarias')}
      />
      <DashboardCard
        title="Usuários"
        count={totals?.totalUsers}
        onClick={() => handleNavigation('usuarios')}
      />
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

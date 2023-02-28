import { Timeline } from 'rsuite'
import { useState, useContext } from 'react'
import { Flex, Text } from '@chakra-ui/react'
import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import { AuthContext } from '@/context/AuthContext'

const HealthHistoryContainer = styled.div`
  padding: 1.5rem;
  display: flex;
  justify-content: center;
`

const Button = styled.div`
  background: #1864c7;
  color: #fff;
  display: flex;
  padding: 1.2rem;
  border-radius: 0.4rem;
  justify-content: center;
  font-weight: 500;
  &:active {
    opacity: 0.5;
  }
`

export default function HealthHistoryPage() {
  const { user }: any = useContext(AuthContext)

  const [medicalHistory, setMedicalHistory] = useState<any>(null)
  const router = useRouter()

  const handleClick = () => {
    router.push(`/pacientes/${user.id}/historico-medico`)
  }

  return (
    <HealthHistoryContainer>
      <Button onClick={handleClick}>Adicionar</Button>
    </HealthHistoryContainer>
  )
}

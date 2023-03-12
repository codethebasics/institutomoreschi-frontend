import styled from 'styled-components'
import styles from '@/styles/usuarios/UsersPage.module.scss'
import UserAvatar from '@/components/users/UserAvatar'

import * as PatientService from '@/services/PatientService'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

const Container = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
`

const SearchSection = styled.section`
  padding: 2rem 2rem 1rem;
`

const InputSearch = styled.input`
  padding: 0.5rem;
`

const PatientsSection = styled.section`
  padding: 1rem 2rem 2rem;
`

const PatientContainer = styled.div`
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .avatar {
    background: red;
    padding: 1rem;
  }

  .body {
    background: plum;
    padding: 1rem;
  }
`

const PatientAvatar = styled.div`
  background: lime;
  height: 75px;
  width: 75px;
  border-radius: 100%;
`

function Patient({ name, birthdate, email, healthInsurance, active }: any) {
  return (
    <PatientContainer>
      <div className="avatar">
        <PatientAvatar />
      </div>
      <div className="body">
        <div>
          <label>{name}</label>
          <label>{email}</label>
        </div>
        <div>
          <label>{healthInsurance}</label>
          <label>{birthdate}</label>
        </div>
        <label>active: {active}</label>
      </div>
    </PatientContainer>
  )
}

export default function PatientPage() {
  const [patients, setPatients] = useState<any>([])

  useEffect(() => {
    PatientService.list()
      .then(response => setPatients(response.data))
      .catch(e => console.error(e))
  }, [])

  return (
    <Container>
      <SearchSection>
        <InputSearch type="text" placeholder="Pesquisar..." />
      </SearchSection>
      <PatientsSection>
        {patients.map((p: any) => (
          <CardPatient
            key={p.id}
            id={p.id}
            name={p.user?.name}
            birthdate={p.birth_date}
            email={p.user?.email}
            active={p.user?.active}
          />
        ))}
      </PatientsSection>
    </Container>
  )
}

const UserStatusBadge = ({ status }: any) => {
  return (
    <div className={`${styles.statusBadge}`}>
      <div className={`${styles[status.toLowerCase()]}`}>
        {status.toLowerCase() === 'active' ? 'ativo' : 'inativo'}
      </div>
    </div>
  )
}

export const CardPatient = ({ id, name, email, phone, active }: any) => {
  const router = useRouter()

  const details = () => {
    router.push(`${process.env.NEXT_PUBLIC_APP_URL}/patients/${id}`)
  }

  return (
    <div className={styles.cardUser} onClick={details}>
      <div className={styles.avatar}>
        <UserAvatar user={{ id, name, email, active }} size={75} />
        <UserStatusBadge status={active} />
      </div>
      <div className={styles.info}>
        <div>{name}</div>
        <div>{email}</div>
        <div style={{ padding: '0.5rem 0' }}>{phone}</div>
      </div>
    </div>
  )
}

export const Patients = ({ usuarios, filter }: any) => {
  const _filter = filter.toLowerCase().trim()

  return (
    <div className={styles.userListContainer}>
      {usuarios
        .filter((patient: any) =>
          patient.user?.name.toLowerCase().includes(_filter)
        )
        .map((patient: any) => (
          <CardPatient
            key={patient.id}
            id={patient.id}
            name={patient.name}
            email={patient.email}
            phone={patient.phone}
            active={patient.active}
          />
        ))}
    </div>
  )
}

import PatientPage from './pacientes'

import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import { getAPIClient } from '@/services/ApiClient'
import { useEffect } from 'react'
import { findById } from '@/services/UserService'
import { useState } from 'react'

export default function Home() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const cookies = parseCookies()
    const token: any = cookies['moreschi.token']
    const parsedToken = JSON.parse(token)
    const user = parsedToken.user

    if (user.id) {
      findById(user.id)
        .then(response => {
          setUser(response.data.body)
          console.log('response', response.data.body)
        })
        .catch(e => console.error(e))
    }
  }, [])

  return (
    <>
      {user ? (
        <PatientPage
          name={user.name}
          email={user.email}
          phone={user.phone}
          photo={user.archives[0]}
        />
      ) : (
        <span>Carregando...</span>
      )}
    </>
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

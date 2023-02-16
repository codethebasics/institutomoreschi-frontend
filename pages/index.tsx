import PatientPage from './pacientes'

import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'

export default function Home() {
  return (
    <>
      <PatientPage />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
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

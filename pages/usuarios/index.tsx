import axios from 'axios'
import styles from '@/styles/usuarios/UsersPage.module.scss'

import { useState, useEffect } from 'react'

type User = {
  id: string
  name: string
  email: string
  active: string
}

export const UserList = ({ usuarios }: any) => {
  return (
    <div className={styles.userListContainer}>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {usuarios && usuarios.length
            ? usuarios.map((usuario: User) => (
                <tr key={usuario.id}>
                  <td>{usuario.name}</td>
                  <td>{usuario.email}</td>
                  <td>{usuario.active}</td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </div>
  )
}

export default function UsersPage() {
  const [usuarios, setUsuarios] = useState<User[]>([])

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/users/`, {
        headers: {
          Accept: 'application/json'
        }
      })
      .then(response => setUsuarios(() => response.data))
      .catch(e => console.error(e))
  }, [])

  return (
    <>
      <h3>Usuários cadastrados</h3>
      <br />
      <UserList usuarios={usuarios} />
    </>
  )
}

export async function getServerSideProps() {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/users/`,
    {
      headers: {
        Accept: 'application/json'
      }
    }
  )
  const usuarios = response.data
  return { props: { usuarios } }
}

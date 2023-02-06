import axios from 'axios'
import styles from '@/styles/usuarios/UsersPage.module.scss'
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch'

import { useState, useEffect } from 'react'

type User = {
  id: string
  name: string
  email: string
  active: string
}

const SearchInput = () => {
  return <input type="text" placeholder="Pesquisar por nome ou e-mail" />
}

const UserStatusBadge = ({ status }: any) => {
  return status.toLowerCase() === 'active' ? (
    <p className={`${styles.badge} ${styles.active}`}>&#10004;</p>
  ) : (
    <p className={`${styles.badge} ${styles.inactive}`}>&#10006;</p>
  )
}

export const UserList = ({ usuarios }: any) => {
  return (
    <div className={styles.userListContainer}>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>E-mail</th>
            <th style={{ textAlign: 'center' }}>Ativo</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {usuarios && usuarios.length
            ? usuarios.map((usuario: User) => (
                <tr key={usuario.id}>
                  <td>{usuario.name}</td>
                  <td>{usuario.email}</td>
                  <td style={{ textAlign: 'center' }}>
                    <UserStatusBadge status={usuario.active} />
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <ContentPasteSearchIcon
                      fontSize="large"
                      className={styles.detail}
                    />
                  </td>
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
    <div className={styles.userPageContainer}>
      <div className={styles.searchContainer}>
        <SearchInput />
      </div>
      <UserList usuarios={usuarios} />
    </div>
  )
}

import styles from '@/styles/usuarios/UsersPage.module.scss'
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch'
import axios from 'axios'

import UserAvatar from '@/components/users/UserAvatar'
import styled from '@emotion/styled'
import Link from 'next/link'
import { useEffect, useState } from 'react'

type User = {
  id: string
  name: string
  email: string
  active: string
}

const SearchInput = ({ text, onChange }: any) => {
  return (
    <input
      type="text"
      placeholder="Pesquisar por nome ou e-mail"
      value={text}
      onChange={onChange}
    />
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

export const CardUser = ({ id, name, email, active }: any) => {
  return (
    <div className={styles.cardUser}>
      <div className={styles.avatar}>
        <UserAvatar user={{ id, name, email, active }} size={75} />
        <UserStatusBadge status={active} />
      </div>
      <div className={styles.info}>
        <div>{name}</div>
        <div>{email}</div>
        <div>(61) 9 8577 0401</div>
      </div>
      <div className={styles.cta}>
        <Link href={`${process.env.NEXT_PUBLIC_APP_URL}/usuarios/${id}`}>
          <ContentPasteSearchIcon fontSize="large" />
        </Link>
      </div>
    </div>
  )
}

export const UserList = ({ usuarios, filter }: any) => {
  const _filter = filter.toLowerCase().trim()

  return (
    <div className={styles.userListContainer}>
      {usuarios
        .filter((usuario: any) => usuario.name.toLowerCase().includes(_filter))
        .map((usuario: any) => (
          <CardUser
            key={usuario.id}
            id={usuario.id}
            name={usuario.name}
            email={usuario.email}
            active={usuario.active}
          />
        ))}
    </div>
  )
}

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 1rem 0.5rem;
  border-top: 1px solid #ccc;
`

const AddButton = styled.button`
  font-size: 1.4rem;
  width: auto;
`

export default function UsersPage() {
  const [usuarios, setUsuarios] = useState<User[]>([])
  const [searchQuery, setSearchQuery] = useState('')

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

  const addUserButtonHandler = () => {
    console.log('clicked')
  }

  return (
    <div className={styles.userPageContainer}>
      <div className={styles.searchContainer}>
        <SearchInput
          text={searchQuery}
          onChange={(e: any) => setSearchQuery(e.target.value)}
        />
        <div
          className={styles.userCount}
        >{`${usuarios.length} usuários encontrados`}</div>
      </div>
      <UserList usuarios={usuarios} filter={searchQuery} />
      <Actions>
        <AddButton onClick={addUserButtonHandler}>Adicionar</AddButton>
      </Actions>
    </div>
  )
}

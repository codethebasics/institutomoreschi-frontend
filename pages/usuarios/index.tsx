import styles from '@/styles/usuarios/UsersPage.module.scss'
import axios from 'axios'

import UserAvatar from '@/components/users/UserAvatar'
import styled from '@emotion/styled'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function UsersPage() {
  const [usuarios, setUsuarios] = useState<User[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

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
    router.push('/usuarios/novo')
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
      <FloatingButton onClick={addUserButtonHandler}>
        <Image src={'/img/add-white.svg'} width={25} height={25} alt={'add'} />
      </FloatingButton>
    </div>
  )
}

type User = {
  id: string
  name: string
  email: string
  active: string
}

const SearchInput = ({ text, onChange }: any) => {
  return (
    <input
      style={{ fontSize: '1.4rem' }}
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

const RolesContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  padding: 0.5rem 0;
`

const RoleBadge = styled.div`
  background: #ccc;
  font-weight: 500;
  color: #222;
  border-radius: 0.4rem;
  display: inline-flex;
  padding: 0.25rem 0.5rem;
`

export const CardUser = ({ id, name, email, phone, active, roles }: any) => {
  const router = useRouter()

  const details = () => {
    router.push(`${process.env.NEXT_PUBLIC_APP_URL}/usuarios/${id}`)
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
        <RolesContainer>
          {roles
            ? roles.map((data: any) => (
                <RoleBadge key={data.role.id}>{data.role.name}</RoleBadge>
              ))
            : null}
        </RolesContainer>
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
            phone={usuario.phone}
            active={usuario.active}
            roles={usuario.user_role}
          />
        ))}
    </div>
  )
}

const FloatingButton = styled.button`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 10vh;
  right: 5vw;
  height: 5rem;
  width: 5rem;
  border-radius: 100%;
  background-color: rgba(0, 101, 255, 0.6);

  &:hover {
    background-color: rgba(0, 101, 255, 1);
  }
`

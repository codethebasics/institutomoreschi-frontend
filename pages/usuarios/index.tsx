import axios from 'axios'
import styles from '@/styles/usuarios/UsersPage.module.scss'
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch'
import Image from 'next/image'

import { useState, useEffect } from 'react'
import Link from 'next/link'

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
  return (
    <div className={`${styles.statusBadge}`}>
      <div className={`${styles[status.toLowerCase()]}`}>
        {status.toLowerCase() === 'active' ? 'ativo' : 'inativo'}
      </div>
    </div>
  )
}

export const CardUser = ({ id, name, email, img, active }: any) => {
  return (
    <div className={styles.cardUser}>
      <div className={styles.avatar}>
        <Image
          alt="Imagem do usuário"
          src={`https://randomuser.me/api/portraits/men/${img}.jpg`}
          width={75}
          height={75}
        />
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

export const UserList = ({ usuarios }: any) => {
  return (
    <div className={styles.userListContainer}>
      {usuarios.map((usuario: any) => (
        <CardUser
          key={usuario.id}
          id={usuario.id}
          name={usuario.name}
          email={usuario.email}
          active={usuario.active}
          img={Math.floor(Math.random() * 100)}
        />
      ))}
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

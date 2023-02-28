import styled from '@emotion/styled'
import Footer from './Footer'
import Header from './Header'

import styles from '@/styles/Layout.module.scss'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined'
import HealingOutlinedIcon from '@mui/icons-material/HealingOutlined'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import MenuIcon from '@mui/icons-material/Menu'
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined'

import { Lobster } from '@next/font/google'
import Link from 'next/link'
import { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import { AuthContext } from '@/context/AuthContext'
import { destroyCookie } from 'nookies'

const lobster = Lobster({
  weight: '400',
  subsets: ['latin']
})

const Brand = styled.label`
  font-size: 2rem;
  color: #444;
`
export default function Layout({ children }) {
  const { isAuthenticated, user } = useContext(AuthContext)
  const router = useRouter()

  const handleLogout = () => {
    destroyCookie(null, 'moreschi.token')
    router.push('/entrar')
  }

  return (
    <main id={styles.app}>
      <Header>
        <Brand>
          <div className={lobster.className}>Instituto Moreschi</div>
        </Brand>
        <MenuIcon color={'#222'} fontSize="large" />
      </Header>
      <div className={styles.content}>{children}</div>
      <Footer>
        <div className={styles.circle}>
          <Link href={'/'}>
            <HomeOutlinedIcon fontSize="large" />
          </Link>
        </div>
        <div className={styles.circle}>
          <Link href={'/usuarios'}>
            <DashboardOutlinedIcon fontSize="large" />
          </Link>
        </div>
        <div className={styles.circle}>
          <Link href={'/procedimentos'}>
            <HealingOutlinedIcon fontSize="large" />
          </Link>
        </div>
        <div className={styles.circle}>
          <Link href={'/notificacoes'}>
            <NotificationsOutlinedIcon fontSize="large" />
          </Link>
        </div>
        <div className={styles.circle}>
          <div onClick={handleLogout}>
            <LogoutOutlinedIcon fontSize="large" />
          </div>
        </div>
      </Footer>
    </main>
  )
}

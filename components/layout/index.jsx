import styled from '@emotion/styled'
import Footer from './Footer'
import Header from './Header'

import styles from '@/styles/Layout.module.scss'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import MenuIcon from '@mui/icons-material/Menu'
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined'

import { Lobster } from '@next/font/google'
import Link from 'next/link'

const lobster = Lobster({
  weight: '400',
  subsets: ['latin']
})

const Brand = styled.label`
  font-size: 2rem;
  color: #444;
`

export default function Layout({ children }) {
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
          <Link href={'/usuarios'}>
            <LocalHospitalOutlinedIcon fontSize="large" />
          </Link>
        </div>
        <div className={styles.circle}>
          <Link href={'/notificacoes'}>
            <NotificationsOutlinedIcon fontSize="large" />
          </Link>
        </div>
        <div className={styles.circle}>
          <Link href={'/entrar'}>
            <LogoutOutlinedIcon fontSize="large" />
          </Link>
        </div>
      </Footer>
    </main>
  )
}

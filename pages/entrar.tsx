import styles from '@/styles/auth/AuthPage.module.scss'
import Link from 'next/link'

import { useForm } from 'react-hook-form'
import MailOutlineIcon from '@mui/icons-material/MailOutline'

export default function AuthPage() {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isLoading, isSubmitting, isValid }
  } = useForm()

  const login = () => {
    const { email, password } = getValues()
    console.log('email', email)
    console.log('password', password)
  }

  const BottomControllers = () => {
    return (
      <div className={styles.bottomControllers}>
        <div>
          <Link href="/registrar">Registrar</Link>
        </div>
        <div>
          <Link href="/resetar-senha">Esqueci a senha</Link>
        </div>
      </div>
    )
  }

  const Footer = () => {
    return (
      <div className={styles.footer}>
        <div className={styles.email}>
          <MailOutlineIcon />
          suporte@institutomoreschi.com.br
        </div>
      </div>
    )
  }

  return (
    <div id={styles.authPageContainer}>
      <form id={styles.form} onSubmit={handleSubmit(login)}>
        <div>
          <label>E-mail</label>
          <input
            type="email"
            {...register('email', { required: true })}
            placeholder="joaodasilva@email.com"
          />
        </div>
        <div>
          <label>Senha</label>
          <input
            type="password"
            {...register('password', { required: true })}
            placeholder="•••••••"
          />
        </div>
        <div className={styles.cta}>
          <button type="submit" disabled={!isValid}>
            Entrar
          </button>
        </div>
      </form>
      <BottomControllers />
      <Footer />
    </div>
  )
}

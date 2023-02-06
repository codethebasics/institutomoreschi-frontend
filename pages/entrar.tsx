import styles from '@/styles/auth/AuthPage.module.scss'
import Link from 'next/link'

import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

export default function AuthPage() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { isValid }
  } = useForm()

  const login = () => {
    const { email, password } = getValues()
    console.log('email', email)
    console.log('password', password)
    reset()
    router.push('/')
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

  return (
    <div id={styles.authPageContainer}>
      <form id={styles.form} onSubmit={handleSubmit(login)}>
        <div>
          <label>E-mail</label>
          <input type="email" {...register('email', { required: true })} />
        </div>
        <div>
          <label>Senha</label>
          <input
            type="password"
            {...register('password', { required: true })}
          />
        </div>
        <div className={styles.cta}>
          <button type="submit" disabled={!isValid}>
            Entrar
          </button>
        </div>
      </form>
      <BottomControllers />
    </div>
  )
}

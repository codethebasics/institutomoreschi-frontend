import styles from '@/styles/auth/AuthPage.module.scss'
import styled from '@emotion/styled'
import Link from 'next/link'

import { AuthContext } from '@/context/AuthContext'
import { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

const SignInButton = styled.button`
  font-size: 1.4rem;
  width: auto;
  background: #1864c7;
  width: 100%;
`

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

export default function AuthPage() {
  const { signIn, user } = useContext(AuthContext)
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push('/')
    }
  }, [])

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { isValid }
  } = useForm()

  const login = async () => {
    const { email, password } = getValues()
    await signIn({ email, password })
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
          <SignInButton type="submit" disabled={!isValid}>
            Entrar
          </SignInButton>
        </div>
      </form>
      <BottomControllers />
    </div>
  )
}

import styles from '@/styles/auth/AuthPage.module.scss'
import styled from '@emotion/styled'
import Link from 'next/link'

import { AuthContext } from '@/context/AuthContext'
import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

const SignInButton = styled.button`
  font-size: 1.2rem;
  text-transform: uppercase;
  width: auto;
  font-weight: 500;
  background: #1864c7;
  width: 100%;
  color: #e7e7e7;
`

const BottomControllers = () => {
  return (
    <div className={styles.bottomControllers}>
      <div>
        <Link href="/registrar" style={{ fontSize: '1.2rem' }}>
          Registrar
        </Link>
      </div>
      <div>
        <Link href="/resetar-senha" style={{ fontSize: '1.2rem' }}>
          Esqueci a senha
        </Link>
      </div>
    </div>
  )
}

const MessageContainer = styled.div`
  background: #222;
  color: #fff;
  font-weight: 400;
  width: 100%;
  position: fixed;
  top: 0;
  left; 0;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

function Message({ children, show }: any) {
  return show ? (
    <MessageContainer>
      <div>{children}</div>
      <div>x</div>
    </MessageContainer>
  ) : null
}

export default function AuthPage() {
  const [message, setMessage] = useState<any>(null)
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

  const displayErrorMessage = (message: any) => {
    setMessage(message)
    console.log(message)
  }

  const login = async () => {
    const { email, password } = getValues()
    setMessage(undefined)
    signIn({ email, password })
      .then(response => console.log('response', response))
      .catch(e => displayErrorMessage(e.response.data.message))
  }

  return (
    <>
      <Message show={message}>{message}</Message>
      <div id={styles.authPageContainer}>
        <form id={styles.form} onSubmit={handleSubmit(login)}>
          <div>
            <Label>E-mail</Label>
            <input type="email" {...register('email', { required: true })} />
          </div>
          <div>
            <Label>Senha</Label>
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
    </>
  )
}

const Label = styled.label`
  font-size: 1.2rem;
  text-transform: uppercase;
  font-weight: 500;
  color: #bbbbbb;
`

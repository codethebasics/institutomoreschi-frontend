import styled from '@emotion/styled'
import axios from 'axios'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

const Container = styled.div`
  height: 100%;
  padding: 1rem;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr auto;
  grid-template-areas:
    'form'
    'action';
`

const HeadingSection = styled.section`
  padding: 1rem;
  font-size: 1.4rem;
  font-weight: 500;
`

const FormSection = styled.section`
  padding: 1rem;
  overflow-y: auto;
  max-height: 75vh;
`

const FormController = styled.div`
  display: flex;
  flex-direction: column;
`

const Label = styled.label`
  font-weight: 500;
  font-size: 1.4rem;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 1.5rem;
`

const Button = styled.button`
  background: #222;
  font-size: 1.4rem;
`

const RoleFormSection = styled.section`
  display: flex;
  flex-wrap: wrap;

  input {
    width: auto;
  }
`

const DentistaFormSection = styled.section`
  display: flex;
  flex-direction: column;
  column-gap: 1.5rem;
`

const PacienteFormSection = styled.section`
  display: flex;
  flex-direction: column;
  column-gap: 1.5rem;
`

const Role = styled.div`
  display: flex;
  row-gap: 1rem;
  column-gap: 1rem;
  align-items: center;
  column-gap: 1rem;
  padding: 0.5rem 1rem;

  label {
    cursor: pointer;
    font-size: 1.4rem;
  }
`

interface User {
  name: string
  email: string
  password: string
  active: string
  phone: string
}

interface Role {
  id: string
  name: string
  description: string
}

export default function UserNewPage() {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors }
  } = useForm()

  const [roles, setRoles] = useState<Role[]>([])
  const [rolesSelected, setRolesSelected] = useState<string[]>([])

  useEffect(() => {
    async function fetchRoles() {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/roles`
      )
      setRoles(response.data)
    }
    fetchRoles()
  }, [])

  const submit = async () => {
    const {
      name,
      email,
      password,
      phone,
      isAdmin,
      isPaciente,
      isDentista,
      isSecretaria
    } = getValues()

    const _roles: any = []
    const requestRoles = []

    if (isAdmin) _roles.push('admin')
    if (isPaciente) _roles.push('paciente')
    if (isDentista) _roles.push('dentista')
    if (isSecretaria) _roles.push('secretaria')

    const user: User = {
      name: name,
      email: email,
      password: password,
      phone: phone,
      active: 'INACTIVE'
    }

    const selectedRoles = roles
      .filter(role => _roles.includes(role.name))
      .map(role => role.id)

    setRolesSelected(selectedRoles)

    const request = { ...user, user_role: selectedRoles }

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/users`,
      request
    )

    // reset()
  }

  const checkIfEmailAlreadyExists = async () => {
    const { email } = getValues()
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/users/email/${email}`
    )
    if (response.data.body) {
      alert('o email já está cadastrado')
    }
  }

  return (
    <Container>
      <HeadingSection>Cadastro de usuário</HeadingSection>
      <FormSection>
        <Form onSubmit={handleSubmit(submit)}>
          <FormController>
            <Label>Nome</Label>
            <input type="text" {...register('name')} />
          </FormController>
          <FormController>
            <Label>E-mail</Label>
            <input
              type="text"
              {...register('email')}
              onBlur={checkIfEmailAlreadyExists}
            />
          </FormController>
          <FormController>
            <Label>Telefone</Label>
            <input type="text" {...register('phone')} />
          </FormController>
          <FormController>
            <Label>Senha</Label>
            <input type="password" {...register('password')} />
          </FormController>
          <RoleFormSection>
            <Role>
              <Label>
                <input type="checkbox" {...register('isAdmin')} />
                <span style={{ marginLeft: '1rem' }}>Admin</span>
              </Label>
            </Role>
            <Role>
              <Label>
                <input type="checkbox" {...register('isPaciente')} />
                <span style={{ marginLeft: '1rem' }}>Paciente</span>
              </Label>
            </Role>
            <Role>
              <Label>
                <input type="checkbox" {...register('isDentista')} />
                <span style={{ marginLeft: '1rem' }}>Dentista</span>
              </Label>
            </Role>
            <Role>
              <Label>
                <input type="checkbox" {...register('isSecretaria')} />
                <span style={{ marginLeft: '1rem' }}>Secretária</span>
              </Label>
            </Role>
          </RoleFormSection>
          <DentistaFormSection>
            <Label>CRO</Label>
            <input type="text" {...register('cro')} />
          </DentistaFormSection>
          <PacienteFormSection>
            <Label>Convênio</Label>
            <input type="text" {...register('cro')} />
          </PacienteFormSection>
          <FormController>
            <Button type="submit">Cadastrar</Button>
          </FormController>
        </Form>
      </FormSection>
    </Container>
  )
}

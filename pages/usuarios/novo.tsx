import styled from '@emotion/styled'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

const Container = styled.div`
  height: 100%;
`

const HeadingSection = styled.section`
  padding: 1rem;
  font-size: 1.8rem;
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
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 1.5rem;
`

const Button = styled.button`
  background: #222;
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
  }
`

export default function UserNewPage() {
  const { register, handleSubmit, reset, getValues } = useForm()

  const [selectedRoles, setSelectedRoles] = useState([])

  const submit = () => {
    console.log('submit')
    const { name, email, password } = getValues()
    reset()
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
            <input type="text" {...register('email')} />
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
                <input type="checkbox" />
                <span style={{ marginLeft: '1rem' }}>Admin</span>
              </Label>
            </Role>
            <Role>
              <Label>
                <input type="checkbox" />
                <span style={{ marginLeft: '1rem' }}>Paciente</span>
              </Label>
            </Role>
            <Role>
              <Label>
                <input type="checkbox" />
                <span style={{ marginLeft: '1rem' }}>Dentista</span>
              </Label>
            </Role>
            <Role>
              <Label>
                <input type="checkbox" />
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
            <br />
            <Button type="submit">Cadastrar</Button>
          </FormController>
        </Form>
      </FormSection>
    </Container>
  )
}

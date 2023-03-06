import Image from 'next/image'
import styles from './TableForm.module.scss'
import styled from 'styled-components'
import { useEffect, useState } from 'react'

const StatusLabel = styled.div<any>`
  background-color: ${props => (props.active ? '#3457ca' : '#fff')};
  border-radius: 0.4rem;
  border: ${props =>
    props.active ? '1px solid transparent' : '1px solid #888'};
  color: ${props => (props.active ? '#fff' : '#888')};
  text-align: center;
`

const ModalDetailsOverlay = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background: rgba(0, 0, 0, 0.8);
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  color: #fff;
  padding: 1rem 2.5rem;
`

const ModalDetailsContainer = styled.div`
  background: #f5f5f5;
  color: #222;
  padding: 1rem;
  margin-top: 2.5rem;
  border-radius: 0.4rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 1rem;
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.4rem;
  font-weight: 500;
`

const ActionGroup = styled.div`
  display: flex;
  font-size: 1.4rem;
  font-weight: 500;
  gap: 1rem;
  margin-top: 1rem;
`

const Button = styled.button`
  background: #222;
  color: #fff;
  font-size: 1.4rem;
`

const ModalDetails = ({ item, cancel, update }: any) => {
  return (
    <ModalDetailsOverlay>
      <ModalDetailsContainer>
        <FormGroup>
          <label>Nome do procedimento</label>
          <input type="text" />
        </FormGroup>
        <FormGroup>
          <label>Valor base</label>
          <input type="text" placeholder="R$" />
        </FormGroup>
        <ActionGroup>
          <Button onClick={cancel}>Cancelar</Button>
          <Button onClick={update}>Alterar</Button>
        </ActionGroup>
      </ModalDetailsContainer>
    </ModalDetailsOverlay>
  )
}

export default function TableForm() {
  const [showDetails, setShowDetails] = useState<any>(null)

  useEffect(() => {
    console.log('show details')
  }, [showDetails])

  const displayDetails = (item: any) => {
    setShowDetails(true)
  }

  return (
    <div className={styles.container}>
      <table>
        <thead>
          <tr>
            <th>nome</th>
            <th>valor base</th>
            <th>status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Periodontia</td>
            <td>R$150,00</td>
            <td>
              <StatusLabel active={true}>disponível</StatusLabel>
            </td>
            <td>
              <Image
                alt="Ações"
                src={'/img/lightning.svg'}
                height={17}
                width={17}
                onClick={() => displayDetails({ item: 1 })}
              />
            </td>
          </tr>
          <tr>
            <td>Endodontia</td>
            <td>R$250,00</td>
            <td>
              <StatusLabel active={true}>disponível</StatusLabel>
            </td>
            <td>
              <Image
                alt="Ações"
                src={'/img/lightning.svg'}
                height={17}
                width={17}
              />
            </td>
          </tr>
          <tr>
            <td>Ortodontia</td>
            <td>R$350,00</td>
            <td>
              <StatusLabel active={false}>indisponível</StatusLabel>
            </td>
            <td>
              <Image
                alt="Ações"
                src={'/img/lightning.svg'}
                height={17}
                width={17}
              />
            </td>
          </tr>
        </tbody>
      </table>
      {showDetails ? (
        <ModalDetails
          item={{ item: 1 }}
          cancel={() => setShowDetails(false)}
          update={() => setShowDetails(false)}
        />
      ) : null}
    </div>
  )
}

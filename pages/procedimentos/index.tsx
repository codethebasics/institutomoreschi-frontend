import { useRouter } from 'next/router'
import styled from 'styled-components'

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: auto;
  padding: 1rem;
`

const ProcedimentosContainer = styled.div`
  overflow-y: auto;
  display: flex;
  align-items: flex-start;
  justify-content: strech;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
`

const ProcedimentoCard = styled.div`
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 0.4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
  padding: 1rem;
  font-size: 1.4rem;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    box-shadow: 0 3px 10px #ddd;
  }
`

const ProcedimentoNameContainer = styled.div`
  flex-grow: 1;
  padding: 1rem;
  font-weight: 500;
  font-size: 1.6rem;
`

const ProcedimentoDetalhesContainer = styled.div`
  padding: 1rem;
  text-align: left;
  > div:first-child {
    font-weight: 500;
  }
`

const CadastroProcedimentoContainer = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: flex-end;
`

const SearchContainer = styled.div``

const StatusLabel = styled.div<any>`
  background-color: ${props => (props.active ? '#37b837' : 'tomato')};
  border-radius: 0.4rem;
  color: #fff;
  padding: 0 0.5rem;
`

const CadastrarButton = styled.button<any>`
  background: rgba(22, 22, 22, 0.7);
  color: #fff;
  padding: 0.5rem 1rem;
  font-size: 1.4rem;
  width: auto;
  &:hover {
    background: rgba(22, 22, 22, 1);
  }
`

export default function ProcedurePage() {
  const router = useRouter()

  const submit = () => {
    router.push('/procedimentos/novo')
  }

  return (
    <Container>
      <div>
        <SearchContainer>
          <input
            type={'text'}
            style={{ padding: '0.5rem 1rem' }}
            placeholder="Pesquisar"
          />
        </SearchContainer>
        <ProcedimentosContainer>
          <ProcedimentoCard>
            <ProcedimentoNameContainer>Periodontia</ProcedimentoNameContainer>
            <ProcedimentoDetalhesContainer>
              <div>R$200,00</div>
              <StatusLabel active={true}>disponível</StatusLabel>
            </ProcedimentoDetalhesContainer>
          </ProcedimentoCard>
          <ProcedimentoCard>
            <ProcedimentoNameContainer>Ortodontia</ProcedimentoNameContainer>
            <ProcedimentoDetalhesContainer>
              <div>R$150,00</div>
              <StatusLabel active={true}>disponível</StatusLabel>
            </ProcedimentoDetalhesContainer>
          </ProcedimentoCard>
          <ProcedimentoCard>
            <ProcedimentoNameContainer>Endodontia</ProcedimentoNameContainer>
            <ProcedimentoDetalhesContainer>
              <div>R$350,00</div>
              <StatusLabel active={true}>disponível</StatusLabel>
            </ProcedimentoDetalhesContainer>
          </ProcedimentoCard>
          <ProcedimentoCard>
            <ProcedimentoNameContainer>Clareamento</ProcedimentoNameContainer>
            <ProcedimentoDetalhesContainer>
              <div>R$100,00</div>
              <StatusLabel active={false}>indisponível</StatusLabel>
            </ProcedimentoDetalhesContainer>
          </ProcedimentoCard>
          <ProcedimentoCard>
            <ProcedimentoNameContainer>Periodontia</ProcedimentoNameContainer>
            <ProcedimentoDetalhesContainer>
              <div>R$200,00</div>
              <StatusLabel active={true}>disponível</StatusLabel>
            </ProcedimentoDetalhesContainer>
          </ProcedimentoCard>
          <ProcedimentoCard>
            <ProcedimentoNameContainer>Ortodontia</ProcedimentoNameContainer>
            <ProcedimentoDetalhesContainer>
              <div>R$150,00</div>
              <StatusLabel active={true}>disponível</StatusLabel>
            </ProcedimentoDetalhesContainer>
          </ProcedimentoCard>
          <ProcedimentoCard>
            <ProcedimentoNameContainer>Endodontia</ProcedimentoNameContainer>
            <ProcedimentoDetalhesContainer>
              <div>R$350,00</div>
              <StatusLabel active={true}>disponível</StatusLabel>
            </ProcedimentoDetalhesContainer>
          </ProcedimentoCard>
          <ProcedimentoCard>
            <ProcedimentoNameContainer>Clareamento</ProcedimentoNameContainer>
            <ProcedimentoDetalhesContainer>
              <div>R$100,00</div>
              <StatusLabel active={false}>indisponível</StatusLabel>
            </ProcedimentoDetalhesContainer>
          </ProcedimentoCard>
          <ProcedimentoCard>
            <ProcedimentoNameContainer>Periodontia</ProcedimentoNameContainer>
            <ProcedimentoDetalhesContainer>
              <div>R$200,00</div>
              <StatusLabel active={true}>disponível</StatusLabel>
            </ProcedimentoDetalhesContainer>
          </ProcedimentoCard>
          <ProcedimentoCard>
            <ProcedimentoNameContainer>Ortodontia</ProcedimentoNameContainer>
            <ProcedimentoDetalhesContainer>
              <div>R$150,00</div>
              <StatusLabel active={true}>disponível</StatusLabel>
            </ProcedimentoDetalhesContainer>
          </ProcedimentoCard>
          <ProcedimentoCard>
            <ProcedimentoNameContainer>Endodontia</ProcedimentoNameContainer>
            <ProcedimentoDetalhesContainer>
              <div>R$350,00</div>
              <StatusLabel active={true}>disponível</StatusLabel>
            </ProcedimentoDetalhesContainer>
          </ProcedimentoCard>
          <ProcedimentoCard>
            <ProcedimentoNameContainer>Clareamento</ProcedimentoNameContainer>
            <ProcedimentoDetalhesContainer>
              <div>R$100,00</div>
              <StatusLabel active={false}>indisponível</StatusLabel>
            </ProcedimentoDetalhesContainer>
          </ProcedimentoCard>
        </ProcedimentosContainer>
      </div>
      <CadastroProcedimentoContainer>
        <CadastrarButton onClick={submit}>cadastrar</CadastrarButton>
      </CadastroProcedimentoContainer>
    </Container>
  )
}

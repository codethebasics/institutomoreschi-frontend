import { AuthContext } from '@/context/AuthContext'
import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { format } from 'date-fns'

const HealthHistoryContainer = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const Button = styled.div`
  background: #1864c7;
  color: #fff;
  display: flex;
  padding: 1.2rem;
  border-radius: 0.4rem;
  justify-content: center;
  font-weight: 500;
  &:active {
    opacity: 0.5;
  }
`
const MedicalHistoryItemStyle = styled.li`
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-itens: center;
  font-size: 1.4rem;
  font-weight: 500;
  color: #555;
  border-bottom: 1px solid #ddd;
`

const Badge = styled.div`
  background: ${props => (props.color ? props.color : '#222')};
  color: #fff;
  padding: 0 1rem;
  border-radius: 4px;
  display: flex;
  margin-bottom: 0.5rem;
`

const MedicalHistoryItem = ({ item }: any) => {
  return (
    <MedicalHistoryItemStyle key={item.id}>
      <div>
        <div>{item.description}</div>
        <div>{format(new Date(item.updated_at), 'dd/MM/yyyy HH:mm')}</div>
      </div>
      <div>
        <Badge>Dr(a). {item?.dentist?.user?.name.split(' ')[0]}</Badge>
      </div>
    </MedicalHistoryItemStyle>
  )
}

const MedicalHistory = ({ patientId }: any) => {
  const [medicalHistory, setMedicalHistory] = useState<any>(null)

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/medical-history/patientId/${patientId}`
      ).then(response => response.json())
      console.log('response', response)
      setMedicalHistory(response)
    }
    fetchData()
  }, [])

  return (
    <div>
      <label>Histórico médico</label>
      <ul style={{ listStyleType: 'none' }}>
        {medicalHistory &&
          medicalHistory.map(item => (
            <MedicalHistoryItem item={item} key={item.id} />
          ))}
      </ul>
    </div>
  )
}

const AnamneseContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const AnamneseData = styled.div`
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
`

const AnamneseDataCard = styled.div`
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  padding: 1.5rem;
  margin: 1.5rem 0;
  display: flex;
  flex-direction: column;
  font-size: 1.4rem;
  color: #444;
`

const AnamneseDataCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  flex-grow: 1;
`

const AnamneseDataCardBody = styled.div`
  display: flex;
  flex-direction: column;
  background: #f9f9f9;
  border-radius: 4px;
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  > div {
    font-weight: 500;
    font-size: 1.2rem;
  }
`

const Anamnese = ({ id }: any) => {
  const [anamnese, setAnamnese] = useState<any>(null)

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/anamnese/id/${id}`
      ).then(response => response.json())
      console.log('anamnese', response)
      setAnamnese(response)
    }
    fetchData()
  }, [])

  return (
    <AnamneseContainer>
      <AnamneseData>
        <AnamneseDataCard>
          <AnamneseDataCardHeader>
            <div>Motivo da consulta</div>
          </AnamneseDataCardHeader>
          <AnamneseDataCardBody>
            <div>{anamnese?.reasonForConsultation}</div>
          </AnamneseDataCardBody>
        </AnamneseDataCard>
        <AnamneseDataCard>
          <AnamneseDataCardHeader>
            <div>Está sobre tratamento médico</div>
            <div>{anamnese?.isUnderMedicalTreatment ? '✗' : '✓'}</div>
          </AnamneseDataCardHeader>
        </AnamneseDataCard>
        <AnamneseDataCard>
          <AnamneseDataCardHeader>
            <div>Toma algum medicamento</div>
            <div>{anamnese?.takeSomeMedicine ? '✗' : '✓'}</div>
          </AnamneseDataCardHeader>
          <AnamneseDataCardBody>
            <div>{anamnese?.medicationsUsed}</div>
          </AnamneseDataCardBody>
        </AnamneseDataCard>
        <AnamneseDataCard>
          <AnamneseDataCardHeader>
            <div>Histórico de saúde familiar</div>
          </AnamneseDataCardHeader>
          <AnamneseDataCardBody>
            <div>{anamnese?.familyHistoryOfIllnesses}</div>
          </AnamneseDataCardBody>
        </AnamneseDataCard>
        <AnamneseDataCard>
          <AnamneseDataCardHeader>
            <div>Já teve hipertensão / ataque cardíaco</div>
            <div>
              {anamnese?.everHadHypertensionHeartAttackOrOther ? '✗' : '✓'}
            </div>
          </AnamneseDataCardHeader>
          <AnamneseDataCardBody>
            {anamnese?.everHadHypertensionHeartAttackOrOtherDescription}
          </AnamneseDataCardBody>
        </AnamneseDataCard>
        <AnamneseDataCard>
          <AnamneseDataCardHeader>
            <div>Já teve febre reumática</div>
            <div>{anamnese?.everHadRheumaticFever ? '✗' : '✓'}</div>
          </AnamneseDataCardHeader>
          <AnamneseDataCardBody>
            <div>{anamnese?.everHadRheumaticFeverDescription}</div>
          </AnamneseDataCardBody>
        </AnamneseDataCard>
        <AnamneseDataCard>
          <AnamneseDataCardHeader>
            <div>Histórico oncológico (câncer)</div>
            <div>{anamnese?.everHadCancer ? '✗' : '✓'}</div>
          </AnamneseDataCardHeader>
          <AnamneseDataCardBody>
            <div>{anamnese?.everHadCancerDescription}</div>
          </AnamneseDataCardBody>
        </AnamneseDataCard>
        <AnamneseDataCard>
          <AnamneseDataCardHeader>
            <div>Histórico de diabetes</div>
            <div>{anamnese?.everHadDiabetes ? '✗' : '✓'}</div>
          </AnamneseDataCardHeader>
          <AnamneseDataCardBody>
            <div>{anamnese?.everHadDiabetesDescription}</div>
          </AnamneseDataCardBody>
        </AnamneseDataCard>
        <AnamneseDataCard>
          <AnamneseDataCardHeader>
            <div>Histórico de reações adversas à penincilina</div>
            <div>{anamnese?.everHadReactionToPenicillin ? '✗' : '✓'}</div>
          </AnamneseDataCardHeader>
          <AnamneseDataCardBody>
            <div>{anamnese?.everHadReactionToPenicillinDescription}</div>
          </AnamneseDataCardBody>
        </AnamneseDataCard>
        <AnamneseDataCard>
          <AnamneseDataCardHeader>
            <div>Já teve hepatite</div>
            <div>{anamnese?.everHadHepatitis ? '✗' : '✓'}</div>
          </AnamneseDataCardHeader>
          <AnamneseDataCardBody>
            <div>{anamnese?.everHadHepatitisDescription}</div>
          </AnamneseDataCardBody>
        </AnamneseDataCard>

        <AnamneseDataCard>
          <AnamneseDataCardHeader>
            <div>Foi vacinado contra hepatite B</div>
            <div>
              {anamnese?.haveBeenVaccinatedAgainstHepatitisB ? '✗' : '✓'}
            </div>
          </AnamneseDataCardHeader>
        </AnamneseDataCard>
        <AnamneseDataCard>
          <AnamneseDataCardHeader>
            <div>Histórico hepático</div>
            <div>{anamnese?.anyLiverProblems ? '✗' : '✓'}</div>
          </AnamneseDataCardHeader>
          <AnamneseDataCardBody>
            <div>{anamnese?.anyLiverProblemsDescription}</div>
          </AnamneseDataCardBody>
        </AnamneseDataCard>
        <AnamneseDataCard>
          <AnamneseDataCardHeader>
            <div>Histórico renal</div>
            <div>{anamnese?.anyKidneyProblems ? '✗' : '✓'}</div>
          </AnamneseDataCardHeader>
          <AnamneseDataCardBody>
            <div>{anamnese?.anyKidneyProblemsDescription}</div>
          </AnamneseDataCardBody>
        </AnamneseDataCard>
        <AnamneseDataCard>
          <AnamneseDataCardHeader>
            <div>Reação contra anestesia</div>
            <div>{anamnese?.everHadReactionAgainstAnesthesia ? '✗' : '✓'}</div>
          </AnamneseDataCardHeader>
          <AnamneseDataCardBody>
            <div>{anamnese?.everHadReactionAgainstAnesthesiaDescription}</div>
          </AnamneseDataCardBody>
        </AnamneseDataCard>
        <AnamneseDataCard>
          <AnamneseDataCardHeader>
            <div>Gestante</div>
            <div>{anamnese?.isPregnant ? '✗' : '✓'}</div>
          </AnamneseDataCardHeader>
          <AnamneseDataCardBody>
            <div>{anamnese?.isPregnantDescription}</div>
          </AnamneseDataCardBody>
        </AnamneseDataCard>
        <AnamneseDataCard>
          <AnamneseDataCardHeader>
            <div>Ex-fumante</div>
            <div>{anamnese?.wasSmoker ? '✗' : '✓'}</div>
          </AnamneseDataCardHeader>
          <AnamneseDataCardBody>
            <div>{anamnese?.wasSmokerDescription}</div>
          </AnamneseDataCardBody>
        </AnamneseDataCard>

        <AnamneseDataCard>
          <AnamneseDataCardHeader>
            <div>Fumante</div>
            <div>{anamnese?.isSmoker ? '✗' : '✓'}</div>
          </AnamneseDataCardHeader>
          <AnamneseDataCardBody>
            <div>{anamnese?.isSmokerDescription}</div>
          </AnamneseDataCardBody>
        </AnamneseDataCard>
        <AnamneseDataCard>
          <AnamneseDataCardHeader>
            <div>Consome álcool</div>
            <div>{anamnese?.drinksAlchol ? '✗' : '✓'}</div>
          </AnamneseDataCardHeader>
          <AnamneseDataCardBody>
            <div>{anamnese?.drinksAlcholDescription}</div>
          </AnamneseDataCardBody>
        </AnamneseDataCard>

        <AnamneseDataCard>
          <AnamneseDataCardHeader>
            <div>Usa drogas</div>
            <div>{anamnese?.useDrugs ? '✗' : '✓'}</div>
          </AnamneseDataCardHeader>
          <AnamneseDataCardBody>
            <div>{anamnese?.useDrugsDescription}</div>
          </AnamneseDataCardBody>
        </AnamneseDataCard>
      </AnamneseData>
    </AnamneseContainer>
  )
}

export default function HealthHistoryPage() {
  const { user }: any = useContext(AuthContext)

  const [medicalHistory, setMedicalHistory] = useState<any>(null)
  const router = useRouter()

  const { id } = router.query

  useEffect(() => {
    async function fetchData() {
      if (id) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/medical-history/patientId/${id}`
        ).then(response => response.json())
        setMedicalHistory(response)
      }
    }
    fetchData()
  }, [])

  const handleClick = () => {
    router.push(`/pacientes/${user.id}/historico-medico`)
  }

  return (
    <HealthHistoryContainer>
      {medicalHistory ? (
        <MedicalHistory patientId={'cle5z5hlj000etzucmk4ybe4y'} />
      ) : null}
      <Anamnese id={'cleq9d6pi0000tzao27xr0grc'} />
      <Button onClick={handleClick}>Adicionar</Button>
    </HealthHistoryContainer>
  )
}

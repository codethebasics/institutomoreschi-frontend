import { AuthContext } from '@/context/AuthContext'
import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { format } from 'date-fns'
import Image from 'next/image'

const HealthHistoryContainer = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`

const MedicalHistoryItemStyle = styled.li`
  padding: 1rem;
  margin: 0 0.5rem;
  display: flex;
  justify-content: space-between;
  align-itens: center;
  font-size: 1.4rem;
  font-weight: 500;
  color: #555;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 0.3rem 1rem #ddd;
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
      setMedicalHistory(response)
    }
    fetchData()
  }, [])

  return (
    <div>
      <div style={{ padding: '0 1rem 1rem 1rem' }}>
        <Label>Histórico</Label>
      </div>
      <ul style={{ listStyleType: 'none' }}>
        {medicalHistory &&
          medicalHistory.map(item => (
            <div
              style={{ display: 'flex', flexDirection: 'column' }}
              key={item.id}
            >
              <div>
                <MedicalHistoryItem item={item} />
              </div>
              <div
                style={{
                  fontSize: '1.3rem',
                  alignSelf: 'flex-end',
                  padding: '0 1rem'
                }}
              >
                <label>Visualizar</label>
              </div>
            </div>
          ))}
      </ul>
    </div>
  )
}

const AnamneseContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`

const AnamneseData = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  height: 100%;
  border-radius: 0.4rem;
`

const AnamneseDataCard = styled.div`
  box-shadow: rgba(149, 157, 165, 0.2) 0px 5px 5px;
  border-radius: 0.4rem;
  padding: 1rem;
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  font-size: 1.4rem;
  border: 1px solid #ddd;
  background: #fff;
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
      setAnamnese(response)
    }
    fetchData()
  }, [])

  return (
    <AnamneseContainer>
      <div style={{ padding: '1rem 1rem 0 1rem' }}>
        <Label>Anamnese</Label>
      </div>
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
      <FloatingButton onClick={handleClick}>
        <Image src={'/img/add-white.svg'} width={25} height={25} alt={'add'} />
      </FloatingButton>
    </HealthHistoryContainer>
  )
}

const Label = styled.label`
  font-size: 1.4rem;
  font-weight: 500;
`

const FloatingButton = styled.button`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 10vh;
  right: 5vw;
  height: 5rem;
  width: 5rem;
  border-radius: 100%;
  background-color: rgba(0, 101, 255, 0.6);

  &:hover {
    background-color: rgba(0, 101, 255, 1);
  }
`

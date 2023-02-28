import styled from 'styled-components'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { parseCookies } from 'nookies'

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  background-color: red;
  outline: none;
  cursor: pointer;
  width: 20px;
  height: 20px;
  margin-top: 1rem;
`

interface Form {
  patientId: string
  reasonForConsultation?: string
  isUnderMedicalTreatment?: boolean
  takeSomeMedicine?: boolean
  medicationsUsed?: string
  familyHistoryOfIllnesses?: string
  everHadHypertensionHeartAttackOrOther?: boolean
  everHadHypertensionHeartAttackOrOtherDescription?: string
  everHadRheumaticFever?: boolean
  everHadRheumaticFeverDescription?: string
  everHadCancer?: boolean
  everHadCancerDescription?: string
  everHadDiabetes?: boolean
  everHadDiabetesDescription?: string
  everHadClottingRelatedProblems?: boolean
  everHadClottingRelatedProblemsDescription?: string
  everHadReactionToPenicillin?: boolean
  everHadReactionToPenicillinDescription?: string
  everHadHepatitis?: boolean
  everHadHepatitisDescription: string
  haveBeenVaccinatedAgainstHepatitisB?: boolean
  anyLiverProblems?: boolean
  anyLiverProblemsDescription?: string
  anyKidneyProblems?: boolean
  anyKidneyProblemsDescription?: string
  everHadReactionAgainstAnesthesia?: boolean
  everHadReactionAgainstAnesthesiaDescription?: string
  isPregnant?: boolean
  isPregnantDescription?: string
  wasSmoker?: boolean
  wasSmokerDescription?: string
  isSmoker?: boolean
  isSmokerDescription?: string
  drinksAlchol?: boolean
  drinksAlcholDescription?: string
  useDrugs?: boolean
  useDrugsDescription?: string
}

export default function PatientMedicalHistoryPage() {
  const [patientId, setPatientId] = useState<any>(null)
  const [history, setHistory] = useState<any>(null)
  const [isUnderMedicalTreatmentChecked, setIsUnderMedicalTreatmentChecked] =
    useState(false)
  const [isTakeSomeMedicineChecked, setIsTakeSomeMedicineChecked] =
    useState(false)

  const {
    register,
    handleSubmit,
    reset,
    watch,
    getValues,
    formState: { isValid }
  } = useForm()

  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    console.log('obtendo dados do paciente...')
    async function fetchData() {
      const cookies = parseCookies()
      const token: any = cookies['moreschi.token']
      const parsedToken = JSON.parse(token)
      const user = parsedToken.user

      if (user && user.email) {
        const response: any = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/patients?email=${user.email}`
        )
        setPatientId(response.data.id)
      }
    }
    fetchData()
  })

  useEffect(() => {
    console.log('isTakeSomeMedicineChecked alterado')
  }, [isTakeSomeMedicineChecked])

  const submit = () => {
    let _history = getValues()
    _history = { ..._history, patientId: patientId }
    setHistory(_history)
    console.log('history', _history)
  }

  const handleCheckboxClick = (checkboxName: string) => {
    const checkbox = getValues(checkboxName)
    console.log('checkboxName', checkboxName)
    switch (checkboxName) {
      case 'isUnderMedicalTreatment':
        setIsUnderMedicalTreatmentChecked(checkbox)
        break

      case 'takeSomeMedicine':
        console.log('cai', !checkbox)
        setIsTakeSomeMedicineChecked(checkbox)
        break
    }
  }

  return (
    <Container>
      <form onSubmit={handleSubmit(submit)}>
        <FormControl>
          <Label>Motivo para consulta</Label>
          <input type="text" {...register('reasonForConsultation')} />
        </FormControl>
        <FormControl>
          <Label>Está sob tratamento médico?</Label>
          <Checkbox
            {...register('isUnderMedicalTreatment')}
            onClick={() => handleCheckboxClick('isUnderMedicalTreatment')}
          />
        </FormControl>
        <FormControl>
          <Label>Está tomando algum remédio?</Label>
          <Checkbox
            {...register('takeSomeMedicine')}
            onChange={() => handleCheckboxClick('takeSomeMedicine')}
          />
        </FormControl>

        <FormControl>
          <Label>Quais?</Label>
          <input type="text" {...register('medicationsUsed')} />
        </FormControl>

        <FormControl>
          <Label>Histórico de doenças na família</Label>
          <textarea {...register('familyHistoryOfIllnesses')}></textarea>
        </FormControl>
        <FormControl>
          <Label>
            Já teve hipertensão, ataque cardíaco ou doenças do coração?
          </Label>
          <Checkbox
            {...register('everHadHypertensionHeartAttackOrOther')}
            onClick={() =>
              handleCheckboxClick('everHadHypertensionHeartAttackOrOther')
            }
          />
        </FormControl>
        <FormControl>
          <Label>Descreva</Label>
          <input
            {...register('everHadHypertensionHeartAttackOrOtherDescription')}
          />
        </FormControl>
        <FormControl>
          <Label>Já teve febre reumática?</Label>
          <Checkbox
            {...register('everHadRheumaticFever')}
            onClick={() => handleCheckboxClick('everHadRheumaticFever')}
          />
        </FormControl>
        <FormControl>
          <Label>Descreva</Label>
          <input {...register('everHadRheumaticFeverDescription')} />
        </FormControl>
        <FormControl>
          <Label>Já teve câncer?</Label>
          <Checkbox
            {...register('everHadCancer')}
            onClick={() => handleCheckboxClick('everHadCancer')}
          />
        </FormControl>
        <FormControl>
          <Label>Descreva</Label>
          <input {...register('everHadCancerDescription')} />
        </FormControl>
        <FormControl>
          <Label>Sofre de diabetes?</Label>
          <Checkbox
            {...register('everHadDiabetes')}
            onClick={() => handleCheckboxClick('everHadDiabetes')}
          />
        </FormControl>
        <FormControl>
          <Label>Descreva</Label>
          <input {...register('everHadDiabetesDescription')} />
        </FormControl>
        <FormControl>
          <Label>Já teve problemas relacionados à circulação?</Label>
          <Checkbox
            {...register('everHadClottingRelatedProblems')}
            onClick={() =>
              handleCheckboxClick('everHadClottingRelatedProblems')
            }
          />
        </FormControl>
        <FormControl>
          <Label>Descreva</Label>
          <input {...register('everHadClottingRelatedProblemsDescription')} />
        </FormControl>
        <FormControl>
          <Label>Já teve reação adversa à penincilina?</Label>
          <Checkbox
            {...register('everHadReactionToPenicillin')}
            onClick={() => handleCheckboxClick('everHadReactionToPenicillin')}
          />
        </FormControl>
        <FormControl>
          <Label>Descreva</Label>
          <input {...register('everHadReactionToPenicillinDescription')} />
        </FormControl>
        <FormControl>
          <Label>Tem ou já teve hepatite?</Label>
          <Checkbox
            {...register('everHadHepatitis')}
            onClick={() => handleCheckboxClick('everHadHepatitis')}
          />
        </FormControl>
        <FormControl>
          <Label>Descreva</Label>
          <input {...register('everHadHepatitisDescription')} />
        </FormControl>
        <FormControl>
          <Label>Já foi vacinado contra hepatite B?</Label>
          <Checkbox
            {...register('haveBeenVaccinatedAgainstHepatitisB')}
            onClick={() =>
              handleCheckboxClick('haveBeenVaccinatedAgainstHepatitisB')
            }
          />
        </FormControl>
        <FormControl>
          <Label>Já teve algum problema hepático?</Label>
          <Checkbox
            {...register('anyLiverProblems')}
            onClick={() => handleCheckboxClick('anyLiverProblems')}
          />
        </FormControl>
        <FormControl>
          <Label>Descreva</Label>
          <input {...register('anyLiverProblemsDescription')} />
        </FormControl>
        <FormControl>
          <Label>Já teve algum problema renal?</Label>
          <Checkbox
            {...register('anyKidneyProblems')}
            onClick={() => handleCheckboxClick('anyKidneyProblems')}
          />
        </FormControl>
        <FormControl>
          <Label>Descreva</Label>
          <input {...register('anyKidneyProblemsDescription')} />
        </FormControl>
        <FormControl>
          <Label>Já teve alguma reação adversa à anestesia?</Label>
          <Checkbox
            {...register('everHadReactionAgainstAnesthesia')}
            onClick={() =>
              handleCheckboxClick('everHadReactionAgainstAnesthesia')
            }
          />
        </FormControl>
        <FormControl>
          <Label>Descreva</Label>
          <input {...register('everHadReactionAgainstAnesthesiaDescription')} />
        </FormControl>
        <FormControl>
          <Label>Está grávida?</Label>
          <Checkbox
            {...register('isPregnant')}
            onClick={() => handleCheckboxClick('isPregnant')}
          />
        </FormControl>
        <FormControl>
          <Label>Quantas semanas?</Label>
          <input {...register('isPregnantDescription')} />
        </FormControl>
        <FormControl>
          <Label>Já foi fumante?</Label>
          <Checkbox
            {...register('wasSmoker')}
            onClick={() => handleCheckboxClick('wasSmoker')}
          />
        </FormControl>
        <FormControl>
          <Label>Por quanto tempo?</Label>
          <input {...register('wasSmokerDescription')} />
        </FormControl>
        <FormControl>
          <Label>É fumante?</Label>
          <Checkbox
            {...register('isSmoker')}
            onClick={() => handleCheckboxClick('isSmoker')}
          />
        </FormControl>
        <FormControl>
          <Label>Por quanto tempo?</Label>
          <input {...register('isSmokerDescription')} />
        </FormControl>
        <FormControl>
          <Label>Consome álcool?</Label>
          <Checkbox
            {...register('drinksAlchol')}
            onClick={() => handleCheckboxClick('drinksAlchol')}
          />
        </FormControl>
        <FormControl>
          <Label>Com qual frequência?</Label>
          <input {...register('drinksAlcholDescription')} />
        </FormControl>
        <FormControl>
          <Label>Usa drogas?</Label>
          <Checkbox
            {...register('useDrugs')}
            onClick={() => handleCheckboxClick('useDrugs')}
          />
        </FormControl>
        <FormControl>
          <Label>Quais?</Label>
          <input {...register('useDrugsDescription')} />
        </FormControl>
        <FormControl>
          <Button>Salvar</Button>
        </FormControl>
      </form>
    </Container>
  )
}

const Container = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  max-height: 100%;
  overflow-y: auto;
`

const FormControl = styled.div`
  padding: 1.5rem;
  display: flex;
  width: 100%;
  flex-direction: column;
`

const Label = styled.label`
  font-weight: 500;
`

const Button = styled.button`
  background-color: #222;
`

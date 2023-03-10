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
  width: 15px;
  height: 15px;
  margin-top: 1rem;
`

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

  useEffect(() => {}, [isTakeSomeMedicineChecked])

  const submit = () => {
    let _history: any = getValues()
    _history = { ..._history, patientId: patientId }
    setHistory(_history)
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/anamnese`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(_history)
    })
      .then(response => setHistory(response))
      .catch(e => console.error(e))
  }

  const handleCheckboxClick = (checkboxName: string) => {
    const checkbox = getValues(checkboxName)
    switch (checkboxName) {
      case 'isUnderMedicalTreatment':
        setIsUnderMedicalTreatmentChecked(checkbox)
        break

      case 'takeSomeMedicine':
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
          <Label>Est?? sob tratamento m??dico?</Label>
          <Checkbox
            {...register('isUnderMedicalTreatment')}
            onClick={() => handleCheckboxClick('isUnderMedicalTreatment')}
          />
        </FormControl>
        <FormControl>
          <Label>Est?? tomando algum rem??dio?</Label>
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
          <Label>Hist??rico de doen??as na fam??lia</Label>
          <textarea {...register('familyHistoryOfIllnesses')}></textarea>
        </FormControl>
        <FormControl>
          <Label>
            J?? teve hipertens??o, ataque card??aco ou doen??as do cora????o?
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
          <Label>J?? teve febre reum??tica?</Label>
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
          <Label>J?? teve c??ncer?</Label>
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
          <Label>J?? teve problemas relacionados ?? circula????o?</Label>
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
          <Label>J?? teve rea????o adversa ?? penincilina?</Label>
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
          <Label>Tem ou j?? teve hepatite?</Label>
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
          <Label>J?? foi vacinado contra hepatite B?</Label>
          <Checkbox
            {...register('haveBeenVaccinatedAgainstHepatitisB')}
            onClick={() =>
              handleCheckboxClick('haveBeenVaccinatedAgainstHepatitisB')
            }
          />
        </FormControl>
        <FormControl>
          <Label>J?? teve algum problema hep??tico?</Label>
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
          <Label>J?? teve algum problema renal?</Label>
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
          <Label>J?? teve alguma rea????o adversa ?? anestesia?</Label>
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
          <Label>Est?? gr??vida?</Label>
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
          <Label>J?? foi fumante?</Label>
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
          <Label>?? fumante?</Label>
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
          <Label>Consome ??lcool?</Label>
          <Checkbox
            {...register('drinksAlchol')}
            onClick={() => handleCheckboxClick('drinksAlchol')}
          />
        </FormControl>
        <FormControl>
          <Label>Com qual frequ??ncia?</Label>
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
  padding: 1rem;
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
  font-size: 1.4rem;
`

const Button = styled.button`
  background-color: #222;
  font-size: 1.4rem;
`

import axios from 'axios'
import styles from '@/styles/pacientes/PatientPage.module.scss'
import Image from 'next/image'

import { useState, useEffect } from 'react'

export default function PatientPage() {
  const [patients, setPatients] = useState([])

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/patients`, {
        headers: {
          Accept: 'application/json'
        }
      })
      .then(response => {
        setPatients(() => response.data)
      })
      .catch(e => console.error(e))
  }, [])

  return (
    <div className={styles.patientPageContainer}>
      {patients.length ? (
        <div className={styles.avatarContainer}>
          <div className={styles.avatar}>
            <Image
              src="https://randomuser.me/api/portraits/men/66.jpg"
              alt={'Imagem do paciente'}
              width={100}
              height={100}
            />
          </div>
          <div className={styles.infoContainer}>
            <span>{patients[0].user.name}</span>
            <span>(61) 9 8577 0401</span>
            <span>{patients[0].user.email}</span>
          </div>
        </div>
      ) : null}
    </div>
  )
}

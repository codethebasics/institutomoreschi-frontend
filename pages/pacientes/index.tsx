import styles from '@/styles/pacientes/PatientPage.module.scss'

import { useEffect, useState } from 'react'
import * as ArchiveService from '@/services/ArchiveService'

function Imagem({ url, width, height, alt }: any) {
  console.log('url', url)
  return url ? <img src={url} width={width} height={height} alt={alt} /> : null
}

export default function PatientPage({ name, email, phone, photo }: any) {
  const [patients, setPatients] = useState<any>([])
  const [avatar, setAvatar] = useState<Blob | null>(null)
  const [avatarImage, setAvatarImage] = useState<any>(null)

  interface user {
    id: string
    name: string
    phone: string
    email: string
    blob: ArrayBuffer
  }

  useEffect(() => {
    if (photo) {
      ArchiveService.findById(photo.id)
        .then(async response => {
          const blob = new Blob([response.data.blob], { type: 'image/png' })
          console.log('blob', blob)
          const url = URL.createObjectURL(blob)
          console.log('url', url)
          setAvatarImage(URL.createObjectURL(blob))
        })
        .catch(e => console.error(e))
    }
  }, [photo])

  return (
    <div className={styles.patientPageContainer}>
      <div className={styles.avatarContainer}>
        <div className={styles.avatar}>
          {avatarImage ? (
            <Imagem
              src={avatarImage}
              width={50}
              height={50}
              alt={'avatar image'}
            />
          ) : null}
        </div>
        <div className={styles.infoContainer}>
          <span>{name}</span>
          <span>{phone}</span>
          <span>{email}</span>
        </div>
      </div>
    </div>
  )
}

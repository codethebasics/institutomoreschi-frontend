import styled from '@emotion/styled'
import { useForm } from 'react-hook-form'
import { parseCookies } from 'nookies'

export default function UploadPage() {
  return <FileUploader />
}

function FileUploader() {
  const { register, handleSubmit } = useForm()
  const { 'moreschi.token': token } = parseCookies()
  console.log('tokenn', token)

  const submit = (data: any) => {
    const file = data.file[0]

    if (!file) {
      throw 'O arquivo deve ser informado'
    }

    const imageData = new FormData()
    imageData.append('file', file)

    const request: any = {
      userId: 'cle5z5hhj0008tzucefosire1',
      title: 'frontend',
      extension: 'jpg',
      blob: imageData,
      checksum: '123ildsjklsdkjf'
    }

    fetch('http://localhost:3333/upload', {
      method: 'POST',
      body: request
    })
      .then(response => console.log('response', response))
      .catch(e => console.error('error', e))
  }

  return (
    <div style={{ padding: '5px' }}>
      <form onSubmit={handleSubmit(submit)}>
        <input type="file" {...register('file')} />
        <SubmitButton type="submit">Enviar</SubmitButton>
      </form>
    </div>
  )
}

const SubmitButton = styled.button`
  background: #222;
  color: #fff;
`

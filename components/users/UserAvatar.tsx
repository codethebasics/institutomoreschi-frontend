import Image from 'next/image'
import styled from '@emotion/styled'

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem;
`

const Avatar = styled.div`
  border-radius: 100%;
  box-shadow: 0 0.3rem 1rem #858585;
  display: flex;

  img {
    border-radius: 100%;
    background-size: cover;
  }
`

export default function UserAvatar({ user, size }: any) {
  const img = Math.floor(Math.random() * 100)
  return user ? (
    <Container>
      <Avatar>
        <Image
          alt="Imagem do usuário"
          src={`https://randomuser.me/api/portraits/men/${img}.jpg`}
          width={size}
          height={size}
        />
      </Avatar>
    </Container>
  ) : null
}

import { Button, Grid, Text, TextInput } from "@mantine/core"
import AuthContainer from "./components/Container"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Recovery = () => {
  const [email, setEmail] = useState('')
  const navigate = useNavigate()
  const isValidEmail = () => {
    const reg = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i
    return reg.test(email)
  }
  return (
    <AuthContainer>
      <Grid mt={42}>
        <Grid.Col display={'flex'}>
          <Text size="36px" color='blue.10' fw={700}>Recuperar senha</Text>
          <Text size="36px" color='orange.10' fw={700}>.</Text>
        </Grid.Col>
        <Grid.Col>
          <Text size="sm" color="gray.10">Informe o e-mail do seu cadastro. Nós estaremos realizando o envio de um link com as instruções para você redefinir a sua senha.</Text>
        </Grid.Col>
        <Grid.Col>
          <TextInput
            rightSectionPointerEvents="none"
            rightSection={'@'}
            placeholder="informe seu email"
            value={email}
            type="email"
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
        </Grid.Col>
        <Grid.Col>
          <Button variant="filled" color='blue.10' fullWidth disabled={!isValidEmail()} onClick={() =>  navigate('/back-to-login')}>enviar link</Button>
        </Grid.Col>
      </Grid>
    </AuthContainer>
  )
}

export default Recovery
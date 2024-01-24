import { Button, Grid, Text } from "@mantine/core"
import AuthContainer from "./components/Container"
import { useNavigate } from "react-router-dom"

const BackToLogin = () => {
  const navigate = useNavigate()
  return (
    <AuthContainer>
      <Grid mt={24}>
        <Grid.Col display={'flex'}>
          <Text size="36px" color='blue.10' fw={700}>Tudo certo</Text>
          <Text size="36px" color='orange.10' fw={700} ml={4}>;)</Text>
        </Grid.Col>
        <Grid.Col>
          <Text size="sm" color="gray.10">Foi enviado um e-mail para você com instruções de como redefinir a sua senha.</Text>
        </Grid.Col>
        <Grid.Col>
          <Button variant="filled" color='blue.10' fullWidth onClick={() => navigate('/login')} >voltar para o login</Button>
        </Grid.Col>
      </Grid>
    </AuthContainer>
  )
}

export default BackToLogin
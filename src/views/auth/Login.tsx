import { Grid, TextInput, Text, PasswordInput, Button } from '@mantine/core';
import { IconLogin2, IconShieldQuestion } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom'
import AuthContainer from './components/Container';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { cookie } from '@/utils/storage'
import { toast } from 'react-toastify'

const Login = () => {
  const [loading, setLoading] = useState(false)
  const fakeJwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFkbWluaXN0cmFkb3IiLCJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlhdCI6MTUxNjIzOTAyMn0.bbD8ypcspTMDA2q3Zt0No2ZcaJ8JibXXEj0c96x9Bw8';
  const navigate = useNavigate()
  const form = useForm({
    initialValues: { password: '', email: ''},
    validate: {
      email: (value) => (/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i.test(value) ? null : 'email inválido'),
      password: (value) => (value.length < 6 ? 'no mínimo 6 caracteres' : null),
    },
  });
  const fakeLogin = (payload: { password: string, email: string }) => {
    setLoading(true)
    setTimeout(() => {
      if (payload.email === 'admin@admin.com' && payload.password === '123456') {
        cookie.setToken(fakeJwt)
        navigate('/choose-agent')
      } else {
        toast.error('email ou senha está inválido')
      }
      setLoading(false)
    }, 1000);
   
  }
  return (
    <>
      <AuthContainer>
      <form onSubmit={form.onSubmit(fakeLogin)}>
        <Grid mt={24}>
          <Grid.Col display={'flex'}>
            <Text size="36px" color='blue.10' fw={700}>Bem-vindo</Text>
            <Text size="36px" color='orange.10' fw={700}>.</Text>
          </Grid.Col>
          <Grid.Col>
            <Text size="sm" color="gray.10">informe as suas credenciais de acesso ao portal</Text>
          </Grid.Col>
          <Grid.Col>
            <TextInput
              rightSectionPointerEvents="none"
              rightSection={'@'}
              required
              type='email'
              placeholder="informe seu email"
              {...form.getInputProps('email')}
            />
          </Grid.Col>
          <Grid.Col>
            <PasswordInput
              required
              placeholder="informe sua senha"
              {...form.getInputProps('password')}
            />
          </Grid.Col>
          <Grid.Col>
            <Button variant="filled" color='blue.10' fullWidth rightSection={<IconLogin2 size={16} />} type='submit' loading={loading}>entrar</Button>
          </Grid.Col>
          <Grid.Col display={'flex'} style={{ justifyContent: 'end' }}>
            <Text size="sm" color="orange.11" mr={4}><IconShieldQuestion size={14} /></Text>
            <Text size="sm" color="orange.11" onClick={() => navigate('/account-recovery')} style={{ cursor: 'pointer' }}>Esqueceu a senha?</Text>
          </Grid.Col>
        </Grid>
      </form>
    </AuthContainer>
    </>
  )
}

export default Login
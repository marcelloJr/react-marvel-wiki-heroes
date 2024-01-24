import { Paper, Card, Stack, Container, Box } from '@mantine/core';
import PontuaLogo from '@/assets/img/logo-pontua.svg'
import Building from '@/assets/img/building.svg'

export default function AuthContainer({ children }: { children: React.ReactNode }) {
  return (
    <Paper radius={0} p="xl" bg={'blue.8'} h={'100vh'}>
      <Stack h={'100%'}>
        <img style={{marginLeft: 64, marginTop: -4}} src={PontuaLogo} width={169} height={50}/>
        <Container fluid ml={0} mr={0} display={'flex'} h={'100%'} style={{alignItems: 'center', justifyContent: 'space-evenly'}}>
          <Box visibleFrom='md'>
            <img src={Building} height={433} />
          </Box>
          <Card shadow="sm" padding="xl" radius="lg" w={380} h={433}>
            {children}
          </Card>
        </Container>
      </Stack>
    </Paper>
  )
}
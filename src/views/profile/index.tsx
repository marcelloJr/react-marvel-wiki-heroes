import Character, { CharacterResponse } from '@/@types/Character'
import api from '@/utils/api'
import { Avatar, Box, Card, List, Loader, Stack, Tabs, Text, useMantineColorScheme } from '@mantine/core'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {local} from '@/utils/storage'
const Profile = () => {
  const params = useParams()
  const [character, setCharacter] = useState({} as Character)
  const [loading, setLoading] = useState(true)
  const getCharacterById = (id: string) => {
    setLoading(true)
    api.get(`/characters/${id}`, {params: {offset: 0}})
    .then(({data}: CharacterResponse) => {
      setCharacter(data.data.results[0])
    })
    .finally(() => {
      setLoading(false)
    })
  }
  const { colorScheme } = useMantineColorScheme();
  useEffect(() => {
    const hero = local.getHeroe()
    if (params.id) {
      getCharacterById(params.id)
      return
    }
    if (hero) {
      const id = JSON.parse(hero).value
      getCharacterById(id)
    }
  }, [params])
  const isDark = colorScheme === 'dark';
  return (
    <Stack p={16}>
      {!!loading && <Box style={{width: '100%', height: '100%', display: 'flex', justifyContent: 'center'}}>
        <Loader color={isDark ? 'white' : 'dark'}/>
      </Box>}
      {!loading &&
        <>
          <Box display={'flex'}>
            <Text color={isDark ? 'blue.4' : 'blue.10'} fw={'bold'} size='24px'>Perfil<span style={{color: '#F43724', marginLeft: 4, marginRight: 4}}>/</span></Text>
            <Text size='24px' color='gray.10'>{character.name}</Text>
          </Box>
          <Tabs defaultValue="overview" color='primary'>
            <Tabs.List>
              <Tabs.Tab value="overview">
                Visão geral
              </Tabs.Tab>
              <Tabs.Tab value="comics">
                Quadrinhos
              </Tabs.Tab>
              <Tabs.Tab value="series">
                Séries
              </Tabs.Tab>
              <Tabs.Tab value="stories">
                Histórias
              </Tabs.Tab>
              <Tabs.Tab value="events">
                Eventos
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="overview">
              <Card shadow="sm" padding="xl" radius="md" mt={16}>
                <Box display={'flex'} style={{alignItems: 'center'}}>
                  <Avatar size={'xl'} src={`${character.thumbnail.path}.${character.thumbnail.extension}`} />
                  <Box ml={16}>
                    <Text fw={700} size='xl' color={isDark ? 'blue.4' : 'blue.10'}>{character.name}</Text>
                    <Text color='gray.10'>{character.description || 'Sem informação'}</Text>
                  </Box>
                </Box>
              </Card>
            </Tabs.Panel>

            <Tabs.Panel value="comics">
              <Card shadow="sm" padding="xl" radius="md" mt={16}>
                <List>
                  {character.comics.items.map((comic, index) => <List.Item key={index}>{comic.name}</List.Item>)}
                  {character.events.items.length === 0 && <List.Item>Sem quadrinhos</List.Item>}
                </List>
              </Card>
            </Tabs.Panel>

            <Tabs.Panel value="series">
              <Card shadow="sm" padding="xl" radius="md" mt={16}>
                <List>
                  {character.series.items.map((serie, index) => <List.Item key={index}>{serie.name}</List.Item>)}
                  {character.events.items.length === 0 && <List.Item>Sem séries</List.Item>}
                </List>
              </Card>
            </Tabs.Panel>

            <Tabs.Panel value="stories">
              <Card shadow="sm" padding="xl" radius="md" mt={16}>
                <List>
                  {character.stories.items.map((story, index) => <List.Item key={index}>{story.name}</List.Item>)}
                  {character.events.items.length === 0 && <List.Item>Sem histórias</List.Item>}
                </List>
              </Card>
            </Tabs.Panel>

            <Tabs.Panel value="events">
              <Card shadow="sm" padding="xl" radius="md" mt={16}>
                <List>
                  {character.events.items.map((event, index) => <List.Item key={index}>{event.name}</List.Item>)}
                  {character.events.items.length === 0 && <List.Item>Sem eventos</List.Item>}
                </List>
              </Card>
            </Tabs.Panel>
          </Tabs>
        </>
      }
    </Stack>
  )
}

export default Profile
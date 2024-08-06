import { CharacterData, CharacterResponse } from "@/@types/Character";
import api from "@/utils/api"
import { Card, Grid, Image, Pagination, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import SkeletonLoading from "./components/SkeletonLoading";
import { useLocation, useNavigate } from 'react-router-dom'

const Home = () => {
  const [loading, setLoading] = useState(true)
  const [activePage, setPage] = useState(1);
  const [pagination, setPagination] = useState<CharacterData>({
    offset: 0,
    limit: 20,
    total: 0,
    count: 0,
    results: []
  })
  const [search, setSearch] = useState('')
  const location = useLocation()
  const navigate = useNavigate()
  const getMarvelCharacters = () => {
    setLoading(true)
    api.get('/characters', {params: {offset: activePage - 1, name: search === '' ? undefined : search}})
    .then(({data}: CharacterResponse) => {
      const total = data.data.total / data.data.limit;
      setPagination({...data.data, total: Math.ceil(total) })
    })
    .finally(() => {
      setLoading(false)
    })
  }

  useEffect(() => {
    getMarvelCharacters()
  }, [activePage, search])
  useEffect(() => {
    const agent = new URLSearchParams(location.search).get('agent')
    if (agent) {
      setSearch(agent)
    } else {
      setSearch('')
    }
  }, [location])
  
  return (
    <Grid m={32}>
      {!!loading && <SkeletonLoading />}
      {!loading && pagination.results.map((character) => (
        <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 4 }} display={'flex'}>
          <Card
            shadow="lg"
            padding="xl"
            style={{ width: '100%', cursor: 'pointer'}}
            className="clickable-card"
            onClick={() => {
              navigate('/profile/' + character.id)
            }}
          >
            <Card.Section>
              <Image
                src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                h={160}
              />
            </Card.Section>
            <Text fw={500} size="lg" mt="md">
              {character.name}
            </Text>
            <Text mt="xs" c="dimmed" size="sm">
              {character.description}
            </Text>
          </Card>
        </Grid.Col>
      ))}
      {pagination.results.length === 0 && !loading && <h1>Sem resultado</h1>}
      <Grid.Col span={12} display={'flex'} style={{justifyContent: 'center'}}>
        <Pagination 
          total={pagination.total} 
          boundaries={1} 
          defaultValue={1} 
          value={activePage}
          onChange={setPage}
        />
      </Grid.Col>
    </Grid>
  )
}

export default Home
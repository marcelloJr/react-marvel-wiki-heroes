import { CharacterData, CharacterResponse } from "@/@types/Character";
import api from "@/utils/api"
import { Card, Grid, Image, Pagination, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import SkeletonLoading from "./components/SkeletonLoading";

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
  const getMarvelCharacters = () => {
    setLoading(true)
    api.get('/characters', {params: {offset: activePage - 1}})
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
  }, [activePage])
  
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
import { Card, Grid, Image, Skeleton, Text } from '@mantine/core'

const SkeletonLoading = () => {
  const skeletonArray = Array.from(Array(10).keys())
  const skeletonArray2 = Array.from(Array(5).keys())
  return (
    skeletonArray.map(() => (
      <Grid.Col span={{ base: 12, sm: 6, md: 4, lg: 4  }} display={'flex'}>
        <Card
          shadow="lg"
          padding="xl"
          style={{ width: '100%' }}
        >
          <Skeleton height={160}>
            <Card.Section>
              <Image h={160}/>
            </Card.Section>
          </Skeleton>
          <Skeleton mt={8} width={120}>
            <Text fw={700} size="sm" mt="sm">
              AAAAAA
            </Text>
          </Skeleton>

          {skeletonArray2.map(() => (
            <Skeleton mt={8} height={12}>
              <Text size="sm">
                AAAAAA
              </Text>
            </Skeleton>
          ))}
        </Card>
      </Grid.Col>
    ))
  )
}

export default SkeletonLoading
import React from 'react'
import { Card, Group, Text, Grid, Button, Image } from '@mantine/core'

function ClothesCard(props) {
  const { open } = props
  return (
    <Card
      className="clothes-card"
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
    >
      <Card.Section>
        <Image
          src={`/assets/img/images/${props.item.image}.jpg`}
          height="75%"
          alt="Norway"
        />
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>{props.item.description}</Text>
      </Group>
      <Grid>
        <Grid.Col span={6}>
          <Button
            variant="light"
            color="blue"
            fullWidth
            mt="md"
            radius="md"
            onClick={open}
          >
            View Details
          </Button>
        </Grid.Col>
        <Grid.Col span={6}>
          <Button variant="light" color="blue" fullWidth mt="md" radius="md">
            Add to outfit
          </Button>
        </Grid.Col>
      </Grid>
    </Card>
  )
}

export default ClothesCard

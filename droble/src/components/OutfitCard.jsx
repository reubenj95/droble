import React from 'react'
import { Card, Group, Text, Button, Image } from '@mantine/core'

function OutfitCard(props) {
  const { item } = props
  return (
    <Card
      className="clothes-card"
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
    >
      <Card.Section>
        <Image src={item.image} height="75%" alt="Norway" />
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>{item.name}</Text>
      </Group>

      <Button variant="light" color="blue" fullWidth mt="md" radius="md">
        View Details
      </Button>
    </Card>
  )
}

export default OutfitCard

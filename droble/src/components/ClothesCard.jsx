import React from 'react'
import { Card, Group, Text, Badge, Button, Image } from '@mantine/core'

function ClothesCard(props) {
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
          src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
          height="75%"
          alt="Norway"
        />
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>{props.item.description}</Text>
      </Group>

      <Button variant="light" color="blue" fullWidth mt="md" radius="md">
        View Details
      </Button>
    </Card>
  )
}

export default ClothesCard

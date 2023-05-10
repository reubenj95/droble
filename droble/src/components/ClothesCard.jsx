import React, { useEffect, useState } from 'react'
import {
  Card,
  Group,
  Text,
  Grid,
  Button,
  Image,
  Popover,
  Select,
} from '@mantine/core'
import {
  useGetOutfitsQuery,
  useAddToOutfitMutation,
} from '../features/api/apiSlice'
import { IconCheck } from '@tabler/icons-react'

function ClothesCard(props) {
  const { edit, item, add } = props
  const { data: outfits, isLoading, isSuccess, isError } = useGetOutfitsQuery()
  const [addToOutfit, result] = useAddToOutfitMutation()
  const [outfitNames, setOutfitNames] = useState([])

  return (
    <Popover
      width={300}
      trapFocus
      position="bottom-start"
      closeOnClickOutside={true}
      shadow="md"
    >
      <Card
        className="clothes-card"
        id={`item${item.id}`}
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
      >
        <Card.Section>
          <Image
            src={`/assets/img/images/${item.image}.jpg`}
            height="75%"
            alt="Norway"
          />
          <IconCheck className="selected-checkmark" />
        </Card.Section>

        <Group position="apart" mt="md" mb="xs">
          <Text weight={500}>{item.description}</Text>
        </Group>
        <Grid>
          <Grid.Col span={6}>
            <Button
              variant="light"
              color="blue"
              fullWidth
              mt="md"
              radius="md"
              onClick={edit}
            >
              View Details
            </Button>
          </Grid.Col>
          <Grid.Col span={6}>
            <Button
              variant="light"
              color="blue"
              fullWidth
              mt="md"
              radius="md"
              onClick={add}
            >
              <>Add to outfit</>
            </Button>
          </Grid.Col>
        </Grid>
      </Card>
      <Popover.Dropdown>Hello</Popover.Dropdown>
    </Popover>
  )
}

export default ClothesCard

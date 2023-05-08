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
  Title,
} from '@mantine/core'
import { useGetOutfitsQuery } from '../features/api/apiSlice'

function ClothesCard(props) {
  const { edit, item } = props
  const { data: outfits, isLoading, isSuccess, isError } = useGetOutfitsQuery()
  const [outfitNames, setOutfitNames] = useState([])

  useEffect(() => {
    if (outfits) {
      const names = outfits.map((outfit) => outfit.name)
      setOutfitNames(names)
    }
  }, [outfits])

  function handleSubmit(e) {
    e.preventDefault()
    console.log(e.target[1].value)
    console.log(item)
  }

  let popoverContent
  if (isLoading) {
    popoverContent = (
      <Select
        label="Which outfit does this belong with?"
        placeholder="Loading outfits..."
        searchable
        clearable
        nothingFound="No options"
        data={[]}
        height="500px"
        dropdownPosition="bottom"
      />
    )
  } else if (isError) {
    popoverContent =
      'There was an error loading your outfits. Please refresh the page or try again later.'
  } else if (isSuccess) {
    popoverContent = (
      <form onSubmit={handleSubmit}>
        <Select
          label="Which outfit does this belong with?"
          placeholder="Select one"
          searchable
          clearable
          nothingFound="No outfits matching that name"
          data={outfitNames}
          dropdownPosition="bottom"
        />
        <Button type="submit" mt="lg">
          Add to outfit
        </Button>
      </form>
    )
  }

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
            <Popover.Target>
              <Button
                variant="light"
                color="blue"
                fullWidth
                mt="md"
                radius="md"
              >
                Add to outfit
              </Button>
            </Popover.Target>
          </Grid.Col>
        </Grid>
      </Card>
      <Popover.Dropdown>{popoverContent}</Popover.Dropdown>
    </Popover>
  )
}

export default ClothesCard

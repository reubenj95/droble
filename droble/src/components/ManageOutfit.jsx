import { useEffect } from 'react'
import {
  Drawer,
  Image,
  Grid,
  Title,
  Text,
  Divider,
  Button,
  Menu,
} from '@mantine/core'
import {
  IconCameraPlus,
  IconPlus,
  IconTrash,
  IconSettings,
} from '@tabler/icons-react'
import { useGetOutfitItemsQuery } from '../features/api/apiSlice'

function ManageOutfit(props) {
  const { opened, close, drawer, outfit } = props
  const {
    data: outfitItems,
    isError,
    isLoading,
    isSuccess,
  } = useGetOutfitItemsQuery(outfit.id)

  function handleAddImage() {
    return true
  }

  return (
    <Drawer
      opened={opened}
      onClose={close}
      position={drawer.position}
      size={drawer.size}
    >
      <Grid>
        <Grid.Col md={4}>
          {outfit.image ? (
            <Image fit="contain" src={outfit.image} />
          ) : (
            <div className="add-image-slideout" onClick={handleAddImage}>
              <IconCameraPlus size="10rem" />
            </div>
          )}
        </Grid.Col>
        <Grid.Col md={8}>
          <Title order={2} mb="lg">
            {outfit.name}
          </Title>
          <ul>
            <li>Occasion: {outfit.occasion}</li>
            <li>Season: {outfit.season}</li>
            <li>Last worn: {outfit.last_worn}</li>
          </ul>
          <div className="button-container">
            <Menu shadow="md" width={200}>
              <Menu.Dropdown>
                <Menu.Label>Edit outfit</Menu.Label>
                <Menu.Item icon={<IconSettings size={14} />}>
                  Edit outfit details
                </Menu.Item>
                <Menu.Item icon={<IconCameraPlus size={14} />}>
                  Change outfit picture
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item color="red" icon={<IconTrash size={14} />}>
                  Delete this outfit
                </Menu.Item>
              </Menu.Dropdown>
              <Button.Group>
                <Button>Wear This</Button>
                <Menu.Target>
                  <Button>Edit outfit</Button>
                </Menu.Target>
              </Button.Group>
            </Menu>
          </div>

          <Divider m="lg" />
          <Title order={3} mb="md">
            Outfit Items
          </Title>
          <div className="outfit-items-container">
            {isSuccess &&
              outfitItems.map((item) => {
                return (
                  <div className="image-frame">
                    <div className="outfit-item" key={item.id}>
                      <Image
                        src={`/assets/img/images/${item.image}.jpg`}
                        fit="cover"
                      />
                    </div>
                    <div className="outfit-item-overlay">
                      <Text mb="md">Edit item</Text>
                    </div>
                  </div>
                )
              })}
            <div className="image-frame add-new">
              <IconPlus size="8rem" />
            </div>
          </div>
        </Grid.Col>
      </Grid>

      {outfit.description}
    </Drawer>
  )
}

export default ManageOutfit

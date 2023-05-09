import { useEffect } from 'react'
import { Drawer, Image, Grid, Title } from '@mantine/core'
import { IconCameraPlus, IconPlus } from '@tabler/icons-react'
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
      <Title order={2} mb="lg">
        {outfit.name}
      </Title>
      <Grid>
        <Grid.Col span={4}>
          {outfit.image ? (
            <Image fit="contain" src={outfit.image} />
          ) : (
            <div className="add-image-slideout" onClick={handleAddImage}>
              <IconCameraPlus size="10rem" />
            </div>
          )}
        </Grid.Col>
        <Grid.Col span={8}>
          <Title order={3}>Outfit Items</Title>
          <div className="outfit-items-container">
            {isSuccess &&
              outfitItems.map((item) => {
                return (
                  <div className="outfit-item" key={item.id}>
                    <Image
                      src={`/assets/img/images/${item.image}.jpg`}
                      fit="cover"
                    />
                  </div>
                )
              })}
            <div className="outfit-item add-new">
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

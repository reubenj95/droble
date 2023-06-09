import { Drawer, Image } from '@mantine/core'
import { IconCameraPlus } from '@tabler/icons-react'

function ItemSlideout(props) {
  const { opened, close, drawer, item } = props
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
      {item.image ? (
        <Image fit="fill" src={`/assets/img/images/${item.image}.jpg`} />
      ) : (
        <div className="add-image-slideout" onClick={handleAddImage}>
          <IconCameraPlus size="10rem" />
        </div>
      )}
      {item.description}
    </Drawer>
  )
}

export default ItemSlideout

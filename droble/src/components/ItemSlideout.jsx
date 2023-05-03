import { Drawer } from '@mantine/core'

function ItemSlideout(props) {
  const { opened, close, drawer } = props
  return (
    <Drawer
      opened={opened}
      onClose={close}
      title="Add new item"
      position={drawer.position}
      size={drawer.size}
    >
      {/* Drawer content */}
    </Drawer>
  )
}

export default ItemSlideout

import { useState } from 'react'
import { useDisclosure } from '@mantine/hooks'
import { useGetWardrobeQuery } from '../features/api/apiSlice'
import ClothesCard from './ClothesCard'
import ItemSlideout from './ItemSlideout'
import { Flex, Button, Title } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'
import Pages from './Pages'

function Wardrobe() {
  const [opened, { open, close }] = useDisclosure(false)
  const {
    data: clothes,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetWardrobeQuery()
  const [activePage, setActivePage] = useState({
    pageNumber: 1,
    offset: 0,
    interval: 12,
  })
  const [selected, setSelected] = useState({})

  function handlePagination(pageNum) {
    const offset = pageNum * activePage.interval
    setActivePage({
      pageNumber: pageNum,
      offset,
      interval: activePage.interval,
    })
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }
  function handleDetailsClick(item) {
    setSelected(item)
    open()
  }

  function handleNewClick() {
    setSelected({
      description: 'Describe this item',
      occasion: null,
      colour: null,
      brand: null,
      image: null,
    })
    open()
  }

  let content

  if (isLoading) {
    content = <p>Loading your wardrobe</p>
  } else if (isSuccess) {
    let clothesArray = []
    clothes.forEach((item, index) => {
      if (
        index >= activePage.offset &&
        index < activePage.offset + activePage.interval
      ) {
        clothesArray.push(
          <ClothesCard
            key={item.id}
            item={item}
            open={() => handleDetailsClick(item)}
          />
        )
      }
    })
    content = clothesArray
  } else if (isError) {
    content = <div>{error.toString()}</div>
  }
  let drawer = {}

  if (window.innerWidth < 575) {
    drawer = {
      position: 'bottom',
      size: '100%',
    }
  } else {
    drawer = {
      position: 'right',
      size: '50%',
    }
  }

  return (
    <>
      <section>
        <Flex align="center" justify="space-between" mb="xl">
          <Title order={2}>Browse your wardrobe</Title>
          <Button onClick={handleNewClick} className="top-add-button">
            Add new item
          </Button>
        </Flex>

        <div className="clothes-container">{content}</div>
        <Flex justify="center">
          {clothes && (
            <Pages
              data={clothes}
              activePage={activePage}
              handlePagination={handlePagination}
            />
          )}
        </Flex>
      </section>
      <ItemSlideout
        opened={opened}
        close={close}
        drawer={drawer}
        item={selected}
      />
      <Button onClick={handleNewClick} className="mobile-button">
        <IconPlus size={50} />
      </Button>
    </>
  )
}

export default Wardrobe

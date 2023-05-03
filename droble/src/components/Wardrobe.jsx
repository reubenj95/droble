import { useState } from 'react'
import { useDisclosure } from '@mantine/hooks'
import { useGetWardrobeQuery } from '../features/api/apiSlice'
import ClothesCard from './ClothesCard'
import ItemSlideout from './ItemSlideout'
import { Flex, Pagination, Button } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'

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

  function handlePagination(pageNum) {
    const offset = pageNum * activePage.interval
    setActivePage({
      pageNumber: pageNum,
      offset,
      interval: activePage.interval,
    })
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
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
        clothesArray.push(<ClothesCard key={item.id} item={item} />)
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
        <Flex align="center" justify="space-between">
          <h2>Browse your wardrobe</h2>
          <Button onClick={open} className="top-add-button">
            Add new item
          </Button>
        </Flex>

        <div className="clothes-container">{content}</div>
        <Flex justify="center">
          {clothes && (
            <Pagination
              total={clothes.length / activePage.interval}
              value={activePage.pageNumber}
              onChange={handlePagination}
            />
          )}
        </Flex>
      </section>
      <ItemSlideout opened={opened} close={close} drawer={drawer} />
      <Button onClick={open} className="mobile-button">
        <IconPlus size={50} />
      </Button>
    </>
  )
}

export default Wardrobe

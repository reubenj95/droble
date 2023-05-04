import { useState } from 'react'
import { useDisclosure } from '@mantine/hooks'
import { useGetOutfitsQuery } from '../features/api/apiSlice'
import ClothesCard from './ClothesCard'
import ItemSlideout from './ItemSlideout'
import { Flex, Button, Title } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'
import Pages from './Pages'

function Outfits() {
  const [opened, { open, close }] = useDisclosure(false)
  const {
    data: outfits,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetOutfitsQuery()
  const [activePage, setActivePage] = useState({
    pageNumber: 1,
    offset: 0,
    interval: 9,
  })

  function handlePagination(pageNum) {
    const offset = (pageNum - 1) * activePage.interval
    setActivePage({
      pageNumber: pageNum,
      offset,
      interval: activePage.interval,
    })
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }

  let content

  if (isLoading) {
    content = <p>Loading your outfits</p>
  } else if (isSuccess) {
    let outfitsArray = []
    outfits.forEach((item, index) => {
      if (
        index >= activePage.offset &&
        index < activePage.offset + activePage.interval
      ) {
        outfitsArray.push(<ClothesCard key={item.id} item={item} />)
      }
    })
    content = outfitsArray
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
          <Title order={2}>Select an Outfit</Title>
          <Button onClick={open} className="top-add-button">
            Add new item
          </Button>
        </Flex>

        <div className="clothes-container">{content}</div>
        <Flex justify="center">
          {outfits && (
            <Pages
              data={outfits}
              activePage={activePage}
              handlePagination={handlePagination}
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

export default Outfits

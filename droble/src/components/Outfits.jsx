import { useState } from 'react'
import { useDisclosure } from '@mantine/hooks'
import { useGetOutfitsQuery } from '../features/api/apiSlice'
import OutfitCard from './OutfitCard'

import { Flex, Button, Title } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'
import Pages from './Pages'
import ManageOutfit from './ManageOutfit'

function Outfits() {
  const [editOpened, editControl] = useDisclosure(false)
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
  const [selected, setSelected] = useState({})

  function handlePagination(pageNum) {
    const offset = (pageNum - 1) * activePage.interval
    setActivePage({
      pageNumber: pageNum,
      offset,
      interval: activePage.interval,
    })
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }
  function handleDetailsClick(item) {
    setSelected(item)
    editControl.open()
  }
  function handleNewClick() {
    setSelected({
      description: 'Describe this item',
      occasion: null,
      colour: null,
      brand: null,
      image: null,
    })
    editControl.open()
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
        outfitsArray.push(
          <OutfitCard
            key={item.id}
            item={item}
            open={() => handleDetailsClick(item)}
          />
        )
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
          <Button onClick={handleNewClick} className="top-add-button">
            New outfit
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
      <ManageOutfit
        opened={editOpened}
        close={editControl.close}
        drawer={{ position: 'bottom', size: '95%' }}
        item={selected}
      />
      <Button onClick={handleNewClick} className="mobile-button">
        <IconPlus size={50} />
      </Button>
    </>
  )
}

export default Outfits

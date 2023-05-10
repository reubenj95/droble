import { useState, useEffect } from 'react'
import { useDisclosure } from '@mantine/hooks'
import {
  useGetWardrobeQuery,
  useAddToOutfitMutation,
} from '../features/api/apiSlice'
import ClothesCard from './ClothesCard'
import ItemSlideout from './ItemSlideout'
import SelectionModal from './SelectionModal'
import { Flex, Button, Title, Dialog, Space, Modal } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'
import Pages from './Pages'
import { useSearchParams, useNavigate } from 'react-router-dom'

function Wardrobe() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [drawerOpened, drawerControl] = useDisclosure(false)
  const [dialogOpened, dialogControl] = useDisclosure(false)
  const [modalOpened, modalControl] = useDisclosure(false)
  const [modalContent, setModalContent] = useState({})

  const [addToOutfit, setAddToOutfit] = useState({
    outfitId: Number(searchParams.get('outfit_id')),
    outfitName: searchParams.get('outfit_name'),
    selected: [],
  })
  const {
    data: clothes,
    isLoading: clothesLoading,
    isSuccess: clothesSuccess,
    isError: clothesIsError,
    error: clothesError,
  } = useGetWardrobeQuery()

  const [addItemToOutfit, result] = useAddToOutfitMutation()
  const [activePage, setActivePage] = useState({
    pageNumber: 1,
    offset: 0,
    interval: 12,
  })
  const [selected, setSelected] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    if (searchParams.get('selection_mode')) {
      dialogControl.open()
    } else {
      dialogControl.close()
    }
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
  function handleDetailsClick(item) {
    setSelected(item)
    drawerControl.open()
  }

  function handleNewClick() {
    setSelected({
      description: 'Describe this item',
      occasion: null,
      colour: null,
      brand: null,
      image: null,
    })
    drawerControl.open()
  }

  function handleCancelAdd() {
    modalControl.open()
  }
  // function handleSubmit(e, item) {
  //   e.preventDefault()
  //   console.log('Outfits:', outfits)
  //   console.log('Outfit names:', outfitNames)
  //   console.log('Selected outfit', selectedOutfit)
  //   const outfit = outfits.filter((outfit) => outfit.name === selectedOutfit)
  //   console.log('filtered outfit', outfit)
  //   const newOutfitItem = {
  //     // clothe_id: item.id,
  //     //outfit_id: outfit[0].id,
  //   }
  //   addItemToOutfit(newOutfitItem)
  // }

  function handleSelectItem(item) {
    if (searchParams.get('selection_mode')) {
      document.querySelector(`#item${item.id}`).classList.toggle('selected')
    } else {
      modalControl.open()
    }
  }

  function handleAddToOutfit() {
    return true
  }

  function clearSelection() {
    document
      .querySelectorAll('.clothes-card')
      .forEach((card) => card.classList.remove('selected'))
    modalControl.close()
    navigate('/wardrobe')
  }

  let content

  if (clothesLoading) {
    content = <p>Loading your wardrobe</p>
  } else if (clothesSuccess) {
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
            edit={() => handleDetailsClick(item)}
            add={() => handleSelectItem(item)}
          />
        )
      }
    })
    content = clothesArray
  } else if (clothesIsError) {
    content = <div>{clothesError.toString()}</div>
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
        <Space h="xl" />
      </section>
      <ItemSlideout
        opened={drawerOpened}
        close={drawerControl.close}
        drawer={drawer}
        item={selected}
      />
      <Button onClick={handleNewClick} className="mobile-button">
        <IconPlus size={50} />
      </Button>
      <Dialog
        opened={dialogOpened}
        withCloseButton
        onClose={() => handleCancelAdd()}
        size="lg"
        radius="md"
      >
        <Title order={4} mb="lg">
          {addToOutfit.selected.length} items selected for{' '}
          {addToOutfit.outfitName}
        </Title>
        <Button>Add selection to outfit</Button>
      </Dialog>
      <Modal
        opened={modalOpened}
        onClose={modalControl.close}
        title={modalContent.title}
      >
        <SelectionModal />
      </Modal>
    </>
  )
}

export default Wardrobe

import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  useGetOutfitsQuery,
  useAddToOutfitMutation,
} from '../features/api/apiSlice'
import { Button, NativeSelect } from '@mantine/core'

function SelectionModal(props) {
  const [outfitNames, setOutfitNames] = useState([])
  const [selectedOutfit, setSelectedOutfit] = useState('')
  const {
    data: outfits,
    isLoading: outfitsLoading,
    isSuccess: outfitsSuccess,
    isError: outfitsIsError,
    error: outfitsError,
  } = useGetOutfitsQuery()
  const [addItemToOutfit] = useAddToOutfitMutation()

  const { selectedItem, close } = props

  useEffect(() => {
    if (outfits) {
      const names = outfits.map((outfit) => outfit.name)
      setOutfitNames(names)
    }
  }, [outfits])

  function handleSubmit(e) {
    e.preventDefault()
    const outfit = outfits.filter((outfit) => outfit.name === selectedOutfit)
    const newOutfitItem = {
      clothe_id: selectedItem.id,
      outfit_id: outfit[0].id,
    }
    addItemToOutfit(newOutfitItem)
    close()
  }

  if (outfitsLoading) {
    return (
      <NativeSelect
        label="Which outfit does this belong with?"
        placeholder="Loading outfits..."
        data={[]}
      />
    )
  } else if (outfitsIsError) {
    return (
      <p>
        There was an error loading your outfits. Please refresh the page or try
        again later.
      </p>
    )
  } else if (outfitsSuccess) {
    return (
      <form onSubmit={(e) => handleSubmit(e)}>
        <NativeSelect
          label="Which outfit does this belong with?"
          placeholder="Select one"
          value={selectedOutfit}
          onChange={(event) => setSelectedOutfit(event.currentTarget.value)}
          data={outfitNames}
        />
        <Button type="submit" mt="lg">
          Add to outfit
        </Button>
      </form>
    )
  }
}

export default SelectionModal

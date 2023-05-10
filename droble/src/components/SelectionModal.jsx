import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetOutfitsQuery } from '../features/api/apiSlice'
import { Button, NativeSelect } from '@mantine/core'

function SelectionModal() {
  const [outfitNames, setOutfitNames] = useState([])
  const [selectedOutfit, setSelectedOutfit] = useState('')
  const {
    data: outfits,
    isLoading: outfitsLoading,
    isSuccess: outfitsSuccess,
    isError: outfitsIsError,
    error: outfitsError,
  } = useGetOutfitsQuery()
  const searchParams = useParams()

  useEffect(() => {
    if (outfits) {
      const names = outfits.map((outfit) => outfit.name)
      setOutfitNames(names)
    }
  }, [outfits])

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
      <form>
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

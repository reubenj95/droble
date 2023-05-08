import { Pagination } from '@mantine/core'

function Pages(props) {
  const { data, activePage, handlePagination } = props
  const pageCount = data.length / activePage.interval
  let pageCalc
  if (pageCount > 2) {
    pageCalc = pageCount
  } else if (pageCount > 1) {
    pageCalc = 2
  } else if (pageCount < activePage.interval) {
    pageCalc = 0
  }
  return (
    <Pagination
      total={pageCalc}
      value={activePage.pageNumber}
      onChange={handlePagination}
    />
  )
}

export default Pages

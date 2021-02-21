import React from 'react'
import { Icon, Menu, MenuItem } from 'semantic-ui-react'

const BasicPagination = ({ currentPage, lastPage, setPage }) => {
  return (
    <Menu inverted floated='right' pagination>
      <MenuItem disabled={currentPage === 1} as='a' icon onClick={() => setPage(1)}>
        <Icon name='angle double left'/>
      </MenuItem>
      <MenuItem disabled={currentPage === 1} as='a' icon onClick={() => setPage(currentPage - 1)}>
        <Icon name='angle left'/>
      </MenuItem>
      <MenuItem as='a' icon>{currentPage}</MenuItem>
      <MenuItem disabled={!(lastPage > currentPage)} as='a' icon onClick={() => setPage(currentPage + 1)}>
        <Icon name='angle right'/>
      </MenuItem>
      <MenuItem disabled={lastPage <= currentPage} as='a' icon onClick={() => setPage(lastPage)}>
        <Icon name='angle double right'/>
      </MenuItem>
    </Menu>
  )
}

export default BasicPagination

import { Button } from 'semantic-ui-react'
import React from 'react'

const FilterButton = ({ name, active, handleFilterSet, field, value }) => {
  return (
    <Button
      primary={active}
      color={!active ? 'grey' : ''}
      active={active}
      onClick={() => handleFilterSet(field, value)}>{name}</Button>
  )
}

export default FilterButton

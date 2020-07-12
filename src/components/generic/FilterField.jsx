import {Form} from "semantic-ui-react";
import React from "react";

const FilterField = ({id, value, label, group, handleFilterSet, enabled}) => {
  return (
    <Form.Input
      id={id}
      placeholder={label}
      size={"small"}
      fluid
      value={value}
      disabled={!enabled}
      onChange={(event, data) => handleFilterSet(group, data.value)}
    />
  )
}

export default FilterField
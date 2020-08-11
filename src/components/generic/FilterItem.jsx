import {Grid, Icon} from "semantic-ui-react";
import React from "react";

const FilterItem = ({titleWidth, itemWidth, title, icon, iconColor, item}) => {
  if (titleWidth && itemWidth) {
    return (
      <Grid.Row>
        <Grid.Column width={titleWidth} textAlign={"right"}>{title}</Grid.Column>
        <Grid.Column width={"2"}>
          <Icon Icon name={icon} color={iconColor} size={"large"}/>
        </Grid.Column>
        <Grid.Column width={itemWidth}>
          {item}
        </Grid.Column>
      </Grid.Row>
    )
  } else {
    return (
      <Grid.Row>
        <Grid.Column width={"4"} textAlign={"right"}>{title}</Grid.Column>
        <Grid.Column width={"2"}>
          <Icon Icon name={icon} color={iconColor} size={"large"}/>
        </Grid.Column>
        <Grid.Column width={"10"}>
          {item}
        </Grid.Column>
      </Grid.Row>
    )
  }
}

export default FilterItem
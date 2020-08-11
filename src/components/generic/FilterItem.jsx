import {Grid, Icon} from "semantic-ui-react"
import React from "react"

const FilterItem = ({isMobile, titleWidth, itemWidth, title, icon, iconColor, item}) => {
  if (titleWidth && itemWidth) {
    return (
      <Grid.Row>
        {isMobile && isMobile === true &&
          <Grid.Column mobile={1} computer={2} tablet={2}>
            <Icon Icon name={icon} color={iconColor} size={"large"}/>
          </Grid.Column>
        }
        <Grid.Column mobile={10} computer={titleWidth} tablet={titleWidth} textAlign={isMobile ? "" : "right"}>{title}</Grid.Column>
        {!isMobile &&
          <Grid.Column mobile={1} computer={2} tablet={2}>
            <Icon Icon name={icon} color={iconColor} size={"large"}/>
          </Grid.Column>
        }
        <Grid.Column mobile={16} computer={itemWidth} tablet={itemWidth}>
          {item}
        </Grid.Column>
      </Grid.Row>
    )
  } else {
    return (
      <Grid.Row>
        {isMobile && isMobile === true &&
          <Grid.Column mobile={1} computer={2} tablet={2}>
            <Icon Icon name={icon} color={iconColor} size={"large"}/>
          </Grid.Column>
        }
        <Grid.Column mobile={10} computer={4} tablet={4} textAlign={isMobile ? "" : "right"}>{title}</Grid.Column>
        {(!isMobile || (isMobile && isMobile === false)) &&
          <Grid.Column mobile={1} computer={2} tablet={2}>
            <Icon Icon name={icon} color={iconColor} size={"large"}/>
          </Grid.Column>
        }
        <Grid.Column mobile={16} computer={10} tablet={10}>
          {item}
        </Grid.Column>
      </Grid.Row>
    )
  }
}

export default FilterItem
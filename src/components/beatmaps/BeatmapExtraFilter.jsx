import {Button, Grid, Icon, Popup} from "semantic-ui-react";
import React from "react";

const BeatmapExtraFilter = ({filter, handleFilterSet}) => {
  return (
    <Popup
      trigger={
        <Button primary fluid content={
          <div>
            <Icon name={"wrench"} />
          </div>
        } />
      }
      content={<Grid className={"filter-settings-popup"} verticalAlign={"middle"}>
        <Grid.Row>
          <Grid.Column width={"5"} textAlign={"right"}>
            Nominators
          </Grid.Column>
          <Grid.Column width={"2"}>
            <Icon name={(filter.hideWithTwoNominators) ? "user" : "group"} color={"green"} size={"large"} />
          </Grid.Column>
          <Grid.Column width={"9"}>
            <Button.Group fluid>
              <Button inverted primary={filter.hideWithTwoNominators === true} secondary={filter.hideWithTwoNominators !== true} active={filter.hideWithTwoNominators === true}
                      onClick={() => handleFilterSet("hideWithTwoNominators", true)}>Missing</Button>
              <Button inverted primary={filter.hideWithTwoNominators === false} secondary={filter.hideWithTwoNominators !== false} active={filter.hideWithTwoNominators === false}
                      onClick={() => handleFilterSet("hideWithTwoNominators", false)}>Any</Button>
            </Button.Group>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={"5"} textAlign={"right"}>
            Show Ranked
          </Grid.Column>
          <Grid.Column width={"2"}>
            <Icon name={"heart"} color={(filter.hideRanked) ? "red" : "green"}  size={"large"} />
          </Grid.Column>
          <Grid.Column width={"9"}>
            <Button.Group fluid>
              <Button inverted primary={filter.hideRanked === false} secondary={filter.hideRanked !== false} active={filter.hideRanked === false}
                      onClick={() => handleFilterSet("hideRanked", false)}>Yes</Button>
              <Button inverted primary={filter.hideRanked === true} secondary={filter.hideRanked !== true} active={filter.hideRanked === true}
                      onClick={() => handleFilterSet("hideRanked", true)}>No</Button>
            </Button.Group>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={"5"} textAlign={"right"}>
            Show Graved
          </Grid.Column>
          <Grid.Column width={"2"}>
            <Icon Icon name={"archive"} color={(filter.hideGraved) ? "grey" : ""} size={"large"} />
          </Grid.Column>
          <Grid.Column widescreen={"9"}>
            <Button.Group fluid>
              <Button inverted primary={filter.hideGraved === false} secondary={filter.hideGraved !== false} active={filter.hideGraved === false}
                      onClick={() => handleFilterSet("hideGraved", false)}>Yes</Button>
              <Button inverted primary={filter.hideGraved === true} secondary={filter.hideGraved !== true} active={filter.hideGraved === true}
                      onClick={() => handleFilterSet("hideGraved", true)}>No</Button>
            </Button.Group>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={"5"} textAlign={"right"}>
            Page Limit
          </Grid.Column>
          <Grid.Column width={"2"}>
            <Icon Icon name={"list ol"} size={"large"} />
          </Grid.Column>
          <Grid.Column widescreen={"9"}>
            <Button.Group fluid>
              <Button inverted primary={filter.limit === 10} secondary={filter.limit !== 10} active={filter.limit === 10}
                      onClick={() => handleFilterSet("limit", 10)}>10</Button>
              <Button inverted primary={filter.limit === 20} secondary={filter.limit !== 20} active={filter.limit === 20}
                      onClick={() => handleFilterSet("limit", 20)}>20</Button>
              <Button inverted primary={filter.limit === 50} secondary={filter.limit !== 50} active={filter.limit === 50}
                      onClick={() => handleFilterSet("limit", 50)}>50</Button>
            </Button.Group>
          </Grid.Column>
        </Grid.Row>
      </Grid>}
      on='click'
      position='bottom right'
      inverted
    />
  )
}

export default BeatmapExtraFilter
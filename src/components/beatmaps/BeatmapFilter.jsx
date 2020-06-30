import React from "react";
import {Button, Checkbox, Form, Grid, Icon, Popup, Table} from "semantic-ui-react";
import {BEATMAP_STATUS} from "../../Constants";
import {getBeatmapStatusOptions} from "../../util/BeatmapUtil";
import "./BeatmapFilter.css"

const FilterField = ({id, label, group, handleFilterSet}) => {
  return (
    <Form.Input
      id={id}
      placeholder={label}
      size={"small"}
      fluid
      onChange={(event, data) => handleFilterSet(group, data.value)}
    />
  )
};

const BeatmapFilter = ({filter, setAddModalOpen, setFilter, canEdit, setPage}) => {

  function handleFilterSet(group, value) {
    filter[group] = value;
    setFilter({
      ...filter
    });
    setPage(1)
  }

  return (
    <div>
      <Table inverted>
        <Table.Header>
          <Table.Row textAlign={"center"}>
            <Table.HeaderCell>Limit</Table.HeaderCell>
            <Table.HeaderCell>Artist</Table.HeaderCell>
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>Mapper</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Extra Filters</Table.HeaderCell>
            <Table.HeaderCell/>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell width={"2"}>
              <Button.Group fluid>
                <Button inverted primary={filter.limit === 10} secondary={filter.limit !== 10} active={filter.limit === 10}
                        onClick={() => handleFilterSet("limit", 10)}>10</Button>
                <Button inverted primary={filter.limit === 20} secondary={filter.limit !== 20} active={filter.limit === 20}
                        onClick={() => handleFilterSet("limit", 20)}>20</Button>
                <Button inverted primary={filter.limit === 50} secondary={filter.limit !== 50} active={filter.limit === 50}
                        onClick={() => handleFilterSet("limit", 50)}>50</Button>
              </Button.Group>
            </Table.Cell>
            <Table.Cell width={"2"}>
              <Form inverted>
                <FilterField
                  id={"artist"}
                  label={"Artist"}
                  group={"artist"}
                  handleFilterSet={handleFilterSet}
                />
              </Form>
            </Table.Cell>
            <Table.Cell width={"2"}>
              <Form inverted>
                <FilterField
                  id={"title"}
                  label={"Title"}
                  group={"title"}
                  handleFilterSet={handleFilterSet}
                />
              </Form>
            </Table.Cell>
            <Table.Cell width={"2"}>
              <Form inverted>
                <FilterField
                  id={"mapper"}
                  label={"Mapper"}
                  group={"mapper"}
                  handleFilterSet={handleFilterSet}
                />
              </Form>
            </Table.Cell>
            <Table.Cell width={"4"}>
              <Form>
                <Form.Dropdown placeholder='Status' fluid multiple selection options={getBeatmapStatusOptions()}
                               onChange={(event, data) =>
                                 handleAddStatusFilter(data.value, filter, handleFilterSet)
                               }/>
              </Form>
            </Table.Cell>
            <Table.Cell width={"1"}>
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
                      <Icon name={"star"} color={(filter.hideRanked) ? "red" : "green"}  size={"large"} />
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
                </Grid>}
                on='click'
                position='bottom right'
                inverted
              />
            </Table.Cell>
            <Table.Cell width={"2"}>
              <Button disabled={!canEdit} fluid inverted color={"green"} onClick={() => setAddModalOpen(true)}>Add Beatmap</Button>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  )
};

function handleAddStatusFilter(value, filter, handleFilterSet) {
  if (value) {
    let filterKey = "status";

    if (value.length === 0) {
      handleFilterSet(filterKey, [])
    } else {
      for (let status in BEATMAP_STATUS) {
        let statusValue = BEATMAP_STATUS[status];
        if (value.includes(statusValue.id) && !filter[filterKey].includes(statusValue.id)) {
          let currentStatuses = filter[filterKey];
          currentStatuses.push(statusValue.id);
          handleFilterSet(filterKey, currentStatuses)
        } else if (!value.includes(statusValue.id) && filter[filterKey].includes(statusValue.id)) {
          let statuses = filter[filterKey];
          const index = statuses.indexOf(statusValue.id);
          const newValue = statuses.slice(0, index).concat(statuses.slice(index + 1, statuses.length));
          handleFilterSet(filterKey, newValue)
        }
      }
    }
  }
}

export default BeatmapFilter
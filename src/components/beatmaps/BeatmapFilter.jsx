import React from "react";
import {Button, Form, Table} from "semantic-ui-react";
import {BEATMAP_STATUS} from "../../Constants";
import {getBeatmapStatusOptions} from "../../util/BeatmapUtil";

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

const BeatmapFilter = ({filter, setAddModalOpen, setFilter}) => {

  function handleFilterSet(group, value) {
    filter[group] = value;
    setFilter({
      ...filter
    })
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
            <Table.HeaderCell/>
          </Table.Row>
        </Table.Header>
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
          <Table.Cell width={"3"}>
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
                             onChange={(event, data) => handleAddStatusFilter(data.value, filter, handleFilterSet)}/>
            </Form>
          </Table.Cell>
          <Table.Cell width={"2"}>
            <Button fluid inverted color={"green"} onClick={() => setAddModalOpen(true)}>Add Beatmap</Button>
          </Table.Cell>
        </Table.Row>
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
        if (value.includes(statusValue.name) && !filter[filterKey].includes(statusValue.name)) {
          let currentStatuses = filter[filterKey];
          currentStatuses.push(statusValue.name);
          handleFilterSet(filterKey, currentStatuses)
        } else if (!value.includes(statusValue.name) && filter[filterKey].includes(statusValue.name)) {
          let statuses = filter[filterKey];
          const index = statuses.indexOf(statusValue.name);
          const newValue = statuses.slice(0, index).concat(statuses.slice(index + 1, statuses.length));
          handleFilterSet(filterKey, newValue)
        }
      }
    }
  }
}

export default BeatmapFilter
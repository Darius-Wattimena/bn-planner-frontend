import React from "react";
import {Button, Form, Table} from "semantic-ui-react";
import {BEATMAP_STATUS} from "../../Constants";

const FilterField = ({id, label}) => {
  return (
    <Form.Input
      id={id}
      placeholder={label}
      size={"small"}
      fluid
    />
  )
};

const options = [
  getOption(BEATMAP_STATUS.Pending),
  getOption(BEATMAP_STATUS.WorkInProgress),
  getOption(BEATMAP_STATUS.AwaitingResponse),
  getOption(BEATMAP_STATUS.Bubbled),
  getOption(BEATMAP_STATUS.Qualified),
  getOption(BEATMAP_STATUS.Ranked),
  getOption(BEATMAP_STATUS.Popped),
  getOption(BEATMAP_STATUS.Disqualified),
  getOption(BEATMAP_STATUS.Graved)
];

function getOption(status) {
  return {
    key: status.name,
    text: status.full,
    value: status.name,
    className: status.className
  }
}

const BeatmapFilter = (props) => {
  function handleFilterSet(group, value) {
    let newFilter = props.filter;
    newFilter[group] = value;
    props.setFilter({
      ...newFilter
    })
  }

  return (
    <Table inverted>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Limit</Table.HeaderCell>
          <Table.HeaderCell>Artist</Table.HeaderCell>
          <Table.HeaderCell>Title</Table.HeaderCell>
          <Table.HeaderCell>Mapper</Table.HeaderCell>
          <Table.HeaderCell>Status</Table.HeaderCell>
          <Table.HeaderCell />
        </Table.Row>
      </Table.Header>
      <Table.Row>
        <Table.Cell width={"2"}>
          <Button.Group fluid>
            <Button inverted primary active={props.limit === 10} onClick={() => handleFilterSet("limit", 10 )}>10</Button>
            <Button inverted secondary active={props.limit === 20} onClick={() => handleFilterSet("limit", 20)}>20</Button>
            <Button inverted secondary active={props.limit === 50} onClick={() => handleFilterSet("limit", 50)}>50</Button>
          </Button.Group>
        </Table.Cell>
        <Table.Cell width={"2"}>
          <Form inverted>
            <FilterField
              id={"artist"}
              label={"Artist"}
            />
          </Form>
        </Table.Cell>
        <Table.Cell width={"3"}>
          <Form inverted>
            <FilterField
              id={"title"}
              label={"Title"}
            />
          </Form>
        </Table.Cell>
        <Table.Cell width={"2"}>
          <Form inverted>
            <FilterField
              id={"mapper"}
              label={"Mapper"}
            />
          </Form>
        </Table.Cell>
        <Table.Cell width={"7"}>
          <Form>
            <Form.Dropdown placeholder='Status' fluid multiple selection options={options} />
          </Form>
        </Table.Cell>
      </Table.Row>
    </Table>
  )
};

export default BeatmapFilter
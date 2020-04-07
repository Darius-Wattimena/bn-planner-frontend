import {Button, Form, Table} from "semantic-ui-react";
import {BEATMAP_STATUS, USER_ROLES} from "../../Constants";
import React from "react";

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

const options = [
  getOption(USER_ROLES.BeatmapNominator),
  getOption(USER_ROLES.ProbationBeatmapNominator),
  getOption(USER_ROLES.NominationAssessmentTeam),
  getOption(USER_ROLES.Observer)
];

function getOption(status) {
  return {
    key: status.name,
    text: status.full,
    value: status.name,
    className: status.className
  }
}

const UserFilter = (props) => {

  function handleFilterSet(group, value) {
    let newFilter = props.filter;
    newFilter[group] = value;
    props.setFilter({
      ...newFilter
    })
  }

  return (
    <div>
      <Table inverted>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Limit</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Role</Table.HeaderCell>
            <Table.HeaderCell />
          </Table.Row>
        </Table.Header>
        <Table.Row>
          <Table.Cell width={"2"}>
            <Button.Group>
              <Button inverted primary active={props.limit === 10}
                      onClick={() => handleFilterSet("limit", 10)}>10</Button>
              <Button inverted secondary active={props.limit === 20}
                      onClick={() => handleFilterSet("limit", 20)}>20</Button>
              <Button inverted secondary active={props.limit === 50}
                      onClick={() => handleFilterSet("limit", 50)}>50</Button>
            </Button.Group>
          </Table.Cell>
          <Table.Cell width={"2"}>
            <Form inverted>
              <FilterField
                id={"name"}
                label={"Name"}
                group={"osuName"}
                handleFilterSet={handleFilterSet}
              />
            </Form>
          </Table.Cell>
          <Table.Cell width={"3"}>
            <Form>
              <Form.Dropdown placeholder='Roles' fluid multiple selection options={options}
                             onChange={(event, data) => handleAddFilter(data.value, props.filter, handleFilterSet, USER_ROLES)}/>
            </Form>
          </Table.Cell>
          <Table.Cell width={"2"}>
            <Button inverted color={"green"} fluid>Add User</Button>
          </Table.Cell>
        </Table.Row>
      </Table>
    </div>
  )
};

function handleAddFilter(value, filter, handleFilterSet, items) {
  if (value) {
    let filterKey = "status";

    if (value.length === 0) {
      handleFilterSet(filterKey, [])
    } else {
      for (let item in items) {
        let filterValue = items[item];
        if (value.includes(filterValue.name) && !filter[filterKey].includes(filterValue.name)) {
          let currentStatuses = filter[filterKey];
          currentStatuses.push(filterValue.name);
          handleFilterSet(filterKey, currentStatuses)
        } else if (!value.includes(filterValue.name) && filter[filterKey].includes(filterValue.name)) {
          let statuses = filter[filterKey];
          const index = statuses.indexOf(filterValue.name);
          const newValue = statuses.slice(0, index).concat(statuses.slice(index + 1, statuses.length));
          handleFilterSet(filterKey, newValue)
        }
      }
    }
  }
}

export default UserFilter
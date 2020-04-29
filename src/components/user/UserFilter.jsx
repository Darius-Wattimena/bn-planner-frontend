import {Button, Form, Table} from "semantic-ui-react";
import {USER_ROLES} from "../../Constants";
import React from "react";



const UserFilter = ({filter, setFilter, setAddModalOpen, isAdmin, setPage}) => {
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
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Role</Table.HeaderCell>
            <Table.HeaderCell />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row textAlign={"center"}>
            <Table.Cell width={"2"}>
              <Button.Group fluid>
                <Button inverted primary={filter.limit === 10} secondary={filter.limit !== 10} active={filter.limit === 10}
                        onClick={() => handleFilterSet("limit", 10)}>10</Button>
                <Button inverted primary={filter.limit === 20} secondary={filter.limit !== 20} active={filter.limit === 20}
                        onClick={() => handleFilterSet("limit", 20)}>20</Button>
              </Button.Group>
            </Table.Cell>
            <Table.Cell width={"5"}>
              <Form inverted>
                <FilterField
                  id={"name"}
                  label={"Name"}
                  group={"name"}
                  handleFilterSet={handleFilterSet}
                  value={filter.name}
                />
              </Form>
            </Table.Cell>
            <Table.Cell width={"7"}>
              <Form>
                <Form.Dropdown placeholder='Roles' fluid multiple selection options={options} value={filter.roles}
                               onChange={(event, data) => handleMultiSelectFilter("roles", data.value, filter, handleFilterSet, USER_ROLES)}/>
              </Form>
            </Table.Cell>
            <Table.Cell width={"2"}>
              <Button disabled={!isAdmin} fluid inverted color={"green"} onClick={() => setAddModalOpen(true)}>Add User</Button>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  )
};

const options = [
  getOption(USER_ROLES.BeatmapNominator),
  getOption(USER_ROLES.ProbationBeatmapNominator),
  getOption(USER_ROLES.NominationAssessmentTeam),
  getOption(USER_ROLES.RetiredCatch),
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

const FilterField = ({id, label, group, handleFilterSet, value}) => {
  return (
    <Form.Input
      id={id}
      placeholder={label}
      size={"small"}
      fluid
      value={value ? value : ""}
      onChange={(event, data) => handleFilterSet(group, data.value)}
    />
  )
};

function handleMultiSelectFilter(key, value, filter, handleFilterSet, items) {
  if (value) {
    if (value.length === 0) {
      handleFilterSet(key, [])
    } else {
      for (let item in items) {
        let filterValue = items[item];
        if (value.includes(filterValue.name) && !filter[key].includes(filterValue.name)) {
          let currentStatuses = filter[key];
          currentStatuses.push(filterValue.name);
          handleFilterSet(key, currentStatuses)
        } else if (!value.includes(filterValue.name) && filter[key].includes(filterValue.name)) {
          let statuses = filter[key];
          const index = statuses.indexOf(filterValue.name);
          const newValue = statuses.slice(0, index).concat(statuses.slice(index + 1, statuses.length));
          handleFilterSet(key, newValue)
        }
      }
    }
  }
}

export default UserFilter
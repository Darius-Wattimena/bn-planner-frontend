import React from "react"
import {Button, Form, Table} from "semantic-ui-react"
import {BEATMAP_STATUS} from "../../Constants"
import {getBeatmapStatusOptions, getNominatorOptions} from "../../util/BeatmapUtil"
import "./BeatmapFilter.css"
import BeatmapExtraFilter from "./BeatmapExtraFilter";

const FilterField = ({id, label, group, handleFilterSet, disabled}) => {
  return (
    <Form.Input
      id={id}
      placeholder={label}
      size={"small"}
      fluid
      disabled={!disabled}
      onChange={(event, data) => handleFilterSet(group, data.value)}
    />
  )
}

const BeatmapFilter = ({filter, setAddModalOpen, setFilter, canEdit, setPage, users}) => {

  function handleFilterSet(group, value) {
    filter[group] = value
    setFilter({
      ...filter
    })
    setPage(1)
  }

  console.log({filter})

  return (
    <Table inverted>
      <Table.Header>
        <Table.Row textAlign={"center"}>
          <Table.HeaderCell/>
          <Table.HeaderCell>Artist</Table.HeaderCell>
          <Table.HeaderCell>Title</Table.HeaderCell>
          <Table.HeaderCell>Mapper</Table.HeaderCell>
          <Table.HeaderCell>Nominator</Table.HeaderCell>
          <Table.HeaderCell>Status</Table.HeaderCell>
          <Table.HeaderCell>Extra Filters</Table.HeaderCell>
          <Table.HeaderCell/>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell width={"2"}>
          </Table.Cell>
          <Table.Cell width={"2"}>
            <Form inverted>
              <FilterField
                id={"artist"}
                label={"Artist"}
                group={"artist"}
                handleFilterSet={handleFilterSet}
                disabled={canEdit}
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
                disabled={canEdit}
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
                disabled={canEdit}
              />
            </Form>
          </Table.Cell>
          <Table.Cell width={"2"}>
            <Form>
              <Form.Dropdown placeholder='Nominator' fluid selection clearable options={getNominatorOptions(users)}
                             onChange={(_, data) => handleFilterSet("nominator", data.value)}/>
            </Form>
          </Table.Cell>
          <Table.Cell width={"2"}>
            <Form>
              <Form.Dropdown placeholder='Status' fluid selection clearable options={getBeatmapStatusOptions()}
                             onChange={(_, data) => handleFilterSet("status", data.value)}/>
            </Form>
          </Table.Cell>
          <Table.Cell width={"1"}>
            <BeatmapExtraFilter canEdit={canEdit} filter={filter} handleFilterSet={handleFilterSet} />
          </Table.Cell>
          <Table.Cell width={"2"}>
            <Button disabled={!canEdit} fluid inverted color={"green"} onClick={() => setAddModalOpen(true)}>Add Beatmap</Button>
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  )
}

function handleAddNominatorFilter(value, filter, handleFilterSet, users) {
  if (value) {
    console.log(value)

    let filterKey = "nominator"

    if (value.length === 0) {
      handleFilterSet(filterKey, [])
    } else {
      for (let usersKey in users) {
        let user = users[usersKey].osuId
        if (value.includes(user) && !filter[filterKey].includes(user.id)) {
          let selectedUsers = filter[filterKey]
          selectedUsers.push(user)
          handleFilterSet(filterKey, selectedUsers)
        } else if (!value.includes(user) && filter[filterKey].includes(user)) {
          let selectedUsers = filter[filterKey]
          const index = selectedUsers.indexOf(user)
          const newValue = selectedUsers.slice(0, index).concat(selectedUsers.slice(index + 1, selectedUsers.length))
          handleFilterSet(filterKey, newValue)
        }
      }
    }
  }
}

function handleAddStatusFilter(value, filter, handleFilterSet) {
  if (value) {
    let filterKey = "status"

    if (value.length === 0) {
      handleFilterSet(filterKey, [])
    } else {
      for (let status in BEATMAP_STATUS) {
        let statusValue = BEATMAP_STATUS[status]
        if (value.includes(statusValue.id) && !filter[filterKey].includes(statusValue.id)) {
          let currentStatuses = filter[filterKey]
          currentStatuses.push(statusValue.id)
          handleFilterSet(filterKey, currentStatuses)
        } else if (!value.includes(statusValue.id) && filter[filterKey].includes(statusValue.id)) {
          let statuses = filter[filterKey]
          const index = statuses.indexOf(statusValue.id)
          const newValue = statuses.slice(0, index).concat(statuses.slice(index + 1, statuses.length))
          handleFilterSet(filterKey, newValue)
        }
      }
    }
  }
}

export default BeatmapFilter
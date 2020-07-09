import {Button, Form, Grid, Icon, Popup, Table} from "semantic-ui-react"
import {USER_ROLES} from "../../Constants"
import React from "react"
import {getBeatmapStatusOptions, getNominatorOptions} from "../../util/BeatmapUtil";



const UserFilter = ({filter, setFilter, setAddModalOpen, isAdmin, canEdit, setPage}) => {
  function handleFilterSet(group, value) {
    filter[group] = value
    setFilter({
      ...filter
    })
    setPage(1)
  }

  return (
    <Table inverted>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell width={"2"}>
            <Popup
              trigger={
                <Button fluid color={"black"} content={
                  <div>
                    <Icon name={"cog"} /> Filters
                  </div>
                } />
              }
              content={<Grid className={"filter-settings-popup"} textAlign={"center"}>
                <Grid.Row>
                  <Grid.Column width={16}>
                    <Form>
                      <Form.Dropdown
                        placeholder='Roles' fluid multiple selection options={options} value={filter.roles}
                        onChange={(event, data) =>
                          handleMultiSelectFilter("roles", data.value, filter, handleFilterSet, USER_ROLES)
                        }/>
                    </Form>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column computer={7} mobile={16}>
                    <Grid verticalAlign={"middle"} textAlign={"center"}>
                      <Grid.Row>
                        <Grid.Column width={"3"} textAlign={"right"}>
                          Name
                        </Grid.Column>
                        <Grid.Column width={"2"}>
                          <Icon name={"user"} />
                        </Grid.Column>
                        <Grid.Column width={"11"}>
                          <Form inverted>
                            <FilterField
                              id={"name"}
                              label={"Name"}
                              group={"name"}
                              handleFilterSet={handleFilterSet}
                              value={filter.name}
                            />
                          </Form>
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </Grid.Column>
                  <Grid.Column computer={9} mobile={16}>
                    <Grid verticalAlign={"middle"} textAlign={"center"}>
                      <Grid.Row>
                        <Grid.Column width={"4"} textAlign={"right"}>Can Edit</Grid.Column>
                        <Grid.Column width={"2"}>
                          <Icon Icon name={"cog"} size={"large"} />
                        </Grid.Column>
                        <Grid.Column width={"10"}>
                          <Button.Group fluid>
                            <Button
                              primary={filter.canEdit === true}
                              color={filter.canEdit !== true ? "grey" : ""}
                              active={filter.canEdit === true}
                              onClick={() => handleFilterSet("canEdit", true)}>Yes</Button>
                            <Button
                              primary={filter.canEdit === false}
                              color={filter.canEdit !== false ? "grey" : ""}
                              active={filter.canEdit === false}
                              onClick={() => handleFilterSet("canEdit", false)}>No</Button>
                            <Button
                              primary={filter.canEdit === null}
                              color={filter.canEdit !== null ? "grey" : ""}
                              active={filter.canEdit === null}
                              onClick={() => handleFilterSet("canEdit", null)}>Any</Button>
                          </Button.Group>
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row>
                        <Grid.Column width={"4"} textAlign={"right"}>Is Admin</Grid.Column>
                        <Grid.Column width={"2"}>
                          <Icon Icon name={"user secret"} size={"large"} />
                        </Grid.Column>
                        <Grid.Column width={"10"}>
                          <Button.Group fluid>
                            <Button
                              primary={filter.isAdmin === true}
                              color={filter.isAdmin !== true ? "grey" : ""}
                              active={filter.isAdmin === true}
                              onClick={() => handleFilterSet("isAdmin", true)}>Yes</Button>
                            <Button
                              primary={filter.isAdmin === false}
                              color={filter.isAdmin !== false ? "grey" : ""}
                              active={filter.isAdmin === false}
                              onClick={() => handleFilterSet("isAdmin", false)}>No</Button>
                            <Button
                              primary={filter.isAdmin === null}
                              color={filter.isAdmin !== null ? "grey" : ""}
                              active={filter.isAdmin === null}
                              onClick={() => handleFilterSet("isAdmin", null)}>Any</Button>
                          </Button.Group>
                        </Grid.Column>
                      </Grid.Row>
                      {canEdit &&
                        <Grid.Row>
                          <Grid.Column width={"3"} textAlign={"right"}>Page Limit</Grid.Column>
                          <Grid.Column width={"2"}>
                            <Icon disabled={!canEdit} Icon name={"list ol"} size={"large"} />
                          </Grid.Column>
                          <Grid.Column width={"11"}>
                            <Button.Group fluid>
                              <Button
                                inverted
                                primary={filter.limit === 10}
                                color={filter.limit !== 10 ? "grey" : ""}
                                active={filter.limit === 10}
                                onClick={() => handleFilterSet("limit", 10)}>10</Button>
                              <Button
                                inverted
                                primary={filter.limit === 20}
                                color={filter.limit !== 20 ? "grey" : ""}
                                active={filter.limit === 20}
                                onClick={() => handleFilterSet("limit", 20)}>20</Button>
                              <Button
                                inverted
                                primary={filter.limit === 50}
                                color={filter.limit !== 50 ? "grey" : ""}
                                active={filter.limit === 50}
                                onClick={() => handleFilterSet("limit", 50)}>50</Button>
                            </Button.Group>
                          </Grid.Column>
                        </Grid.Row>
                      }
                    </Grid>
                  </Grid.Column>
                </Grid.Row>
              </Grid>}
              on='click'
              position='bottom left'
              inverted
            />
          </Table.HeaderCell>
          <Table.HeaderCell width={"5"}/>
          <Table.HeaderCell width={"7"}/>
          <Table.HeaderCell width={"2"}>
            <Button disabled={!isAdmin} fluid inverted color={"green"} onClick={() => setAddModalOpen(true)}>Add User</Button>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
    </Table>
  )
}

const options = [
  getOption(USER_ROLES.BeatmapNominator),
  getOption(USER_ROLES.ProbationBeatmapNominator),
  getOption(USER_ROLES.NominationAssessmentTeam),
  getOption(USER_ROLES.RetiredCatch),
  getOption(USER_ROLES.Observer)
]

function getOption(status) {
  return {
    key: status.id,
    text: status.full,
    value: status.id,
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
}

function handleMultiSelectFilter(key, value, filter, handleFilterSet, items) {
  if (value) {
    if (value.length === 0) {
      handleFilterSet(key, [])
    } else {
      for (let item in items) {
        let filterValue = items[item]
        if (value.includes(filterValue.id) && !filter[key].includes(filterValue.id)) {
          let currentRoles = filter[key]
          currentRoles.push(filterValue.id)
          handleFilterSet(key, currentRoles)
        } else if (!value.includes(filterValue.id) && filter[key].includes(filterValue.id)) {
          let roles = filter[key]
          const index = roles.indexOf(filterValue.id)
          const newValue = roles.slice(0, index).concat(roles.slice(index + 1, roles.length))
          handleFilterSet(key, newValue)
        }
      }
    }
  }
}

export default UserFilter
import React, {useState} from "react"
import {Button, Form, Grid, Icon, Popup, Table} from "semantic-ui-react"
import {getBeatmapStatusOptions, getNominatorOptions} from "../../util/BeatmapUtil"
import "./BeatmapFilter.css"
import {getUserWithId} from "../../util/UserUtil";

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

const BeatmapFilter = ({filter, setAddModalOpen, setFilter, canEdit, setPage, users, userId, onRankedPage, onGravedPage}) => {
  const [selectedNominator, setSelectedNominator] = useState(null)

  function handleFilterSet(group, value) {
    filter[group] = value
    setFilter({
      ...filter
    })
    setPage(1)
  }

  console.log({filter})

  let selectedNominatorInfo

  if (filter.nominator != null && filter.nominator !== userId) {
    selectedNominatorInfo = getUserWithId(users, filter.nominator)
  } else {
    selectedNominatorInfo = null
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
              content={<Grid className={"filter-settings-popup"}>
                <Grid.Row>
                  <Grid.Column computer={(onRankedPage !== true && onGravedPage !== true) ? 8 : 16} mobile={16}>
                    <Form>
                      <Form.Dropdown search placeholder='Nominator' fluid selection clearable options={getNominatorOptions(users)}
                                     value={selectedNominator}
                                     onChange={(_, data) => {
                                       handleFilterSet("nominator", data.value)
                                       setSelectedNominator(data.value)
                                     }}/>
                    </Form>
                  </Grid.Column>
                  {onRankedPage !== true && onGravedPage !== true &&
                    <Grid.Column computer={8} mobile={16}>
                      <Form>
                        <Form.Dropdown placeholder='Status' fluid selection clearable options={getBeatmapStatusOptions()}
                                       onChange={(_, data) => handleFilterSet("status", data.value)}/>
                      </Form>
                    </Grid.Column>
                  }
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column computer={8} mobile={16}>
                    <Grid verticalAlign={"middle"}>
                      <Grid.Row>
                        <Grid.Column width={"3"} textAlign={"right"}>
                          Artist
                        </Grid.Column>
                        <Grid.Column width={"2"}>
                          <Icon name={"pencil"} />
                        </Grid.Column>
                        <Grid.Column width={"11"}>
                          <Form inverted>
                            <FilterField
                              id={"artist"}
                              label={"Artist"}
                              group={"artist"}
                              handleFilterSet={handleFilterSet}
                              disabled={canEdit}
                            />
                          </Form>
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row>
                        <Grid.Column width={"3"} textAlign={"right"}>
                          Title
                        </Grid.Column>
                        <Grid.Column width={"2"}>
                          <Icon name={"heading"} />
                        </Grid.Column>
                        <Grid.Column width={"11"}>
                          <Form inverted>
                            <FilterField
                              id={"title"}
                              label={"Title"}
                              group={"title"}
                              handleFilterSet={handleFilterSet}
                              disabled={canEdit}
                            />
                          </Form>
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row>
                        <Grid.Column width={"3"} textAlign={"right"}>
                          Mapper
                        </Grid.Column>
                        <Grid.Column width={"2"}>
                          <Icon name={"user"} />
                        </Grid.Column>
                        <Grid.Column width={"11"}>
                          <Form inverted>
                            <FilterField
                              id={"mapper"}
                              label={"Mapper"}
                              group={"mapper"}
                              handleFilterSet={handleFilterSet}
                              disabled={canEdit}
                            />
                          </Form>
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  </Grid.Column>
                  <Grid.Column computer={8} mobile={16}>
                    <Grid verticalAlign={"middle"}>
                      {onRankedPage !== true &&
                        <Grid.Row>
                          <Grid.Column width={"5"} textAlign={"right"}>
                            Nominators
                          </Grid.Column>
                          <Grid.Column width={"2"}>
                            <Icon name={(filter.hideWithTwoNominators) ? "user cancel" : "group"} color={"green"} size={"large"} />
                          </Grid.Column>
                          <Grid.Column width={"9"}>
                            <Button.Group fluid>
                              <Button
                                inverted
                                primary={filter.hideWithTwoNominators === true}
                                secondary={filter.hideWithTwoNominators !== true}
                                active={filter.hideWithTwoNominators === true}
                                onClick={() => handleFilterSet("hideWithTwoNominators", true)}>Missing</Button>
                              <Button
                                inverted
                                primary={filter.hideWithTwoNominators === false}
                                secondary={filter.hideWithTwoNominators !== false}
                                active={filter.hideWithTwoNominators === false}
                                onClick={() => handleFilterSet("hideWithTwoNominators", false)}>Any</Button>
                            </Button.Group>
                          </Grid.Column>
                        </Grid.Row>
                      }
                      {canEdit &&
                      <Grid.Row>
                        <Grid.Column width={"5"} textAlign={"right"}>Page Limit</Grid.Column>
                        <Grid.Column width={"2"}>
                          <Icon disabled={!canEdit} Icon name={"list ol"} size={"large"} />
                        </Grid.Column>
                        <Grid.Column widescreen={"9"}>
                          <Button.Group fluid>
                            <Button
                              inverted
                              primary={filter.limit === 10}
                              secondary={filter.limit !== 10}
                              active={filter.limit === 10}
                              onClick={() => handleFilterSet("limit", 10)}>10</Button>
                            <Button
                              inverted
                              primary={filter.limit === 20}
                              secondary={filter.limit !== 20}
                              active={filter.limit === 20}
                              onClick={() => handleFilterSet("limit", 20)}>20</Button>
                            <Button
                              inverted
                              primary={filter.limit === 50}
                              secondary={filter.limit !== 50}
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
          <Table.HeaderCell width={"2"}>
            <Button disabled={!canEdit} fluid color={
              filter.nominator === userId ? "blue" : selectedNominatorInfo ? "orange": "green"
            } onClick={() => {
              if (filter.nominator === userId) {
                handleFilterSet("nominator", null)
                setSelectedNominator(null)
              } else {
                handleFilterSet("nominator", userId)
                setSelectedNominator(userId)
              }
            }} animated='vertical'>
              <Button.Content hidden>
                <Icon name={filter.nominator === userId ? "user outline" : "user"} />
                {filter.nominator === userId ? "Clear my" : selectedNominatorInfo ? "Show my" : "Show my"} icons
              </Button.Content>
              <Button.Content visible>
                <Icon name={filter.nominator === userId ? "star outline" : "star"} />
                {filter.nominator === userId ? "Showing my" : selectedNominatorInfo ? selectedNominatorInfo.osuName + " their" : "Showing all"} icons
              </Button.Content>
            </Button>
          </Table.HeaderCell>
          <Table.HeaderCell width={"2"}/>
          <Table.HeaderCell width={"2"}/>
          <Table.HeaderCell width={"2"}/>
          <Table.HeaderCell width={"2"}/>
          <Table.HeaderCell width={"1"}/>
          <Table.HeaderCell width={"2"}>
            {onRankedPage !== true && onGravedPage !== true &&
              <Button disabled={!canEdit} fluid color={"green"} onClick={() => setAddModalOpen(true)}><Icon
                name={"plus"}/> Add Beatmap</Button>
            }
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
    </Table>
  )
}


export default BeatmapFilter
import React, {useState} from "react"
import {Button, Form, Grid, Icon, Popup, Table} from "semantic-ui-react"
import {getBeatmapStatusOptions, getNominatorOptions} from "../../util/BeatmapUtil"
import "./BeatmapFilter.css"
import {getUserWithId} from "../../util/UserUtil"
import FilterItem from "../generic/FilterItem"
import FilterButton from "../generic/FilterButton"
import FilterField from "../generic/FilterField"
import {debouncingFilter, instantFilter} from "../../util/FilterUtil"
import useWindowDimensions from "../../hooks/useWindowDimensions"

const BeatmapFilter = ({filter, setAddModalOpen, setFilter, canEdit, users, userId, onRankedPage, onGravedPage}) => {
  const [selectedNominator, setSelectedNominator] = useState(null)
  const [formValues, setFormValues] = useState(filter)
  const [timeoutValue, setTimeoutValue] = useState(0)
  const { height, width } = useWindowDimensions();

  function instantFilterSet(group, value) {
    instantFilter(group, value, formValues, setFormValues, timeoutValue, setFilter)
  }

  function debouncingFilterSet(group, value) {
    debouncingFilter(group, value, formValues, setFormValues, timeoutValue, setTimeoutValue, setFilter)
  }

  let selectedNominatorInfo

  if (formValues.nominator != null && formValues.nominator !== userId) {
    selectedNominatorInfo = getUserWithId(users, formValues.nominator)
  } else {
    selectedNominatorInfo = null
  }

  let isMobile = width <= 767

  return (
    <Table inverted>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell width={"2"}>
            <Popup
              trigger={
                <Button fluid color={"black"} content={
                  <div>
                    <Icon name={"cog"}/> Filters
                  </div>
                }/>
              }
              content={<Grid className={"filter-settings-popup"}>
                <Grid.Row>
                  <Grid.Column tablet={(onRankedPage !== true && onGravedPage !== true) ? 8 : 16} computer={(onRankedPage !== true && onGravedPage !== true) ? 8 : 16} mobile={16}>
                    <Form>
                      <Form.Dropdown search placeholder='Nominator' fluid selection clearable
                                     options={getNominatorOptions(users)}
                                     value={selectedNominator}
                                     onChange={(_, data) => {
                                       debouncingFilterSet("nominator", data.value)
                                       setSelectedNominator(data.value)
                                     }}/>
                    </Form>
                  </Grid.Column>
                  {onRankedPage !== true && onGravedPage !== true &&
                  <Grid.Column tablet={8} computer={8} mobile={16}>
                    <Form>
                      <Form.Dropdown placeholder='Status' fluid selection clearable options={getBeatmapStatusOptions()}
                                     onChange={(_, data) => debouncingFilterSet("status", data.value)}/>
                    </Form>
                  </Grid.Column>
                  }
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column tablet={8} computer={8} mobile={16}>
                    <Grid verticalAlign={"middle"}>
                      <FilterItem title={"Artist"} icon={"pencil"} titleWidth={3} itemWidth={11} isMobile={isMobile} item={
                        <Form inverted>
                          <FilterField
                            id={"artist"}
                            label={"Artist"}
                            group={"artist"}
                            value={formValues.artist}
                            handleFilterSet={debouncingFilterSet}
                            enabled={canEdit}
                          />
                        </Form>
                      }/>
                      <FilterItem title={"Title"} icon={"heading"} titleWidth={3} itemWidth={11} isMobile={isMobile} item={
                        <Form inverted>
                          <FilterField
                            id={"title"}
                            label={"Title"}
                            group={"title"}
                            value={formValues.title}
                            handleFilterSet={debouncingFilterSet}
                            enabled={canEdit}
                          />
                        </Form>
                      }/>
                      <FilterItem title={"Mapper"} icon={"user"} titleWidth={3} itemWidth={11} isMobile={isMobile} item={
                        <Form inverted>
                          <FilterField
                            id={"mapper"}
                            label={"Mapper"}
                            group={"mapper"}
                            value={formValues.mapper}
                            handleFilterSet={debouncingFilterSet}
                            enabled={canEdit}
                          />
                        </Form>
                      }/>
                    </Grid>
                  </Grid.Column>
                  <Grid.Column className={"filter-buttons"} tablet={8} computer={8} mobile={16}>
                    <Grid verticalAlign={"middle"}>
                      {onRankedPage !== true &&
                      <FilterItem icon={(formValues.hideWithTwoNominators) ? "user cancel" : "group"}
                                  iconColor={"green"} title={"Nominators"} isMobile={isMobile} item={
                        <Button.Group fluid>
                          <FilterButton active={formValues.hideWithTwoNominators === true} value={true}
                                        field={"hideWithTwoNominators"} name={"Missing"}
                                        handleFilterSet={instantFilterSet}/>
                          <FilterButton active={formValues.hideWithTwoNominators === false} value={false}
                                        field={"hideWithTwoNominators"} name={"Any"}
                                        handleFilterSet={instantFilterSet}/>
                        </Button.Group>
                      }/>
                      }
                      {canEdit &&
                      <FilterItem title={"Limit"} icon={"list ol"} isMobile={isMobile} item={
                        <Button.Group fluid>
                          <FilterButton active={formValues.limit === "Ten"} value={"Ten"} field={"limit"} name={"10"}
                                        handleFilterSet={instantFilterSet}/>
                          <FilterButton active={formValues.limit === "Twenty"} value={"Twenty"} field={"limit"}
                                        name={"20"} handleFilterSet={instantFilterSet}/>
                          <FilterButton active={formValues.limit === "Fifty"} value={"Fifty"} field={"limit"}
                                        name={"50"} handleFilterSet={instantFilterSet}/>
                        </Button.Group>
                      }/>
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
              formValues.nominator === userId ? "blue" : selectedNominatorInfo ? "orange" : "green"
            } onClick={() => {
              if (formValues.nominator === userId) {
                setSelectedNominator(null)
                instantFilterSet("nominator", null)
              } else {
                setSelectedNominator(userId)
                instantFilterSet("nominator", userId)
              }
            }} animated='vertical'>
              <Button.Content hidden>
                <Icon name={formValues.nominator === userId ? "user outline" : "user"}/>
                {formValues.nominator === userId ? "Clear my" : selectedNominatorInfo ? "Show my" : "Show my"} icons
              </Button.Content>
              <Button.Content visible>
                <Icon name={formValues.nominator === userId ? "star outline" : "star"}/>
                {formValues.nominator === userId ? "Showing my" : selectedNominatorInfo ? selectedNominatorInfo.osuName + " their" : "Showing all"} icons
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
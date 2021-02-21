import { Button, Form, Grid, Icon, Popup } from 'semantic-ui-react'
import { USER_ROLES } from '../../Constants'
import React, { useState } from 'react'
import FilterItem from '../generic/FilterItem'
import FilterButton from '../generic/FilterButton'
import FilterField from '../generic/FilterField'
import { debouncingFilter, instantFilter } from '../../util/FilterUtil'
import useWindowDimensions from '../../hooks/useWindowDimensions'

const UserFilter = ({ filter, setFilter, setAddModalOpen, isAdmin, canEdit, setPage }) => {
  const [formValues, setFormValues] = useState(filter)
  const [timeoutValue, setTimeoutValue] = useState(0)
  const { width } = useWindowDimensions()

  function instantFilterSet (group, value) {
    instantFilter(group, value, formValues, setFormValues, timeoutValue, setFilter)
  }

  function debouncingFilterSet (group, value) {
    debouncingFilter(group, value, formValues, setFormValues, timeoutValue, setTimeoutValue, setFilter)
  }

  const isMobile = width <= 767

  return (
    <Grid className={'multi-row-content'}>
      <Grid.Row>
        <Grid.Column tablet={4} computer={2} mobile={8}>
          <Popup
            trigger={
              <Button fluid color={'black'} content={
                <div>
                  <Icon name={'cog'}/> Filters
                </div>
              }/>
            }
            content={<Grid className={'filter-settings-popup'}>
              <Grid.Row>
                <Grid.Column computer={16} tablet={16} mobile={16}>
                  <Form>
                    <Form.Dropdown
                      placeholder='Roles' fluid multiple selection options={options} value={formValues.roles}
                      onChange={(event, data) =>
                        handleMultiSelectFilter('roles', data.value, formValues, debouncingFilterSet, USER_ROLES)
                      }/>
                  </Form>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column tablet={8} computer={8} mobile={16}>
                  <Grid verticalAlign={'middle'}>
                    <FilterItem title={'Name'} icon={'user'} titleWidth={3} itemWidth={11} isMobile={isMobile} item={
                      <Form inverted>
                        <FilterField
                          id={'name'}
                          label={'Name'}
                          group={'name'}
                          value={formValues.name}
                          handleFilterSet={debouncingFilterSet}
                          enabled={canEdit}
                        />
                      </Form>
                    }/>
                  </Grid>
                </Grid.Column>
                <Grid.Column tablet={8} computer={8} mobile={16}>
                  <Grid verticalAlign={'middle'}>
                    <FilterItem isMobile={isMobile} icon={'cog'} title={'Can Edit'} className={'first-row'} item={
                      <Button.Group fluid>
                        <FilterButton active={formValues.canEdit === true} value={true} field={'canEdit'} name={'Yes'}
                          handleFilterSet={instantFilterSet}/>
                        <FilterButton active={formValues.canEdit === false} value={false} field={'canEdit'}
                          name={'No'} handleFilterSet={instantFilterSet}/>
                        <FilterButton active={formValues.canEdit === null} value={null} field={'canEdit'} name={'Any'}
                          handleFilterSet={instantFilterSet}/>
                      </Button.Group>
                    }/>
                    <FilterItem isMobile={isMobile} icon={'user secret'} title={'Is Admin'} item={
                      <Button.Group fluid>
                        <FilterButton active={formValues.isAdmin === true} value={true} field={'isAdmin'} name={'Yes'}
                          handleFilterSet={instantFilterSet}/>
                        <FilterButton active={formValues.isAdmin === false} value={false} field={'isAdmin'}
                          name={'No'} handleFilterSet={instantFilterSet}/>
                        <FilterButton active={formValues.isAdmin === null} value={null} field={'isAdmin'} name={'Any'}
                          handleFilterSet={instantFilterSet}/>
                      </Button.Group>
                    }/>
                    {canEdit &&
                    <FilterItem isMobile={isMobile} title={'Limit'} icon={'list ol'} item={
                      <Button.Group fluid>
                        <FilterButton active={formValues.limit === 'Ten'} value={'Ten'} field={'limit'} name={'10'}
                          handleFilterSet={instantFilterSet}/>
                        <FilterButton active={formValues.limit === 'Twenty'} value={'Twenty'} field={'limit'}
                          name={'20'} handleFilterSet={instantFilterSet}/>
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
        </Grid.Column>
        <Grid.Column only={'computer tablet'} tablet={4} computer={10} />
        <Grid.Column only={'computer tablet'} tablet={4} computer={1} />
        <Grid.Column tablet={4} computer={3} mobile={8}>
          <Button disabled={!isAdmin} fluid color={'green'} onClick={() => setAddModalOpen(true)}><Icon
            name={'plus'}/> Add User</Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

const options = [
  getOption(USER_ROLES.BeatmapNominator),
  getOption(USER_ROLES.ProbationBeatmapNominator),
  getOption(USER_ROLES.NominationAssessmentTeam),
  getOption(USER_ROLES.RetiredCatch),
  getOption(USER_ROLES.Observer),
  getOption(USER_ROLES.Guest)
]

function getOption (status) {
  return {
    key: status.id,
    text: status.full,
    value: status.id,
    className: status.className
  }
}

function handleMultiSelectFilter (key, value, filter, handleFilterSet, items) {
  if (value) {
    if (value.length === 0) {
      handleFilterSet(key, [])
    } else {
      for (const item in items) {
        const filterValue = items[item]
        if (value.includes(filterValue.id) && !filter[key].includes(filterValue.id)) {
          const currentRoles = filter[key]
          currentRoles.push(filterValue.id)
          handleFilterSet(key, currentRoles)
        } else if (!value.includes(filterValue.id) && filter[key].includes(filterValue.id)) {
          const roles = filter[key]
          const index = roles.indexOf(filterValue.id)
          const newValue = roles.slice(0, index).concat(roles.slice(index + 1, roles.length))
          handleFilterSet(key, newValue)
        }
      }
    }
  }
}

export default UserFilter

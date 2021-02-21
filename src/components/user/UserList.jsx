import { Button, Grid, Icon, Image, Label } from 'semantic-ui-react'
import React from 'react'
import BasicPagination from '../generic/BasicPagination'
import { getReadableRole } from '../../util/UserUtil'

const UserList = ({ loading, error, filter, setPage, payload, setEditModalOpen, setSelectedUser, isAdmin }) => {
  let possibleLastPage = 0

  if (!loading && !error) {
    let limitValue
    if (filter.limit === 'Ten') {
      limitValue = 10
    } else if (filter.limit === 'Twenty') {
      limitValue = 20
    } else {
      limitValue = 10
    }

    possibleLastPage = Math.ceil(payload.total / limitValue)
  }

  return (
    <Grid className={'multi-row-content'} textAlign={'center'} verticalAlign={'middle'}>
      <Grid.Row only={'computer'} className={'table-header-row'}>
        <Grid.Column computer={3}>#</Grid.Column>
        <Grid.Column computer={3}>Username</Grid.Column>
        <Grid.Column computer={3}>Nominator Role</Grid.Column>
        <Grid.Column computer={2}>Can Edit</Grid.Column>
        <Grid.Column computer={2}>Is Admin</Grid.Column>
        <Grid.Column computer={3}>Actions</Grid.Column>
      </Grid.Row>
      {payload && payload.response && payload.response.map((user, index) => {
        const userRole = getReadableRole(user.role)
        return (
          <Grid.Row key={'user-list-' + index} className={'table-row user-row ' + userRole.className}>
            <Grid.Column mobile={4} tablet={4} computer={3}>
              <Image className={'user-banner'} fluid src={user.profilePictureUri}/>
            </Grid.Column>
            <Grid.Column mobile={8} tablet={6} computer={3} textAlign={'center'}>{user.osuName}</Grid.Column>
            <Grid.Column mobile={4} tablet={6} computer={3} textAlign={'center'}><Label className={userRole.className}>{userRole.full}</Label></Grid.Column>
            <Grid.Column only={'computer'} computer={2} textAlign={'center'}>
              <AccessIcon hasAccess={user.hasEditPermissions}/>
            </Grid.Column>
            <Grid.Column only={'computer'} computer={2} textAlign={'center'}>
              <AccessIcon hasAccess={user.hasAdminPermissions}/>
            </Grid.Column>
            <Grid.Column mobile={16} tablet={16} computer={3} textAlign={'center'}>
              <Button.Group fluid>
                <Button color={'green'} onClick={_ => {
                  setSelectedUser(user.osuId)
                  setEditModalOpen(true)
                }}>
                  <Icon fitted name={isAdmin ? 'pencil' : 'eye'}/>
                </Button>
                <Button color={'blue'}
                  onClick={() => window.open('https://osu.ppy.sh/users/' + user.osuId, '_blank')}>
                  <Icon fitted name={'linkify'}/>
                </Button>
              </Button.Group>
            </Grid.Column>
          </Grid.Row>
        )
      })}
      <Grid.Row className={'table-footer-row'}>
        <Grid.Column width={14} textAlign={'left'}>
          {payload &&
          <p>{payload.total} User Found</p>
          }
        </Grid.Column>
        <Grid.Column width={2}>
          <BasicPagination currentPage={filter.page} lastPage={possibleLastPage} setPage={setPage}/>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

function AccessIcon ({ hasAccess }) {
  if (hasAccess && hasAccess === true) {
    return (
      <div>
        <Icon fitted size={'large'} name={'check'} color={'green'}/>
      </div>
    )
  } else {
    return (
      <div>
        <Icon fitted size={'large'} name={'cancel'} color={'red'}/>
      </div>
    )
  }
}

export default UserList

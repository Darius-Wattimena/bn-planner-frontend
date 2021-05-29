import { getReadableRole, getUserWithId } from '../../util/UserUtil'
import { Form, Grid, Image, Label } from 'semantic-ui-react'
import { getNominatorOptions } from '../../util/BeatmapUtil'
import React from 'react'

const NominatorField = ({ isFirst, unfinished, canEdit, nominatorId, hasNominated, users, onDropdownChange, onCheckboxChange, error }) => {
  let avatarUri
  let userDetails
  let userRole

  if (nominatorId === 0) {
    avatarUri = 'https://osu.ppy.sh/images/layout/avatar-guest@2x.png'
    userDetails = null
    userRole = null
  } else {
    userDetails = getUserWithId(users, nominatorId)
    avatarUri = userDetails.profilePictureUri
    userRole = getReadableRole(userDetails.role)
  }

  return (
    <div>
      <Grid>
        <Grid.Row className={'nominator-row'}>
          <Grid.Column computer={5} tablet={4} mobile={6} className={'nominator-avatar'}>
            <Image fluid src={avatarUri} className={(hasNominated ? 'nominated' : '')} label={
              (userRole !== null)
                ? (
                  <Label ribbon horizontal className={userRole.className}>
                    {userRole.name}
                  </Label>
                )
                : null
            } />
          </Grid.Column>
          <Grid.Column computer={11} tablet={12} mobile={10} className={'nominator-details'}>
            <Grid>
              <Grid.Row>
                <Grid.Column computer={16} tablet={16} mobile={16}>
                  <h4>{(isFirst) ? 'Nominator #1' : 'Nominator #2'}</h4>
                </Grid.Column>
                <Grid.Column computer={16} tablet={16} mobile={16}>
                  <Form.Dropdown
                    disabled={!canEdit}
                    selection
                    search
                    options={getNominatorOptions(users)}
                    value={nominatorId}
                    onChange={onDropdownChange}
                    error={error}
                  />
                </Grid.Column>
                <Grid.Column computer={16} tablet={16} mobile={16}>
                  <Form.Checkbox
                    label={'Nominated'}
                    disabled={!canEdit || unfinished || nominatorId === 0}
                    checked={hasNominated}
                    onChange={onCheckboxChange}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  )
}

export default NominatorField

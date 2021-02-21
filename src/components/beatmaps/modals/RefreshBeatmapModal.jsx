import React, { useState } from 'react'
import { useCookies } from 'react-cookie'
import { useQuery } from 'react-fetching-library'
import Api from '../../../resources/Api'
import { Button, Checkbox, Header, Icon, Modal } from 'semantic-ui-react'
import { pushNotification } from '../../../util/NotificationUtil'

const RefreshBeatmapModal = ({ open, onModalReset, setOpen, beatmap, userId }) => {
  const [cookies] = useCookies(['bnplanner_osu_access_token'])
  const [read, setRead] = useState(false)
  const { query } = useQuery(Api.refreshMetadata(beatmap.osuId, cookies.bnplanner_osu_access_token, userId), false)

  function refreshMetadata () {
    const asyncRefreshMetadata = async () => {
      await query().then(value => {
        if (value.error || value.payload === false) {
          pushNotification('Error syncing metadata', 'Could not sync metadata of the set', 'danger')
        } else {
          onModalReset()
        }
      })
    }

    return asyncRefreshMetadata()
  }

  return (
    <Modal open={open} onClose={() => setOpen(false)} size={'tiny'}>
      <div className={'modal-header'}>
        <Header content={'Syncing metadata : ' + beatmap.artist + ' - ' + beatmap.title}/>
      </div>
      <Modal.Content>
        <div>
          Are you sure that you want to sync the metadata of the following beatmap?
        </div>
        <br/>
        <div>
          This should only be used when the metadata of a set got changed in some way, thus being inconsistent with the planner.
        </div>
        <br/>
        <Checkbox
          label={'I\'ve read the above'}
          checked={read}
          onChange={() => setRead(!read)}
        />
      </Modal.Content>
      <Modal.Actions>
        <Button color='red' onClick={() => setOpen(false)}>
          <Icon name='close'/> Cancel
        </Button>
        <Button disabled={!read} color='green' onClick={() => refreshMetadata()}>
          <Icon name='checkmark'/> Confirm
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default RefreshBeatmapModal

import React, { useState } from 'react'
import { useCookies } from 'react-cookie'
import { useMutation } from 'react-fetching-library'
import Api from '../../../resources/Api'
import { Button, Checkbox, Header, Icon, Modal } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'

const DeleteBeatmapModal = ({ open, query, setOpenEditModal, setOpen, beatmap, userId, redirectLocation }) => {
  const [cookies] = useCookies(['bnplanner_osu_access_token'])
  const [read, setRead] = useState(false)
  const history = useHistory()

  const { mutate } = useMutation(Api.deleteBeatmap)
  const handleSubmit = async (beatmapId) => {
    const { error: mutateError } = await mutate(beatmapId, cookies.bnplanner_osu_access_token, userId)

    if (mutateError) {
      console.log(mutateError)
    } else {
      query()
      setOpenEditModal(false)
      setOpen(false)
      history.push({
        pathname: '/' + redirectLocation
      })
    }
  }

  function verifyData () {
    return handleSubmit(beatmap.osuId)
  }

  return (
    <Modal open={open} onClose={() => setOpen(false)} size={'tiny'}>
      <div className={'modal-header'}>
        <Header content={'Deleting Beatmap : ' + beatmap.artist + ' - ' + beatmap.title}/>
      </div>
      <Modal.Content>
        <div>
          Are you sure that you want to delete the following beatmap from the planner?
        </div>
        <br/>
        <div>
          Deleting a map from the planner should only be used when you accidentally added a wrong set to the planner.
          If this is not the case then it's recommended to <u>remove yourself from the set</u> and move it to graved if the mapsets is graved!
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
        <Button disabled={!read} color='green' onClick={verifyData}>
          <Icon name='checkmark'/> Confirm
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default DeleteBeatmapModal

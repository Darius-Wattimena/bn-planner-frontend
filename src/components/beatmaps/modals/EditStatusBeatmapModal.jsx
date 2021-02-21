import React, { useState } from 'react'
import { useCookies } from 'react-cookie'
import { useMutation } from 'react-fetching-library'
import Api from '../../../resources/Api'
import { Button, Form, Header, Icon, Message, Modal } from 'semantic-ui-react'
import { getReadableStatus } from '../../../util/BeatmapUtil'
import { BEATMAP_STATUS } from '../../../Constants'

const EditStatusBeatmapModal = ({ open, query, setOpenEditModal, setOpen, beatmap, userId, status, onReset }) => {
  const [cookies] = useCookies(['bnplanner_osu_access_token'])
  const [showError, setShowError] = useState(false)
  const [statusFormValues, setStatusFormValues] = useState({ status: 0, reason: null })

  if (statusFormValues.status === 0 && open === true) {
    setStatusFormValues({
      status: status,
      reason: null
    })
  }

  const { mutate } = useMutation(Api.updateBeatmapStatus)
  const handleSubmit = async () => {
    const { error: mutateError, payload } = await mutate(beatmap.osuId, statusFormValues, cookies.bnplanner_osu_access_token, userId)

    if (mutateError || payload === false) {
      setShowError(true)
    } else {
      query()
      setShowError(false)
      setOpenEditModal(false)
      setOpen(false)
      onReset()
    }
  }

  function verifyData () {
    return handleSubmit()
  }

  const readableOldStatus = getReadableStatus(beatmap.status)
  const readableNewStatus = getReadableStatus(status)

  const isRankedOrGraved = status === BEATMAP_STATUS.Ranked.id || status === BEATMAP_STATUS.Graved.id || status === BEATMAP_STATUS.Pending.id

  return (
    <Modal open={open} onClose={() => setOpen(false)} size={'tiny'}>
      <div className={'modal-header'}>
        <Header content={'Updating Status'}/>
      </div>
      <Modal.Content>
        Are you sure that you want to update the status from <u
          className={readableOldStatus.className}>{readableOldStatus.name}</u> to <u
          className={readableNewStatus.className}>{readableNewStatus.name}</u> for the following beatmap?
        '<b>{beatmap.artist + ' - ' + beatmap.title}</b>'
        {(status === BEATMAP_STATUS.Popped.id || status === BEATMAP_STATUS.Disqualified.id) &&
        <>
          <Message
            info
            className={'info-message'}
            content={<p>Updating the status will change the nominated flags to <b>UNCHECKED</b>!</p>}
          />

          <Form>
            <Form.Input
              label={'Reason'}
              placeholder='Reason'
              value={statusFormValues.reason}
              required={true}
              onChange={event => setStatusFormValues({
                status: status,
                reason: event.target.value
              })}
            />
          </Form>
        </>
        }
        {status === BEATMAP_STATUS.Ranked.id &&
        <Message
          info
          className={'info-message'}
          content={<p>Updating the status will change the nominated flags to <b>CHECKED</b>!</p>}
        />
        }
        {showError &&
        <Message
          error
          className={'error-message'}
          header='Unexpected Error'
          content='An error occurred while saving, please contact Greaper if this persists!'
        />
        }
      </Modal.Content>
      <Modal.Actions>
        <Button color='red' onClick={() => setOpen(false)}>
          <Icon name='close'/> Cancel
        </Button>
        {!isRankedOrGraved &&
        <Button
          color='green'
          disabled={statusFormValues.reason === null || statusFormValues.reason.match(/^ *$/) !== null}
          onClick={verifyData}>
          <Icon name='checkmark'/> Confirm
        </Button>
        }
        {isRankedOrGraved &&
        <Button
          color='green'
          onClick={verifyData}>
          <Icon name='checkmark'/> Confirm
        </Button>
        }
      </Modal.Actions>
    </Modal>
  )
}

export default EditStatusBeatmapModal

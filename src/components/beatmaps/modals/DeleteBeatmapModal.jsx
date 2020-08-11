import React from "react"
import {useCookies} from "react-cookie"
import {useMutation} from "react-fetching-library"
import Api from "../../../resources/Api"
import {Button, Header, Icon, Modal} from "semantic-ui-react"

const DeleteBeatmapModal = ({open, query, setOpenEditModal, setOpen, beatmap, userId}) => {
  const [cookies] = useCookies(['bnplanner_osu_access_token'])

  const {mutate} = useMutation(Api.deleteBeatmap)
  const handleSubmit = async (beatmapId) => {
    const {error: mutateError} = await mutate(beatmapId, cookies.bnplanner_osu_access_token, userId)

    if (mutateError) {
      console.log(mutateError)
    } else {
      query()
      setOpenEditModal(false)
      setOpen(false)
    }
  }

  function verifyData() {
    return handleSubmit(beatmap.osuId)
  }

  return (
    <Modal open={open} onClose={() => setOpen(false)} size={"tiny"}>
      <div className={"modal-header"}>
        <Header content={"Deleting Beatmap : " + beatmap.artist + " - " + beatmap.title}/>
      </div>
      <Modal.Content>
        Are you sure that you want to delete the following beatmap from the planner?
      </Modal.Content>
      <Modal.Actions>
        <Button color='red' onClick={() => setOpen(false)}>
          <Icon name='close'/> Cancel
        </Button>
        <Button color='green' onClick={verifyData}>
          <Icon name='checkmark'/> Confirm
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default DeleteBeatmapModal
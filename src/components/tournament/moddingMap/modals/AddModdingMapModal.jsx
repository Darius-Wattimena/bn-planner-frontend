import React, {useState} from "react"
import {Button, Form, Header, Icon, Modal} from "semantic-ui-react"
import {useMutation} from "react-fetching-library"
import Api from "../../../../resources/Api"
import {useCookies} from "react-cookie"

const AddModdingMapModal = ({open, query, setOpen, userId}) => {
  const [formValues, setFormValues] = useState({
    _id: "",
    contestId: "",
    artist: "",
    title: "",
    downloadLink: ""
  })

  const [cookies] = useCookies(['bnplanner_osu_access_token'])

  const {mutate} = useMutation(Api.addModdingMap)
  const handleSubmit = async (formValues) => {
    const {error: mutateError} = await mutate(formValues, cookies.bnplanner_osu_access_token, userId)

    if (mutateError) {
      console.log(mutateError)
    } else {
      setFormValues({
        _id: "",
        contestId: "",
        artist: "",
        title: "",
        downloadLink: ""
      })
      query()
      setOpen(false)
    }
  }

  function setFormValue(field, value) {
    let newFormValues = formValues
    newFormValues[field] = value
    setFormValues({
      ...newFormValues
    })
  }

  function verifyData() {
    return handleSubmit(formValues)
  }

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <div className={"modal-header"}>
        <Header content='Add New Modding Map' />
      </div>
      <Modal.Content>
        <Form>
          <Form.Input
            label={"Contest ID"}
            value={formValues.contestId}
            onChange={event => setFormValue("contestId", event.target.value)}
          />
          <Form.Input
            label={"Artist"}
            value={formValues.artist}
            onChange={event => setFormValue("artist", event.target.value)}
          />
          <Form.Input
            label={"Title"}
            value={formValues.title}
            onChange={event => setFormValue("title", event.target.value)}
          />
          <Form.Input
            label={"Download Link"}
            value={formValues.downloadLink}
            onChange={event => setFormValue("downloadLink", event.target.value)}
          />
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color='red' onClick={() => setOpen(false)}>
          <Icon name='close' /> Cancel
        </Button>
        <Button color='green' onClick={verifyData}>
          <Icon name='checkmark' /> Add
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default AddModdingMapModal
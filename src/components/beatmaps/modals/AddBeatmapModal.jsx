import React, {useState} from "react"
import {Button, Form, Header, Icon, Message, Modal} from "semantic-ui-react"
import {useMutation} from "react-fetching-library"
import Api from "../../../resources/Api"
import {useCookies} from "react-cookie"
import {useHistory} from "react-router-dom"

const AddBeatmapModal = ({open, query, setOpen, userId}) => {
  const [formValues, setFormValues] = useState({
    beatmapUrl: "",
    artist: "",
    title: "",
    mapper: ""
  })
  const [incorrectUrl, setIncorrectUrl] = useState(false)
  const [cookies] = useCookies(['bnplanner_osu_access_token'])
  const history = useHistory()

  const {mutate} = useMutation(Api.addBeatmap)
  const handleSubmit = async (formValues) => {
    const {error: mutateError} = await mutate(formValues, cookies.bnplanner_osu_access_token, userId)

    if (mutateError) {
      console.log(mutateError)
    } else {
      setFormValues({
        beatmapUrl: ""
      })
      query()
      setOpen(false)
      history.push({
        pathname: '/beatmaps/' + formValues.beatmapId
      })
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
    if (formValues.beatmapUrl.startsWith("https://osu.ppy.sh/beatmapsets/") || formValues.beatmapUrl.startsWith("https://osu.ppy.sh/s/")) {
      let splitUrl = formValues.beatmapUrl.split("/")
      let setId

      if (formValues.beatmapUrl.startsWith("https://osu.ppy.sh/beatmapsets/")) {
        if (splitUrl[splitUrl.length - 2] === "beatmapsets") {
          setId = splitUrl[splitUrl.length - 2]
        } else {
          setId = splitUrl[splitUrl.length - 2].split('#')[0]
        }
      } else {
        setId = splitUrl[splitUrl.length - 1]
      }

      if (!isNaN(setId)) {
        let preparedValues = {
          "beatmapId": setId
        }

        setIncorrectUrl(false)
        return handleSubmit(preparedValues)
      }
    }

    setIncorrectUrl(true)
  }

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <div className={"modal-header"}>
        <Header content='Add New Beatmap'/>
      </div>
      <Modal.Content>
        <Form>
          <Form.Input
            label={"Beatmap URL"}
            placeholder={"Beatmap URL"}
            value={formValues.beatmapUrl}
            onChange={event => setFormValue("beatmapUrl", event.target.value)}
          />
          <Message
            visible={incorrectUrl === true}
            error
            header="The provided beatmap url is not correct"
            content="A beatmap url should either start with: 'https://osu.ppy.sh/beatmapsets/' or 'https://osu.ppy.sh/s/' and then followed by the beatmap set id to be counted as a correct url"
            className={"error-message"}
          />
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color='red' onClick={() => setOpen(false)}>
          <Icon name='close'/> Cancel
        </Button>
        <Button color='green' onClick={verifyData}>
          <Icon name='checkmark'/> Add
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default AddBeatmapModal
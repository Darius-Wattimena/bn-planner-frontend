import React, {useState} from "react"
import {Button, Form, Header, Icon, Modal} from "semantic-ui-react"
import {useMutation} from "react-fetching-library"
import Api from "../../../../resources/Api"
import {useCookies} from "react-cookie"
import {getNominatorOptions} from "../../../../util/BeatmapUtil";

const AddContestModal = ({open, query, setOpen, userId, users}) => {
  const [formValues, setFormValues] = useState({
    _id: "",
    name: "",
    accessIds: []
  })

  const [cookies] = useCookies(['bnplanner_osu_access_token'])

  const {mutate} = useMutation(Api.addContest)
  const handleSubmit = async (formValues) => {
    const {error: mutateError} = await mutate(formValues, cookies.bnplanner_osu_access_token, userId)

    if (mutateError) {
      console.log(mutateError)
    } else {
      setFormValues({
        _id: "",
        name: "",
        accessIds: []
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
        <Header content='Add New Contest'/>
      </div>
      <Modal.Content>
        <Form>
          <Form.Input
            label={"Id"}
            value={formValues._id}
            onChange={event => setFormValue("_id", event.target.value)}
          />
          <Form.Input
            label={"Name"}
            value={formValues.name}
            onChange={event => setFormValue("name", event.target.value)}
          />
          <Form.Dropdown
            label={"Has Access"}
            fluid multiple selection
            options={getNominatorOptions(users)}
            value={formValues.accessIds}
            onChange={(event, data) =>
              handleUserSelect(data.value, users, formValues, setFormValue)
            }/>
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

function handleUserSelect(value, users, form, setForm) {
  if (value) {
    let key = "accessIds";

    if (value.length === 0) {
      setForm(key, [])
    } else {
      for (let user in users) {
        let userValue = users[user];
        if (value.includes(userValue.osuId) && !form[key].includes(userValue.osuId)) {
          let currentStatuses = form[key];
          currentStatuses.push(userValue.osuId);
          setForm(key, currentStatuses)
        } else if (!value.includes(userValue.osuId) && form[key].includes(userValue.osuId)) {
          let statuses = form[key];
          const index = statuses.indexOf(userValue.osuId);
          const newValue = statuses.slice(0, index).concat(statuses.slice(index + 1, statuses.length));
          setForm(key, newValue)
        }
      }
    }
  }
}

export default AddContestModal
import React, {useState} from "react";
import {Button, Form, Header, Icon, Message, Modal} from "semantic-ui-react";
import {useMutation} from "react-fetching-library";
import Api from "../../../resources/Api";

const AddUserModal = (props) => {
  const [formValues, setFormValues] = useState({
    osuId: "",
    name: ""
  });

  const {loading, payload, mutate, error} = useMutation(Api.addUser);
  const handleSubmit = async (formValues) => {
    const {error: mutateError} = await mutate(formValues);

    if (mutateError) {
      console.log(mutateError)
    } else {
      setFormValues({
        osuId: "",
        name: ""
      });
      props.setOpen(false);
    }
  };

  function setFormValue(field, value) {
    let newFormValues = formValues;
    newFormValues[field] = value;
    setFormValues({
      ...newFormValues
    });
  }

  function verifyData() {
    if (!isNaN(formValues.osuId)) {
      return handleSubmit(formValues)
    }
  }

  return (
    <Modal
      open={props.open}
      onClose={() => props.setOpen(false)}
    >
      <Header content='Add Beatmap' />
      <Modal.Content>
        <Form>
          <Form.Input
            label={"User ID"}
            placeholder={"User ID"}
            value={formValues.osuId}
            onChange={event => setFormValue("osuId", event.target.value)}
            error={isNaN(formValues.osuId)}
          />
          <Message
            visible={isNaN(formValues.osuId)}
            error
            header='Your osu ID should be a number'
            content='You can only add a user to the bn planner if you provide a valid user ID.'
            className={"error-message"}
          />
          <Form.Input
            label={"Name"}
            placeholder='Name'
            value={formValues.name}
            onChange={event => setFormValue("name", event.target.value)}
          />
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color='red' onClick={() => props.setOpen(false)} inverted>
          <Icon name='close' /> Cancel
        </Button>
        <Button color='green' onClick={verifyData} inverted>
          <Icon name='checkmark' /> Add
        </Button>
      </Modal.Actions>
    </Modal>
  )
};

export default AddUserModal
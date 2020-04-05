import React, {useState} from "react";
import {Button, Form, Header, Icon, Message, Modal} from "semantic-ui-react";
import {useMutation} from "react-fetching-library";
import Api from "../../../resources/Api";

const AddBeatmapModal = (props) => {
  const [formValues, setFormValues] = useState({
    beatmapId: "",
    artist: "",
    title: "",
    mapper: ""
  });

  const { loading, payload, mutate, error } = useMutation(Api.addBeatmap);
  const handleSubmit = async (formValues) => {
    const { error: mutateError } = await mutate(formValues);

    if (mutateError) {
      console.log(mutateError)
    } else {
      setFormValues({
        beatmapId: "",
        artist: "",
        title: "",
        mapper: ""
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
    if (!isNaN(formValues.beatmapId)) {
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
            label={"Beatmap Set ID"}
            placeholder={"Beatmap Set ID"}
            value={formValues.beatmapId}
            onChange={event => setFormValue("beatmapId", event.target.value)}
            error={isNaN(formValues.beatmapId)}
          />
          <Message
            visible={isNaN(formValues.beatmapId)}
            error
            header='The beatmap ID should be a number'
            content='You can only add a beatmap to the beatmaps if you provide a valid beatmap ID.'
            className={"error-message"}
          />
          <Form.Input
            label={"Artist"}
            placeholder='Artist'
            value={formValues.artist}
            onChange={event => setFormValue("artist", event.target.value)}
          />
          <Form.Input
            label={"Title"}
            placeholder='Title'
            value={formValues.title}
            onChange={event => setFormValue("title", event.target.value)}
          />
          <Form.Input
            label={"Mapper"}
            placeholder='Mapper'
            value={formValues.mapper}
            onChange={event => setFormValue("mapper", event.target.value)}
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

export default AddBeatmapModal
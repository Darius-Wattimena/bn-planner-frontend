import React, {useState} from "react";
import {Button, Form, Header, Icon, Modal} from "semantic-ui-react";
import {useMutation} from "react-fetching-library";
import Api from "../../../resources/Api";

const AddBeatmapModal = (props) => {
  const [id, setId] = useState("");
  const [artist, setArtist] = useState("");
  const [title, setTitle] = useState("");
  const [mapper, setMapper] = useState("");

  const { loading, payload, mutate, error } = useMutation(Api.addBeatmap);
  const handleSubmit = async (formValues) => {
    const { error: mutateError } = await mutate(formValues);

    if (mutateError) {
      console.log(mutateError)
    } else {
      props.setOpen(false);
    }
  };

  function verifyData() {
    return handleSubmit({
      beatmapId: id,
      artist,
      title,
      mapper
    })
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
            value={id}
            onChange={event => setId(event.target.value)}
          />
          <Form.Input
            label={"Artist"}
            placeholder='Artist'
            value={artist}
            onChange={event => setArtist(event.target.value)}
          />
          <Form.Input
            label={"Title"}
            placeholder='Title'
            value={title}
            onChange={event => setTitle(event.target.value)}
          />
          <Form.Input
            label={"Mapper"}
            placeholder='Mapper'
            value={mapper}
            onChange={event => setMapper(event.target.value)}
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
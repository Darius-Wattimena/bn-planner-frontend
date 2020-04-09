import React, {useState} from "react";
import {useMutation, useQuery} from "react-fetching-library";
import Api from "../../../resources/Api";
import {Button, Form, Header, Icon, Modal} from "semantic-ui-react";

const EditBeatmapModal = (props) => {
  const {loading, payload, error} = useQuery(Api.getBeatmap(props.id));
  const {saveLoading, mutate, saveError} = useMutation(Api.updateBeatmap);
  const [formValues, setFormValues] = useState({
    osuId: "",
    artist: "",
    title: "",
    mapper: "",
    note: "",
    status: ""
  });

  console.log({props, payload, formValues});
  if (!loading && !error && props.id) {
    if (payload !== "" && (formValues.artist === "" || (formValues.osuId !== "" && formValues.osuId !== payload.osuId))) {
      setFormValues(payload);
    }
  }

  function verifyData() {
    return handleSubmit(formValues)
  }

  const handleSubmit = async (formValues) => {
    const {error: mutateError} = await mutate(formValues);

    if (mutateError) {
      console.log(mutateError)
    } else {
      setFormValues({
        artist: "",
        title: "",
        mapper: "",
        note: "",
        status: ""
      });
      props.query();
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

  return (
    <Modal
      open={props.open}
      onOpen={() => setFormValues({
        artist: "",
        title: "",
        mapper: "",
        note: "",
        status: ""
      })}
      onClose={() => props.setOpen(false)}
    >
      {!loading && !error &&
        <Header content={payload.artist + ' - ' + payload.title}/>
      }
      {!loading && !error &&
        <Modal.Content>
          <Form>
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
            <Form.TextArea
              label={"Notes"}
              placeholder='Notes'
              value={formValues.note}
              onChange={event => setFormValue("note", event.target.value)} />
          </Form>
        </Modal.Content>
      }
      <Modal.Actions>
        <Button color='red' onClick={() => props.setOpen(false)} inverted>
          <Icon name='close' /> Close
        </Button>
        <Button color='green' onClick={verifyData} inverted>
          <Icon name='checkmark' /> Add
        </Button>
      </Modal.Actions>
    </Modal>
  )
};

export default EditBeatmapModal
import React, {useState} from "react";
import {useMutation, useQuery} from "react-fetching-library";
import Api from "../../../resources/Api";
import {Button, Form, Grid, Header, Icon, Image, List, Modal} from "semantic-ui-react";
import {getBeatmapStatusOptions, getNominatorOptions} from "../../../util/BeatmapUtil";

const EditBeatmapModal = (props) => {
  const {loading, payload, error} = useQuery(Api.getBeatmap(props.id));
  const {saveLoading, mutate, saveError} = useMutation(Api.updateBeatmap);
  const [formValues, setFormValues] = useState({
    osuId: "",
    artist: "",
    title: "",
    mapper: "",
    note: "",
    status: "",
    nominators: [0, 0],
    events: []
  });

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
        osuId: "",
        artist: "",
        title: "",
        mapper: "",
        note: "",
        status: "",
        nominators: [0, 0],
        events: []
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
        osuId: "",
        artist: "",
        title: "",
        mapper: "",
        note: "",
        status: "",
        nominators: [0, 0],
        events: []
      })}
      onClose={() => props.setOpen(false)}
    >
      {!loading && !error && payload.osuId &&
        <div className={"modal-header"}>
          <div className={"modal-header-image"}>
            <Image fluid src={"https://assets.ppy.sh/beatmaps/" + payload.osuId + "/covers/cover.jpg"}/>
          </div>
          <Header content={"Edit Beatmap : " + payload.artist + " - " + payload.title}/>
        </div>
      }
      {!loading && !error &&
        <Modal.Content>
          <Grid>
            <Grid.Row>
              <Grid.Column width={10}>
                <Form>
                  <h3>Settings</h3>
                  <Form.Dropdown
                    label={"Status"}
                    selection
                    value={formValues.status}
                    options={getBeatmapStatusOptions()}
                    onChange={(_, data) => setFormValue("status", data.value)}
                  />
                  <Form.Dropdown
                    label={"Nominator #1"}
                    selection
                    search
                    options={getNominatorOptions(props.users)}
                    value={formValues.nominators[0]}
                    onChange={(_, data) => setFormValue("nominators", [data.value, formValues.nominators[1]])}
                  />
                  <Form.Dropdown
                    label={"Nominator #2"}
                    selection
                    search
                    options={getNominatorOptions(props.users)}
                    value={formValues.nominators[1]}
                    onChange={(_, data) => setFormValue("nominators", [formValues.nominators[0], data.value])}
                  />
                  <h3>Metadata</h3>
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
              </Grid.Column>
              <Grid.Column width={6}>
                <h3>Events</h3>
                <List divided relaxed>
                  {formValues.events.map(event => {
                    return (
                      <List.Item>
                        <List.Content>
                          <List.Header>{event.title}</List.Header>
                          <List.Description>{event.description}</List.Description>
                        </List.Content>
                      </List.Item>
                    )
                  })}
                </List>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Modal.Content>
      }
      <Modal.Actions>
        <Button color='red' onClick={() => props.setOpen(false)} inverted>
          <Icon name='close' /> Close
        </Button>
        <Button color='green' onClick={verifyData} inverted>
          <Icon name='checkmark' /> Save
        </Button>
      </Modal.Actions>
    </Modal>
  )
};

export default EditBeatmapModal
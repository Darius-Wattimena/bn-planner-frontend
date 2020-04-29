import React, {useState} from "react";
import {useMutation, useQuery} from "react-fetching-library";
import Api from "../../../resources/Api";
import {Button, Form, Grid, Header, Icon, Image, Modal} from "semantic-ui-react";
import {getBeatmapStatusOptions, getNominatorOptions} from "../../../util/BeatmapUtil";
import BeatmapEventList from "../BeatmapEventList";
import {useCookies} from "react-cookie";

const EditBeatmapModal = ({id, open, query, setOpen, users, setSelectedBeatmap, canEdit}) => {
  const {loading, payload, error} = useQuery(Api.getDetailedBeatmap(id));
  const {mutate} = useMutation(Api.updateBeatmap);
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
  const [showingSameNominatorWarning, setShowingSameNominatorWarning] = useState(false);
  const [cookies] = useCookies(['bnplanner_token']);

  if (!loading && !error && id) {
    if (payload !== "" && (formValues.artist === "" || (formValues.osuId !== "" && formValues.osuId !== payload.osuId))) {
      setFormValues(payload);
      verifyNominatorSelected(payload.nominators);
    }
  }

  function verifyNominatorSelected(nominators) {
    if (nominators[0] !== 0 || nominators[1] !== 0) {
      if (nominators[0] === nominators[1]) {
        setShowingSameNominatorWarning(true)
      } else {
        setShowingSameNominatorWarning(false)
      }
    }
  }

  function verifyData() {
    verifyNominatorSelected(formValues.nominators);
    if (!showingSameNominatorWarning) {
      return handleSubmit(formValues)
    }
  }

  const handleSubmit = async (formValues) => {
    const {error: mutateError} = await mutate(formValues, cookies.bnplanner_token);

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
      setOpen(false);
      query();
      setSelectedBeatmap(0)
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
    <Modal open={open} onClose={() => setOpen(false)}>
      {!loading && !error && payload.osuId &&
        <div className={"modal-header"}>
          <div className={"modal-header-image"}>
            <Image fluid src={"https://assets.ppy.sh/beatmaps/" + payload.osuId + "/covers/cover.jpg"}/>
          </div>
          <Header content={"Editing Beatmap : " + payload.artist + " - " + payload.title}/>
        </div>
      }
      {!loading && !error &&
        <Modal.Content>
          <Grid>
            <Grid.Row>
              <Grid.Column width={8}>
                <Form>
                  <h3>Settings</h3>
                  <Form.Dropdown
                    disabled={!canEdit}
                    label={"Status"}
                    selection
                    value={formValues.status}
                    options={getBeatmapStatusOptions()}
                    onChange={(_, data) => setFormValue("status", data.value)}
                  />
                  <Form.Dropdown
                    disabled={!canEdit}
                    label={"Nominator #1"}
                    selection
                    search
                    options={getNominatorOptions(users)}
                    value={formValues.nominators[0]}
                    onChange={(_, data) => {
                      setFormValue("nominators", [data.value, formValues.nominators[1]]);
                      verifyNominatorSelected([data.value, formValues.nominators[1]]);
                    }}
                    error={showingSameNominatorWarning}
                  />
                  <Form.Dropdown
                    disabled={!canEdit}
                    label={"Nominator #2"}
                    selection
                    search
                    options={getNominatorOptions(users)}
                    value={formValues.nominators[1]}
                    onChange={(_, data) => {
                      setFormValue("nominators", [formValues.nominators[0], data.value]);
                      verifyNominatorSelected([formValues.nominators[0], data.value]);
                    }}
                    error={showingSameNominatorWarning}
                  />
                  <h3>Metadata</h3>
                  <Form.Input
                    disabled={!canEdit}
                    label={"Artist"}
                    placeholder='Artist'
                    value={formValues.artist}
                    onChange={event => setFormValue("artist", event.target.value)}
                  />
                  <Form.Input
                    disabled={!canEdit}
                    label={"Title"}
                    placeholder='Title'
                    value={formValues.title}
                    onChange={event => setFormValue("title", event.target.value)}
                  />
                  <Form.Input
                    disabled={!canEdit}
                    label={"Mapper"}
                    placeholder='Mapper'
                    value={formValues.mapper}
                    onChange={event => setFormValue("mapper", event.target.value)}
                  />
                  <Form.TextArea
                    disabled={!canEdit}
                    label={"Notes"}
                    placeholder='Notes'
                    value={formValues.note}
                    onChange={event => setFormValue("note", event.target.value)} />
                </Form>
              </Grid.Column>
              <Grid.Column width={8}>
                <h3>Events</h3>
                <BeatmapEventList events={formValues.events} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Modal.Content>
      }
      {canEdit === true &&
        <Modal.Actions>
          <Button color='red' onClick={() => setOpen(false)} inverted>
            <Icon name='close' /> Close
          </Button>
          <Button color='green' disabled={showingSameNominatorWarning} onClick={verifyData} inverted>
            <Icon name='checkmark' /> Save
          </Button>
        </Modal.Actions>
      }
      {canEdit === false &&
      <Modal.Actions>
        <Button color='green' onClick={() => setOpen(false)} inverted>
          <Icon name='close' /> Close
        </Button>
      </Modal.Actions>
      }

    </Modal>
  )
};

export default EditBeatmapModal
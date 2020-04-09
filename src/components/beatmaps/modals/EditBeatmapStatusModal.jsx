import React, {useState} from "react";
import {useMutation, useQuery} from "react-fetching-library";
import Api from "../../../resources/Api";
import {Button, Form, Header, Icon, Modal} from "semantic-ui-react";
import {getBeatmapStatusOptions} from "../../../util/BeatmapUtil";

const EditBeatmapStatusModal = (props) => {
  const {loading, payload, error} = useQuery(Api.getBeatmap(props.id));
  const {saveLoading, mutate, saveError} = useMutation(Api.updateBeatmapStatus);
  const [formValues, setFormValues] = useState({
    osuId: "",
    artist: "",
    title: "",
    status: ""
  });

  if (!loading && !error && props.id) {
    if (payload !== "" && (formValues.artist === "" || (formValues.osuId !== "" && formValues.osuId !== payload.osuId))) {
      setFormValues(payload);
    }
  }

  function verifyData() {
    return handleSubmit(formValues)
  }

  const handleSubmit = async (values) => {
    const {error: mutateError} = await mutate(values);

    if (mutateError) {
      console.log(mutateError)
    } else {
      setFormValues({
        osuId: "",
        artist: "",
        title: "",
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
        osuId: "",
        artist: "",
        title: "",
        status: ""
      })}
      onClose={() => props.setOpen(false)}
    >
      {!loading && !error &&
      <Header content={'Changing beatmap status of \'' + payload.artist + ' - ' + payload.title + '\''}/>
      }
      {!loading && !error &&
      <Modal.Content>
        <Form>
          <Form.Dropdown
            label={"Beatmap Status"}
            selection
            value={formValues.status}
            options={getBeatmapStatusOptions()}
            onChange={(event, data) => setFormValue("status", data.value)}
          />
        </Form>
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

export default EditBeatmapStatusModal
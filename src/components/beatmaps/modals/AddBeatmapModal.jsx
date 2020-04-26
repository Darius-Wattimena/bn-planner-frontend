import React, {useState} from "react";
import {Button, Form, Header, Icon, Image, Message, Modal} from "semantic-ui-react";
import {useMutation} from "react-fetching-library";
import Api from "../../../resources/Api";

const AddBeatmapModal = (props) => {
  const [formValues, setFormValues] = useState({
    beatmapUrl: "",
    artist: "",
    title: "",
    mapper: ""
  });
  const [incorrectUrl, setIncorrectUrl] = useState(false);

  const {loading, payload, mutate, error} = useMutation(Api.addBeatmap);
  const handleSubmit = async (formValues) => {
    const {error: mutateError} = await mutate(formValues);

    if (mutateError) {
      console.log(mutateError)
    } else {
      setFormValues({
        beatmapUrl: "",
        artist: "",
        title: "",
        mapper: ""
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

  function verifyData() {
    if (formValues.beatmapUrl.startsWith("https://osu.ppy.sh/beatmapsets/") || formValues.beatmapUrl.startsWith("https://osu.ppy.sh/s/")) {
      let preparedValues = formValues;
      let splitUrl = formValues.beatmapUrl.split("/");
      let setId;

      if (formValues.beatmapUrl.startsWith("https://osu.ppy.sh/beatmapsets/")) {
        if (splitUrl[splitUrl.length - 2] === "beatmapsets") {
          setId = splitUrl[splitUrl.length - 1];
        } else {
          setId = splitUrl[splitUrl.length - 2].split('#')[0];
        }
      } else {
        setId = splitUrl[splitUrl.length - 1];
      }

      if (!isNaN(setId)) {
        preparedValues["beatmapId"] = setId;

        setIncorrectUrl(false);
        return handleSubmit(preparedValues);
      }
    }

    setIncorrectUrl(true);
  }

  return (
    <Modal
      open={props.open}
      onClose={() => props.setOpen(false)}
    >
      <div className={"modal-header"}>
        <Header content='Add New Beatmap' />
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
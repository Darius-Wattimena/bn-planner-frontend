import React, {useState} from "react";
import {Button, Form, Header, Icon, Message, Modal} from "semantic-ui-react";
import {useMutation} from "react-fetching-library";
import Api from "../../../resources/Api";

const AddUserModal = (props) => {
  const [formValues, setFormValues] = useState({
    osuUrl: "",
    osuName: ""
  });
  const [incorrectUrl, setIncorrectUrl] = useState(false);

  const {loading, payload, mutate, error} = useMutation(Api.addUser);
  const handleSubmit = async (formValues) => {
    const {error: mutateError} = await mutate(formValues);

    if (mutateError) {
      console.log(mutateError)
    } else {
      setFormValues({
        osuUrl: "",
        osuName: ""
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
    if (formValues.osuUrl.startsWith("https://osu.ppy.sh/users/") || formValues.osuUrl.startsWith("https://old.ppy.sh/u/")) {
      let preparedValues = formValues;
      let splitUrl = formValues.osuUrl.split("/");
      let userId;

      userId = splitUrl[splitUrl.length - 1];

      if (!isNaN(userId)) {
        preparedValues["osuId"] = userId;

        setIncorrectUrl(false);
        return handleSubmit(preparedValues)
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
        <Header content='Add New User' />
      </div>
      <Modal.Content>
        <Form>
          <Form.Input
            label={"User URL"}
            placeholder={"https://osu.ppy.sh/users/<USER_ID>"}
            value={formValues.osuUrl}
            onChange={event => setFormValue("osuUrl", event.target.value)}
          />
          <Message
            visible={incorrectUrl === true}
            error
            header="The provided user url is not correct"
            content="A user url should either start with: 'https://osu.ppy.sh/users/' or 'https://old.ppy.sh/u/' and then followed by the beatmap set id to be counted as a correct url"
            className={"error-message"}
          />
          <Form.Input
            label={"Name"}
            placeholder='Name'
            value={formValues.osuName}
            onChange={event => setFormValue("osuName", event.target.value)}
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
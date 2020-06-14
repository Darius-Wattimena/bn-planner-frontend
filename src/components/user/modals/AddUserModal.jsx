import React, {useState} from "react";
import {Button, Form, Header, Icon, Message, Modal} from "semantic-ui-react";
import {useMutation} from "react-fetching-library";
import Api from "../../../resources/Api";
import {useCookies} from "react-cookie";

const AddUserModal = ({open, query, setOpen, userId}) => {
  const [formValues, setFormValues] = useState({
    osuUrl: ""
  });
  const [incorrectUrl, setIncorrectUrl] = useState(false);
  const [cookies] = useCookies(['bnplanner_osu_access_token']);

  const {mutate} = useMutation(Api.addUser);
  const handleSubmit = async (formValues) => {
    const {error: mutateError} = await mutate(formValues, cookies.bnplanner_osu_access_token, userId);

    if (mutateError) {
      console.log(mutateError)
    } else {
      setFormValues({
        osuUrl: "",
        osuName: ""
      });
      query();
      setOpen(false);
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
      let splitUrl = formValues.osuUrl.split("/");
      let userId;

      userId = splitUrl[splitUrl.length - 1];

      if (!isNaN(userId)) {
        let preparedValues = {
          "osuId": userId
        }

        setIncorrectUrl(false);
        return handleSubmit(preparedValues)
      }
    }

    setIncorrectUrl(true);
  }

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
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
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color='red' onClick={() => setOpen(false)} inverted>
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
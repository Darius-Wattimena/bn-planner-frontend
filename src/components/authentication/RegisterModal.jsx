import {useMutation} from "react-fetching-library";
import Api from "../../resources/Api";
import React, {useState} from "react";
import {Button, Form, Header, Icon, Message, Modal} from "semantic-ui-react";
import {pushNotification} from "../../util/NotificationUtil";

const RegisterModal = ({open, setOpen}) => {
  const {mutate: registerMutate} = useMutation(Api.register);
  const [registerError, setRegisterError] = useState(false);
  const [notSamePasswordError, setNotSamePasswordError] = useState(false);

  const [registerFormValues, setRegisterFormValues] = useState({
    username: "",
    password: "",
    confirm: ""
  });

  const handleRegisterSubmit = async () => {
    if (registerFormValues.password === registerFormValues.confirm) {
      setNotSamePasswordError(false);
      const {error: mutateError} = await registerMutate(registerFormValues);

      if (mutateError) {
        setRegisterError(true);
      } else {
        setRegisterError(false);
        setRegisterFormValues({
          username: "",
          password: "",
          confirm: ""
        });
        setOpen(false);
        pushNotification("Registered Account", "Contact Greaper so he can bind your account to a planner user.", "info");
      }
    } else {
      setNotSamePasswordError(true);
    }
  };

  function setFormValue(field, value) {
    let newFormValues = registerFormValues;
    newFormValues[field] = value;
    setRegisterFormValues({
      ...newFormValues
    });
  }

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      size={"tiny"}
    >
      <div className={"modal-header"}>
        <Header content={"Register"}/>
      </div>
      <Modal.Content>
        <Form>
          <Message
            info
            visible={registerError !== true}
            header="Do NOT use your osu credential!"
            content="The site has no connection to your osu account, the only connection it has is the bind from your chosen username to a planner user."
            className={"info-message"}
          />
          <Form.Input
            label={"Username"}
            placeholder='Username'
            value={registerFormValues.username}
            onChange={event => setFormValue("username", event.target.value)}
          />
          <Form.Input
            label={"Password"}
            placeholder='Password'
            value={registerFormValues.password}
            onChange={event => setFormValue("password", event.target.value)}
            type={"password"}
          />
          <Message
            visible={notSamePasswordError === true}
            error
            header="The provided passwords are not the same"
            content="Your password and confirm password are not the same!"
            className={"error-message"}
          />
          <Form.Input
            label={"Confirm Password"}
            placeholder='Confirm Password'
            value={registerFormValues.confirm}
            onChange={event => setFormValue("confirm", event.target.value)}
            type={"password"}
          />
          <Message
            visible={registerError === true}
            error
            header="Could not register account"
            content="An error occurred while trying to register an account. Most likely your username is already taken! If this error keeps occurring contact Greaper."
            className={"error-message"}
          />
          <Button fluid inverted color={"green"} onClick={() => handleRegisterSubmit()}>Register</Button>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color='red' onClick={() => setOpen(false)} inverted>
          <Icon name='close' /> Close
        </Button>
      </Modal.Actions>
    </Modal>
  )

};

export default RegisterModal
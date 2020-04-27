import React, {useState} from "react";
import {Button, Form, Header, Icon, Message, Modal} from "semantic-ui-react";
import {useMutation} from "react-fetching-library";
import Api from "../../resources/Api";
import {useCookies} from "react-cookie";

const LoginModal = ({open, setOpen, setCanEdit, setIsAdmin}) => {
  const [cookies, setCookie] = useCookies(['bnplanner_token']);
  const {mutate: loginMutate} = useMutation(Api.login);

  const [loginError, setLoginError] = useState(false);
  const [loginErrorMessage, setLoginErrorMessage] = useState("");

  const [loginFormValues, setLoginFormValues] = useState({
    username: "",
    password: ""
  });

  const handleLoginSubmit = async () => {
    const {error: mutateError, payload} = await loginMutate(loginFormValues);

    if (mutateError) {
      setLoginError(true);
      setLoginErrorMessage(payload.message)
    } else {
      setLoginError(false);
      setLoginFormValues({
        username: "",
        password: ""
      });
      setCookie('bnplanner_token', payload.token);
      setOpen(false);
    }
  };

  function setFormValue(field, value, formValues, setFormValues) {
    let newFormValues = formValues;
    newFormValues[field] = value;
    setFormValues({
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
        <Header content={"Login"}/>
      </div>
      <Modal.Content>
        <Form>
          <Form.Input
            label={"Username"}
            placeholder='Username'
            value={loginFormValues.username}
            onChange={event => setFormValue("username", event.target.value, loginFormValues, setLoginFormValues)}
          />
          <Form.Input
            label={"Password"}
            placeholder='Password'
            value={loginFormValues.password}
            onChange={event => setFormValue("password", event.target.value, loginFormValues, setLoginFormValues)}
            type={"password"}
          />
          <Message
            visible={loginError === true}
            error
            header="Could not login"
            content={loginErrorMessage}
            className={"error-message"}
          />
          <Button fluid inverted color={"green"} onClick={() => handleLoginSubmit()}>Login</Button>
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

export default LoginModal
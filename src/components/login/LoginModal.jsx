import React, {useState} from "react";
import {Button, Divider, Form, Grid, Header, Icon, Modal} from "semantic-ui-react";
import {useMutation} from "react-fetching-library";
import Api from "../../resources/Api";
import {useCookies} from "react-cookie";

const LoginModal = ({open, setOpen}) => {
  const [cookies, setCookie] = useCookies(['bnplanner_token']);
  const {mutate: loginMutate} = useMutation(Api.login);
  const {mutate: registerMutate} = useMutation(Api.register);

  const [loginFormValues, setLoginFormValues] = useState({
    username: "",
    password: ""
  });

  const [registerFormValues, setRegisterFormValues] = useState({
    username: "",
    password: ""
  });

  const handleSubmit = async (formValues, submitMutate, setFormValues) => {
    const {error: mutateError, errorObject, payload} = await submitMutate(formValues);

    if (mutateError) {
      console.log(errorObject)
    } else {
      console.log(payload);
      setFormValues({
        username: "",
        password: ""
      });
      setCookie('bnplanner_token', payload.token);
      setOpen(false);
    }
  };

  const textCentered = {
    textAlign: "center"
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
    >
      <div className={"modal-header"}>
        <Header content={"Login and Register"}/>
      </div>
      <Modal.Content>
        <Grid columns={2}>
          <Divider vertical>Or</Divider>
          <Grid.Row style={textCentered}>
            <Grid.Column width={8} className={"login-form"}>
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
                <Button fluid inverted color={"green"} onClick={() => handleSubmit(loginFormValues, loginMutate, setLoginFormValues)}>Login</Button>
              </Form>
            </Grid.Column>
            <Grid.Column width={8} className={"login-form"}>
              <Form>
                <Form.Input
                  label={"Username"}
                  placeholder='Username'
                  value={registerFormValues.username}
                  onChange={event => setFormValue("username", event.target.value, registerFormValues, setRegisterFormValues)}
                />
                <Form.Input
                  label={"Password"}
                  placeholder='Password'
                  value={registerFormValues.password}
                  onChange={event => setFormValue("password", event.target.value, registerFormValues, setRegisterFormValues)}
                  type={"password"}
                />
                <Button fluid inverted color={"green"} onClick={() => handleSubmit(registerFormValues, registerMutate, setRegisterFormValues)}>Register</Button>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
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
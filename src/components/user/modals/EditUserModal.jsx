import React, {useState} from "react";
import {useMutation, useQuery} from "react-fetching-library";
import Api from "../../../resources/Api";
import {Button, Form, Grid, Header, Icon, Modal} from "semantic-ui-react";
import BeatmapEventList from "../../beatmaps/BeatmapEventList";
import {getUserRoles} from "../../../util/UserUtil";
import {useCookies} from "react-cookie";

const EditUserModal = ({id, open, query, setOpen, setSelectedUser, isAdmin, userId}) => {
  const {loading, payload, error} = useQuery(Api.getDetailedUser(id));
  const {mutate} = useMutation(Api.updateUser);
  const [formValues, setFormValues] = useState({
    osuId: "",
    osuName: "",
    hasEditPermissions: false,
    hasAdminPermissions: false,
    authId: "",
    role: "",
    events: []
  });
  const [cookies] = useCookies(['bnplanner_osu_access_token']);

  if (!loading && !error && id) {
    if (payload !== "" && (formValues.osuName === "" || (formValues.osuId !== "" && formValues.osuId !== payload.osuId))) {
      setFormValues(payload);
    }
  }

  function verifyData() {
    return handleSubmit(formValues)
  }

  const handleSubmit = async (formValues) => {
    const {error: mutateError} = await mutate(formValues, cookies.bnplanner_osu_access_token, userId);

    if (mutateError) {
      console.log(mutateError)
    } else {
      setFormValues({
        osuId: "",
        osuName: "",
        hasEditPermissions: false,
        hasAdminPermissions: false,
        authId: "",
        role: "",
        events: []
      });
      setOpen(false);
      query();
      setSelectedUser(0)
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
          <Header content={"Editing User : " + payload.osuName}/>
        </div>
      }
      {!loading && !error &&
        <Modal.Content>
          <Grid>
            <Grid.Row>
              <Grid.Column width={8}>
                <Form>
                  <h3>Information</h3>
                  <Form.Input
                    disabled={!isAdmin}
                    label={"Name"}
                    placeholder='Name'
                    value={formValues.osuName}
                    onChange={event => setFormValue("osuName", event.target.value)}
                  />
                  <Form.Dropdown
                    disabled={!isAdmin}
                    label={"Role"}
                    selection
                    value={formValues.role}
                    options={getUserRoles()}
                    onChange={(_, data) => setFormValue("role", data.value)}
                  />
                  <Form.Checkbox
                    disabled={!isAdmin}
                    toggle
                    label={"Is Admin"}
                    checked={formValues.hasAdminPermissions}
                    onChange={() => setFormValue("hasAdminPermissions", !formValues.hasAdminPermissions)}
                  />
                  <Form.Checkbox
                    disabled={!isAdmin}
                    toggle
                    label={"Can Edit"}
                    checked={formValues.hasEditPermissions}
                    onChange={() => setFormValue("hasEditPermissions", !formValues.hasEditPermissions)}
                  />
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
      <Modal.Actions>
        <Button color='red' onClick={() => setOpen(false)} inverted>
          <Icon name='close' /> Close
        </Button>
        <Button color='green' onClick={verifyData} inverted>
          <Icon name='checkmark' /> Save
        </Button>
      </Modal.Actions>
    </Modal>
  )
};

export default EditUserModal
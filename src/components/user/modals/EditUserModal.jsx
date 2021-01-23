import React, {useState} from "react"
import {useMutation, useQuery} from "react-fetching-library"
import Api from "../../../resources/Api"
import {Button, Form, Grid, Header, Icon, Image, Label, Modal} from "semantic-ui-react"
import {getReadableRole, getUserRoles} from "../../../util/UserUtil"
import {useCookies} from "react-cookie"
import { useHistory } from "react-router-dom"
import BeatmapEventList from "../../beatmaps/BeatmapEventList"
import Nav from "../../nav/Nav";

const EditUserModal = ({id, open, query, setOpen, setSelectedUser, isAdmin, userId, users}) => {
  const {loading, payload, error} = useQuery(Api.getDetailedUser(id))
  const {mutate} = useMutation(Api.updateUser)
  const [showEvents, setShowEvents] = useState(false)
  const [formValues, setFormValues] = useState({
    osuId: "",
    osuName: "",
    hasEditPermissions: false,
    hasAdminPermissions: false,
    authId: "",
    role: "",
    events: []
  })
  const [cookies] = useCookies(['bnplanner_osu_access_token'])
  let history = useHistory();

  if (!loading && !error && id) {
    if (payload !== "" && (formValues.osuName === "" || (formValues.osuId !== "" && formValues.osuId !== payload.osuId))) {
      setFormValues(payload)
    }
  }

  function verifyData() {
    return handleSubmit(formValues)
  }

  const handleSubmit = async (formValues) => {
    const {error: mutateError} = await mutate(formValues, cookies.bnplanner_osu_access_token, userId)

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
      })
      setOpen(false)
      query()
      setSelectedUser(0)
    }
  }

  function setFormValue(field, value) {
    let newFormValues = formValues
    newFormValues[field] = value
    setFormValues({
      ...newFormValues
    })
  }

  function closeModal() {
    setShowEvents(false)
    setOpen(false)
  }

  return (
    <Modal open={open} onClose={() => closeModal()} className={"modal-user"}>
      {!loading && !error && payload.osuId &&
        <div className={"modal-header"}>
          <Header content={"Editing User"}/>
        </div>
      }
      {!loading && !error &&
      <Modal.Content>
        <Form>
          <Grid className={"content-all"}>
            <Grid.Row className={"content-header"}>
              <Grid.Column computer={10} tablet={16} mobile={16}>
                <h3>{formValues.osuName} <a href={"https://osu.ppy.sh/users/" + formValues.osuId}><Icon name={"linkify"} /></a></h3>
              </Grid.Column>
              <Grid.Column computer={6} tablet={16} mobile={16}>
                <h3>Settings</h3>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row className={"content"}>
              <Grid.Column computer={10} tablet={16} mobile={16}>
                <UserProfile formValues={formValues} />
              </Grid.Column>
              <Grid.Column computer={6} tablet={16} mobile={16}>
                <Grid verticalAlign={"middle"}>
                  <Grid.Row className={"settings-row"}>
                    <FieldItemDropdown
                      label={"Role"}
                      value={formValues.role}
                      onChange={(data) => {
                        if (data.value === "NAT") {
                          setFormValue("hasAdminPermissions", true)
                          setFormValue("hasEditPermissions", true)
                        } else if (data.value === "PBN" || data.value === "BN") {
                          setFormValue("hasAdminPermissions", false)
                          setFormValue("hasEditPermissions", true)
                        } else {
                          setFormValue("hasAdminPermissions", false)
                          setFormValue("hasEditPermissions", false)
                        }

                        setFormValue("role", data.value)
                      }}
                      isAdmin={isAdmin} />
                    <FieldItemCheckbox
                      label={"Is Admin"}
                      value={formValues.hasAdminPermissions}
                      setFormValue={setFormValue}
                      formValueField={"hasAdminPermissions"}
                      isAdmin={isAdmin} />
                    <FieldItemCheckbox
                      label={"Can Edit"}
                      value={formValues.hasEditPermissions}
                      setFormValue={setFormValue}
                      formValueField={"hasEditPermissions"}
                      isAdmin={isAdmin} />
                  </Grid.Row>
                </Grid>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column computer={4} tablet={16} mobile={16}>
                <Button
                  fluid
                  disabled={true}
                  color='grey'
                  onClick={() => {setShowEvents(!showEvents)}}>
                  Show Statistics
                </Button>
              </Grid.Column>
              <Grid.Column computer={3} tablet={16} mobile={16}>
                <Button
                  fluid
                  className={"pending-color"}
                  onClick={() => {
                    history.push({pathname: '/beatmaps', state: { nominator: formValues.osuId }})
                  }}>
                  Pending Icons
                </Button>
              </Grid.Column>
              <Grid.Column computer={3} tablet={16} mobile={16}>
                <Button
                  fluid
                  className={"ranked-color"}
                  onClick={() => {
                    history.push({pathname: '/ranked', state: { nominator: formValues.osuId }})
                  }}>
                  Ranked Icons
                </Button>
              </Grid.Column>
              <Grid.Column computer={3} tablet={16} mobile={16}>
                <Button
                  fluid
                  className={"graved-color"}
                  onClick={() => {
                    history.push({pathname: '/graved', state: { nominator: formValues.osuId }})
                  }}>
                  Graved Icons
                </Button>
              </Grid.Column>
              <Grid.Column computer={3} tablet={16} mobile={16}>
                <Button
                  fluid
                  disabled={(formValues.events.length === 0 || !isAdmin)}
                  color='grey'
                  onClick={() => {setShowEvents(!showEvents)}}>
                  {(formValues.events.length === 0) ? "No" : (showEvents) ? "Hide" : "Show" } Events
                </Button>
              </Grid.Column>
            </Grid.Row>

            {showEvents &&
              <Grid.Row>
                <Grid.Column computer={7} only={"computer"} />
                <Grid.Column computer={9} tablet={16} mobile={16}>
                  <h3>Events</h3>
                  <BeatmapEventList events={formValues.events} users={users}/>
                </Grid.Column>
              </Grid.Row>
            }
            {/*<Form.Input
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
                  onChange={(_, data) => {
                    if (data.value === "NAT") {
                      setFormValue("hasAdminPermissions", true)
                      setFormValue("hasEditPermissions", true)
                    } else if (data.value === "PBN" || data.value === "BN") {
                      setFormValue("hasAdminPermissions", false)
                      setFormValue("hasEditPermissions", true)
                    } else {
                      setFormValue("hasAdminPermissions", false)
                      setFormValue("hasEditPermissions", false)
                    }

                    setFormValue("role", data.value)
                  }}
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
            <Grid.Column computer={8} mobile={16}>
              <h3>Events</h3>
              <BeatmapEventList events={formValues.events} users={users}/>
            </Grid.Column>
          </Grid.Row>
        </Grid>*/}
          </Grid>
        </Form>
      </Modal.Content>
      }
      <Modal.Actions>
        <Button color='red' onClick={() => setOpen(false)}>
          <Icon name='close'/> Close
        </Button>
        <Button color='green' onClick={verifyData}>
          <Icon name='checkmark'/> Save
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

const UserProfile = ({formValues}) => {
  let avatarUri
  let userRole

  if (formValues.osuId === 0) {
    avatarUri = "https://osu.ppy.sh/images/layout/avatar-guest@2x.png"
    userRole = null
  } else {
    avatarUri = formValues.profilePictureUri
    userRole = getReadableRole(formValues.role)
  }

  return (
    <div>
      <Grid>
        <Grid.Row className={"profile-row"}>
          <Grid.Column computer={4} tablet={6} mobile={6} className={"avatar"}>
            <Image fluid src={avatarUri} label={
              (userRole !== null) ? (
                <Label ribbon horizontal className={userRole.className}>
                  {userRole.name}
                </Label>
              ) : null
            } />
          </Grid.Column>
          <Grid.Column computer={12} tablet={10} mobile={16} className={"details"}>
            <Grid verticalAlign={"middle"}>
              <Grid.Row>
                <FieldItem label={"Osu ID"} value={formValues.osuId} />
                <FieldItem label={"Aliases"} value={formValues.aliases} />
                <FieldItem label={"Contest Access"} value={formValues.hasHiddenPermission} />
              </Grid.Row>
            </Grid>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  )
}

const FieldItem = ({value, label}) => {
  let readableValue

  if (typeof(value) === "boolean") {
    if (value === true) {
      readableValue = "Yes"
    } else {
      readableValue = "No"
    }
  } else if (Array.isArray(value)) {
    if (value.length === 0) {
      readableValue = "-"
    } else {
      readableValue = value.join(", ")
    }
  } else {
    readableValue = value
  }

  return (
    <>
      <Grid.Column computer={6} mobile={6} className={"info-label"}><h4>{label}</h4></Grid.Column>
      <Grid.Column computer={10} mobile={10}><div className={"info-value"}>{readableValue}</div></Grid.Column>
    </>
  )
}

const FieldItemCheckbox = ({value, label, formValueField, setFormValue, isAdmin}) => {
  return (
    <>
      <Grid.Column computer={6} mobile={6} className={"info-label"}><h4>{label}</h4></Grid.Column>
      <Grid.Column computer={10} mobile={10} className={"info-value"}>
        <Form.Checkbox
          disabled={!isAdmin}
          checked={value}
          onChange={() => setFormValue(formValueField, !value)}
        />
      </Grid.Column>
    </>
  )
}

const FieldItemDropdown = ({value, label, onChange, isAdmin}) => {
  return (
    <>
      <Grid.Column computer={6} mobile={6} className={"info-label"}><h4>{label}</h4></Grid.Column>
      <Grid.Column computer={10} mobile={10} className={"info-value"}>
        <Form.Dropdown
          disabled={!isAdmin}
          inline
          value={value}
          options={getUserRoles()}
          onChange={(_, data) => onChange(data)}
        />
      </Grid.Column>
    </>
  )
}

export default EditUserModal
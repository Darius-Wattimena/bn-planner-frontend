import {useMutation, useQuery} from "react-fetching-library";
import Api from "../../../resources/Api";
import React, {useState} from "react";
import {useCookies} from "react-cookie";
import {useHistory} from "react-router-dom";
import {BEATMAP_STATUS} from "../../../Constants";
import {getNominatorOptions, getReadableStatus} from "../../../util/BeatmapUtil";
import {Button, Checkbox, Dropdown, Form, Grid, Header, Icon, Image, Label, Modal} from "semantic-ui-react";
import DeleteBeatmapModal from "./DeleteBeatmapModal";
import EditStatusBeatmapModal from "./EditStatusBeatmapModal";
import {unix} from "dayjs";
import {getReadableRole, getUserWithId} from "../../../util/UserUtil";
import RefreshMetadataButton from "../RefreshMetadataButton";
import BeatmapEventList from "../BeatmapEventList";

const EditBeatmapV2Modal = ({id, open, query, setOpen, users, setSelectedBeatmap, canEdit, userId, location}) => {
  const {loading, payload, error, reset, query: beatmapQuery} = useQuery(Api.getDetailedBeatmap(id))
  const {mutate} = useMutation(Api.updateBeatmap)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [editStatusModalOpen, setEditStatusModalOpen] = useState(false)
  const [potentialNewStatus, setPotentialNewStatus] = useState(0)
  const [editNote, setEditNote] = useState(false)
  const [showEvents, setShowEvents] = useState(false)
  const [newStatus, setNewStatus] = useState(0)
  const [formValues, setFormValues] = useState({
    osuId: "",
    artist: null,
    title: "",
    mapper: "",
    note: "",
    nominators: [0, 0],
    plannerEvents: [],
    osuEvents: [],
    nominatedByBNOne: null,
    nominatedByBNTwo: null,
    unfinished: null
  })
  const [showingArtist, setShowingArtist] = useState("")
  const [showSameNominatorWarning, setShowSameNominatorWarning] = useState(false)
  const [cookies] = useCookies(['bnplanner_osu_access_token'])
  const history = useHistory()

  if (!loading && !error && id) {
    if (payload && payload !== "" && (formValues.artist === null || (formValues.osuId !== "" && formValues.osuId !== payload.osuId))) {
      setFormValues(payload)
      setPotentialNewStatus(payload.status)
      setShowingArtist(payload.artist)
      verifyNominatorSelected(payload.nominators)
    } else if (payload === undefined) {
      beatmapQuery().then(() => checkIfNewStatusIsPossible())
    }
  }

  function verifyNominatorSelected(nominators) {
    if (nominators[0] !== 0 || nominators[1] !== 0) {
      if (nominators[0] === nominators[1]) {
        setShowSameNominatorWarning(true)
      } else {
        setShowSameNominatorWarning(false)
      }
    } else if (nominators[0] !== nominators[1]) {
      if (nominators[0] === 0) {
        setFormValue("nominatedByBNOne", false)
      } else if (nominators[1] === 0) {
        setFormValue("nominatedByBNTwo", false)
      }

    }
  }

  function verifyData() {
    verifyNominatorSelected(formValues.nominators)
    if (!showSameNominatorWarning) {
      return handleSubmit(formValues)
    }
  }

  const handleSubmit = async (formValues) => {
    const {error: mutateError} = await mutate(formValues, cookies.bnplanner_osu_access_token, userId)

    if (mutateError) {
      console.log(mutateError)
    } else {
      onModalReset()
    }
  }

  function setFormValue(field, value) {
    let newFormValues = formValues
    newFormValues[field] = value
    setFormValues({
      ...newFormValues
    })
  }

  function checkIfNewStatusIsPossible() {
    if (payload === undefined || (formValues.nominatedByBNOne == null && formValues.nominatedByBNTwo == null)) {
      setPotentialNewStatus(0)
    } else if (formValues.nominatedByBNOne && formValues.nominatedByBNTwo) {
      if (payload.status === BEATMAP_STATUS.Ranked.id) {
        setPotentialNewStatus(BEATMAP_STATUS.Ranked.id)
      } else {
        setPotentialNewStatus(BEATMAP_STATUS.Qualified.id)
      }
    } else if (formValues.nominatedByBNOne || formValues.nominatedByBNTwo) {
      setPotentialNewStatus(BEATMAP_STATUS.Bubbled.id)
    } else if (formValues.status !== BEATMAP_STATUS.Popped.id && formValues.status !== BEATMAP_STATUS.Disqualified.id) {
      if (formValues.unfinished) {
        setPotentialNewStatus(BEATMAP_STATUS.Unfinished.id)
      } else {
        setPotentialNewStatus(BEATMAP_STATUS.Pending.id)
      }
    } else {
      setPotentialNewStatus(payload.status)
    }
  }

  function onModalReset() {
    history.push({
      pathname: '/' + location
    })
    setPotentialNewStatus(0)
    setFormValues({
      osuId: "",
      artist: null,
      title: "",
      mapper: "",
      note: "",
      nominators: [0, 0],
      events: [],
      nominatedByBNOne: null,
      nominatedByBNTwo: null
    })
    setOpen(false)
    reset()
    query()
    setSelectedBeatmap(0)
  }

  let readablePotentialStatus = getReadableStatus(potentialNewStatus)
  let readableCurrentStatus = getReadableStatus(formValues.status)

  return (
    <div>
      <Modal open={open} onClose={() => onModalReset()} className={"modal-beatmap"}>
        {!loading && !error && payload &&
          <>
            <div className={"modal-header beatmap-edit-header"} style={{
              backgroundImage: "linear-gradient(to top, rgb(38 38 50), transparent, rgba(0,0,0,.8)), url(https://assets.ppy.sh/beatmaps/" + payload.osuId + "/covers/cover.jpg)"
            }}>
              <div className={"modal-header-image"}/>
              <Header content={showingArtist + " - " + payload.title}/>
            </div>

            <Modal.Content>
              <Form>
                <Grid className={"modal-beatmap-content-all"}>
                  <Grid.Row className={"modal-beatmap-buttons"}>
                    <Grid.Column computer={4} tablet={4} mobile={16}>
                      <Button
                        fluid
                        disabled={!canEdit || (payload.status === BEATMAP_STATUS.Ranked.id || payload.nominators[0] === 0 || payload.nominators[1] === 0)}
                        color='green'
                        onClick={() => {
                          setNewStatus(BEATMAP_STATUS.Ranked.id)
                          setEditStatusModalOpen(true)
                        }}>
                        <Icon name='heart'/> Rank
                      </Button>
                    </Grid.Column>
                    <Grid.Column computer={3} tablet={3} mobile={8}>
                      <Button
                        fluid
                        disabled={!canEdit || (payload.status === BEATMAP_STATUS.Popped.id)}
                        color='orange'
                        onClick={() => {
                          setNewStatus(BEATMAP_STATUS.Popped.id)
                          setEditStatusModalOpen(true)
                        }}>
                        <Icon name='warning'/> Pop
                      </Button>
                    </Grid.Column>
                    <Grid.Column computer={3} tablet={3} mobile={8}>
                      <Button
                        fluid
                        disabled={!canEdit || (payload.status === BEATMAP_STATUS.Disqualified.id)}
                        color='red'
                        onClick={() => {
                          setNewStatus(BEATMAP_STATUS.Disqualified.id)
                          setEditStatusModalOpen(true)
                        }}>
                        <Icon name='close'/> Disqualify
                      </Button>
                    </Grid.Column>
                    <Grid.Column computer={3} tablet={3} mobile={8}>
                      {payload.status !== BEATMAP_STATUS.Graved.id &&
                      <Button fluid disabled={!canEdit} color='grey' onClick={() => {
                        setNewStatus(BEATMAP_STATUS.Graved.id)
                        setEditStatusModalOpen(true)
                      }}>
                        <Icon name='archive'/> Grave
                      </Button>
                      }
                      {payload.status === BEATMAP_STATUS.Graved.id &&
                      <Button fluid disabled={!canEdit} color='grey' onClick={() => {
                        setNewStatus(BEATMAP_STATUS.Pending.id)
                        setEditStatusModalOpen(true)
                      }}>
                        <Icon name='archive'/> Un-Grave
                      </Button>
                      }
                    </Grid.Column>
                    <Grid.Column computer={3} tablet={3} mobile={8}>
                      <Button fluid disabled={!canEdit} color='red' onClick={() => setDeleteModalOpen(true)}>
                        <Icon name='trash'/> Delete
                      </Button>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row className={"modal-beatmap-content-header"}>
                    <Grid.Column computer={7} tablet={16} mobile={16}>
                      <h3>Settings</h3>
                    </Grid.Column>
                    <Grid.Column computer={9} tablet={16} mobile={16}>
                      <h3>Metadata</h3>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row className={"modal-beatmap-content"}>
                    <Grid.Column computer={7} tablet={16} mobile={16}>
                      <NominatorField
                        isFirst
                        unfinished={formValues.unfinished}
                        canEdit={canEdit}
                        nominatorId={formValues.nominators[0]}
                        hasNominated={formValues.nominatedByBNOne}
                        users={users}
                        onDropdownChange={(_, data) => {
                          verifyNominatorSelected([data.value, formValues.nominators[1]])
                          setFormValue("nominators", [data.value, formValues.nominators[1]])
                          if (data.value === 0) {
                            setFormValue("nominatedByBNOne", false)
                            checkIfNewStatusIsPossible()
                          }
                        }}
                        onCheckboxChange={() => {
                          setFormValue("nominatedByBNOne", !formValues.nominatedByBNOne)
                          checkIfNewStatusIsPossible()
                        }}
                        error={showSameNominatorWarning} />
                    </Grid.Column>
                    <Grid.Column computer={9} tablet={16} mobile={16} className={"metadata-row"}>
                      <div>
                        <Grid verticalAlign={"middle"}>
                          <Grid.Row>
                            <MetadataFieldItem value={formValues.artist} label={"Artist"} />
                            <MetadataFieldItem value={formValues.title} label={"Title"} />
                            <MetadataFieldItem value={formValues.mapper} label={"Mapper"} />
                            <MetadataFieldItem value={unix(formValues.dateUpdated).format("DD MMMM YYYY HH:mm")} label={"Last Updated"} />
                          </Grid.Row>
                        </Grid>
                      </div>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row className={"modal-beatmap-content"}>
                    <Grid.Column computer={7} tablet={16} mobile={16}>
                      <NominatorField
                        unfinished={formValues.unfinished}
                        canEdit={canEdit}
                        nominatorId={formValues.nominators[1]}
                        hasNominated={formValues.nominatedByBNTwo}
                        users={users}
                        onDropdownChange={(_, data) => {
                          verifyNominatorSelected([formValues.nominators[0], data.value])
                          setFormValue("nominators", [formValues.nominators[0], data.value])
                          if (data.value === 0) {
                            setFormValue("nominatedByBNTwo", false)
                            checkIfNewStatusIsPossible()
                          }
                        }}
                        onCheckboxChange={() => {
                          setFormValue("nominatedByBNTwo", !formValues.nominatedByBNTwo)
                          checkIfNewStatusIsPossible()
                        }}
                        error={showSameNominatorWarning} />
                    </Grid.Column>
                    <Grid.Column computer={9} tablet={16} mobile={16}>
                      <h3>Status</h3>
                      <Grid verticalAlign={"middle"}>
                        <Grid.Row>
                          <MetadataFieldItem value={
                            <Checkbox
                              checked={formValues.unfinished}
                              onChange={() => {
                                if (!formValues.unfinished) {
                                  setFormValue("nominatedByBNOne", false)
                                  setFormValue("nominatedByBNTwo", false)
                                }

                                setFormValue("unfinished", !formValues.unfinished)
                                checkIfNewStatusIsPossible()

                              }}
                            />
                          } label={"Unfinished"} />
                          <MetadataFieldItem value={
                            <Label horizontal className={readableCurrentStatus.className}>
                              {readableCurrentStatus.name}
                            </Label>
                          } label={"Current"} />
                          {potentialNewStatus !== formValues.status &&
                            <MetadataFieldItem value={
                              <Label horizontal className={readablePotentialStatus.className}>
                                {readablePotentialStatus.name}
                              </Label>
                            } label={"New"} />
                          }
                        </Grid.Row>
                      </Grid>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column computer={7} only={"computer"} />
                    <Grid.Column computer={3} tablet={16} mobile={16}>
                        <RefreshMetadataButton canEdit={canEdit} beatmap={payload} userId={userId} onModalReset={onModalReset} />
                      </Grid.Column>
                    <Grid.Column computer={3} tablet={16} mobile={16}>
                        <Button fluid disabled={!canEdit} color='grey' onClick={() => {setEditNote(!editNote)}}>
                          {(editNote) ? "Hide" : "Edit" } Note
                        </Button>
                      </Grid.Column>
                    <Grid.Column computer={3} tablet={16} mobile={16}>
                      <Button fluid disabled={!canEdit} color='grey' onClick={() => {setShowEvents(!showEvents)}}>
                        {(showEvents) ? "Hide" : "Show" } Events
                      </Button>
                      </Grid.Column>
                  </Grid.Row>
                  {editNote === true &&
                    <Grid.Row>
                      <Grid.Column computer={7} only={"computer"} />
                      <Grid.Column computer={9} tablet={16} mobile={16}>
                        <h3>Note</h3>
                        <Form.TextArea
                          width={16}
                          disabled={!canEdit}
                          style={{minHeight: 145, maxHeight: 145}}
                          placeholder='Notes'
                          value={formValues.note}
                          onChange={event => setFormValue("note", event.target.value)}/>
                      </Grid.Column>
                    </Grid.Row>
                  }
                  {showEvents &&
                    <Grid.Row>
                      <Grid.Column computer={7} tablet={16} mobile={16}>
                        <h3>Planner Events</h3>
                        <BeatmapEventList events={formValues.plannerEvents} users={users}/>
                      </Grid.Column>
                      <Grid.Column computer={9} tablet={16} mobile={16}>
                        <h3>Status Events</h3>
                        <BeatmapEventList events={formValues.osuEvents} users={users}/>
                      </Grid.Column>
                    </Grid.Row>
                  }
                </Grid>
              </Form>
            </Modal.Content>

            {canEdit === true &&
              <>
                <Modal.Actions>
                  <Button color='red' onClick={() => onModalReset()}>
                    <Icon name='close'/> Close
                  </Button>
                  <Button color='green' disabled={showSameNominatorWarning} onClick={verifyData}>
                    <Icon name='checkmark'/> Save
                  </Button>
                </Modal.Actions>
                <DeleteBeatmapModal
                  query={query}
                  open={deleteModalOpen}
                  setOpen={setDeleteModalOpen}
                  beatmap={payload}
                  setOpenEditModal={setOpen}
                  userId={userId}
                />
                <EditStatusBeatmapModal
                  query={query}
                  open={editStatusModalOpen}
                  setOpen={setEditStatusModalOpen}
                  beatmap={payload}
                  setOpenEditModal={setOpen}
                  userId={userId}
                  status={newStatus}
                  onReset={onModalReset}
                />
              </>
            }
            {canEdit === false &&
            <Modal.Actions>
              <Button color='green' onClick={() => onModalReset()}>
                <Icon name='close'/> Close
              </Button>
            </Modal.Actions>
            }
          </>
        }
      </Modal>
    </div>
  )
}

const NominatorField = ({isFirst, unfinished, canEdit, nominatorId, hasNominated, users, onDropdownChange, onCheckboxChange, error}) => {
  let avatarUri
  let userDetails
  let userRole

  if (nominatorId === 0) {
    avatarUri = "https://osu.ppy.sh/images/layout/avatar-guest@2x.png"
    userDetails = null
    userRole = null
  } else {
    userDetails = getUserWithId(users, nominatorId)
    avatarUri = userDetails.profilePictureUri
    userRole = getReadableRole(userDetails.role)
  }

  return (
    <div>
      <Grid>
        <Grid.Row className={"nominator-row"}>
          <Grid.Column computer={5} tablet={4} mobile={6} className={"nominator-avatar"}>
            <Image fluid src={avatarUri} className={(hasNominated ? "nominated" : "")} label={
              (userRole !== null) ? (
                <Label ribbon horizontal className={userRole.className}>
                  {userRole.name}
                </Label>
              ) : null
            } />
          </Grid.Column>
          <Grid.Column computer={11} tablet={12} mobile={10} className={"nominator-details"}>
            <Grid>
              <Grid.Row>
                <Grid.Column computer={16} tablet={16} mobile={16}>
                  <h4>{(isFirst) ? "Nominator #1" : "Nominator #2"}</h4>
                </Grid.Column>
                <Grid.Column computer={16} tablet={16} mobile={16}>
                    <Form.Dropdown
                      disabled={!canEdit}
                      selection
                      search
                      options={getNominatorOptions(users)}
                      value={nominatorId}
                      onChange={onDropdownChange}
                      error={error}
                    />
                </Grid.Column>
                <Grid.Column computer={16} tablet={16} mobile={16}>
                  <Form.Checkbox
                    label={"Nominated"}
                    disabled={!canEdit || unfinished || nominatorId === 0}
                    checked={hasNominated}
                    onChange={onCheckboxChange}
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  )
}

const MetadataFieldItem = ({value, label}) => {
  return (
    <>
      <Grid.Column computer={5} mobile={5} className={"metadata-label"}><h4>{label}</h4></Grid.Column>
      <Grid.Column computer={11} mobile={11}><div className={"metadata-value"}>{value}</div></Grid.Column>
    </>
  )
}

export default EditBeatmapV2Modal
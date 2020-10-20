import React, {useState} from "react"
import {useMutation, useQuery} from "react-fetching-library"
import Api from "../../../resources/Api"
import {Button, Form, Grid, Header, Icon, Label, Modal} from "semantic-ui-react"
import {getNominatorOptions, getReadableStatus} from "../../../util/BeatmapUtil"
import BeatmapEventList from "../BeatmapEventList"
import {useCookies} from "react-cookie"
import DeleteBeatmapModal from "./DeleteBeatmapModal"
import EditStatusBeatmapModal from "./EditStatusBeatmapModal"
import {BEATMAP_STATUS} from "../../../Constants"
import {unix} from "dayjs";
import RefreshMetadataButton from "../RefreshMetadataButton";
import {useHistory} from "react-router-dom"

const EditBeatmapModal = ({id, open, query, setOpen, users, setSelectedBeatmap, canEdit, userId, location}) => {
  const {loading, payload, error, reset, query: beatmapQuery} = useQuery(Api.getDetailedBeatmap(id))
  const {mutate} = useMutation(Api.updateBeatmap)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [editStatusModalOpen, setEditStatusModalOpen] = useState(false)
  const [potentialNewStatus, setPotentialNewStatus] = useState(0)
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
    nominatedByBNTwo: null
  })
  const [showingArtist, setShowingArtist] = useState("")
  const [showSameNominatorWarning, setShowSameNominatorWarning] = useState(false)
  const [cookies] = useCookies(['bnplanner_osu_access_token'])
  const history = useHistory()

  if (!loading && !error && id) {
    if (payload && payload !== "" && (formValues.artist === null || (formValues.osuId !== "" && formValues.osuId !== payload.osuId))) {
      setFormValues(payload)
      setShowingArtist(payload.artist)
      verifyNominatorSelected(payload.nominators)
      checkIfNewStatusIsPossible()
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
      setPotentialNewStatus(BEATMAP_STATUS.Pending.id)
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

  return (
    <div>
      <Modal open={open} onClose={() => onModalReset()}>
        {!loading && !error && payload &&
        <>
          <div className={"modal-header beatmap-edit-header"} style={{
            backgroundImage: "linear-gradient(to top, rgb(38 38 50), transparent, rgba(0,0,0,.8)), url(https://assets.ppy.sh/beatmaps/" + payload.osuId + "/covers/cover.jpg)"
          }}>
            <div className={"modal-header-image"}/>
            <Header content={"Editing Beatmap : " + showingArtist + " - " + payload.title}/>
          </div>

          <Modal.Content>
            <Grid>
              <Grid.Row>
                <Grid.Column computer={10} tablet={10} mobile={16} textAlign={"center"} verticalAlign={"middle"}>
                  <Button.Group fluid>
                    <Button
                      disabled={!canEdit || (payload.status === BEATMAP_STATUS.Ranked.id || payload.nominators[0] === 0 || payload.nominators[1] === 0)}
                      color='green'
                      onClick={() => {
                        setNewStatus(BEATMAP_STATUS.Ranked.id)
                        setEditStatusModalOpen(true)
                      }}>
                      <Icon name='heart'/> Rank
                    </Button>
                    <Button
                      disabled={!canEdit || (payload.status === BEATMAP_STATUS.Popped.id)}
                      color='orange'
                      onClick={() => {
                        setNewStatus(BEATMAP_STATUS.Popped.id)
                        setEditStatusModalOpen(true)
                      }}>
                      <Icon name='warning'/> Pop
                    </Button>
                    <Button
                      disabled={!canEdit || (payload.status === BEATMAP_STATUS.Disqualified.id)}
                      color='red'
                      onClick={() => {
                        setNewStatus(BEATMAP_STATUS.Disqualified.id)
                        setEditStatusModalOpen(true)
                      }}>
                      <Icon name='close'/> Disqualify
                    </Button>
                  </Button.Group>
                </Grid.Column>
                <Grid.Column computer={6} tablet={6} mobile={16}>
                  <Button.Group fluid>
                    {payload.status !== BEATMAP_STATUS.Graved.id &&
                    <Button disabled={!canEdit} color='grey' onClick={() => {
                      setNewStatus(BEATMAP_STATUS.Graved.id)
                      setEditStatusModalOpen(true)
                    }}>
                      <Icon name='archive'/> Grave
                    </Button>
                    }
                    {payload.status === BEATMAP_STATUS.Graved.id &&
                    <Button disabled={!canEdit} color='grey' onClick={() => {
                      setNewStatus(BEATMAP_STATUS.Pending.id)
                      setEditStatusModalOpen(true)
                    }}>
                      <Icon name='archive'/> Un-Grave
                    </Button>
                    }
                    <Button disabled={!canEdit} color='red' onClick={() => setDeleteModalOpen(true)}>
                      <Icon name='trash'/> Delete
                    </Button>
                  </Button.Group>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column computer={8} tablet={16} mobile={16}>
                  <Form>
                    <h3>Settings</h3>
                    <Form.Dropdown
                      disabled={!canEdit}
                      label={"Nominator #1"}
                      selection
                      search
                      options={getNominatorOptions(users)}
                      value={formValues.nominators[0]}
                      onChange={(_, data) => {
                        verifyNominatorSelected([data.value, formValues.nominators[1]])
                        setFormValue("nominators", [data.value, formValues.nominators[1]])
                      }}
                      error={showSameNominatorWarning}
                    />
                    <Form.Checkbox
                      toggle
                      label={"Has Nominated"}
                      disabled={!canEdit || formValues.nominators[0] === 0}
                      checked={formValues.nominatedByBNOne}
                      onChange={() => {
                        setFormValue("nominatedByBNOne", !formValues.nominatedByBNOne)
                        checkIfNewStatusIsPossible()
                      }}
                    />
                    <Form.Dropdown
                      disabled={!canEdit}
                      label={"Nominator #2"}
                      selection
                      search
                      options={getNominatorOptions(users)}
                      value={formValues.nominators[1]}
                      onChange={(_, data) => {
                        verifyNominatorSelected([formValues.nominators[0], data.value])
                        setFormValue("nominators", [formValues.nominators[0], data.value])
                      }}
                      error={showSameNominatorWarning}
                    />
                    <Form.Checkbox
                      toggle
                      label={"Has Nominated"}
                      disabled={!canEdit || formValues.nominators[1] === 0}
                      checked={formValues.nominatedByBNTwo}
                      onChange={() => {
                        setFormValue("nominatedByBNTwo", !formValues.nominatedByBNTwo)
                        checkIfNewStatusIsPossible()
                      }}
                    />
                    {potentialNewStatus !== 0 && potentialNewStatus !== payload.status &&
                    <p>New Status :
                      <Label horizontal className={readablePotentialStatus.className}>
                        {readablePotentialStatus.name}
                      </Label>
                    </p>
                    }

                    <Grid verticalAlign={"middle"}>
                      <Grid.Row>
                        <Grid.Column mobile={16} computer={8}>
                          <h3>Metadata</h3>
                        </Grid.Column>
                        <Grid.Column mobile={16} computer={8}>
                          <RefreshMetadataButton canEdit={canEdit} beatmap={payload} userId={userId} onModalReset={onModalReset} />
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>

                    <MetadataFields formValues={formValues} canEdit={canEdit} setFormValue={setFormValue} />
                  </Form>
                </Grid.Column>
                <Grid.Column computer={8} mobile={16}>
                  <h3>Status Events</h3>
                  <BeatmapEventList events={formValues.osuEvents} users={users}/>
                  <h3>Planner Events</h3>
                  <BeatmapEventList events={formValues.plannerEvents} users={users}/>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Modal.Content>

          {canEdit === true &&
          <Modal.Actions>
            <Button color='red' onClick={() => onModalReset()}>
              <Icon name='close'/> Close
            </Button>
            <Button color='green' disabled={showSameNominatorWarning} onClick={verifyData}>
              <Icon name='checkmark'/> Save
            </Button>
          </Modal.Actions>
          }
          {canEdit === false &&
          <Modal.Actions>
            <Button color='green' onClick={() => onModalReset()}>
              <Icon name='close'/> Close
            </Button>
          </Modal.Actions>
          }

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
      </Modal>
    </div>
  )
}

const MetadataFields = ({formValues, canEdit, setFormValue}) => {
  return (
    <div>
      <Grid verticalAlign={"middle"}>
        <Grid.Row>
          <Grid.Column computer={8} mobile={16}>
            <MetadataFieldItem value={formValues.artist} label={"Artist"} />
          </Grid.Column>
          <Grid.Column computer={8} mobile={16}>
            <MetadataFieldItem value={formValues.title} label={"Title"} />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column computer={8} mobile={16}>
            <MetadataFieldItem value={formValues.mapper} label={"Mapper"} />
          </Grid.Column>
          <Grid.Column computer={8} mobile={16}>
            <MetadataFieldItem value={unix(formValues.dateUpdated).format("DD MMMM YYYY HH:mm")} label={"Last Updated"} />
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={16}>
            <Form.TextArea
              disabled={!canEdit}
              style={{minHeight: 145, maxHeight: 145}}
              label={"Notes"}
              placeholder='Notes'
              value={formValues.note}
              onChange={event => setFormValue("note", event.target.value)}/>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  )
}

const MetadataFieldItem = ({value, label}) => {
  return (
    <Grid.Row>
      <Grid.Column computer={16} mobile={16}><b>{label}</b></Grid.Column>
      <Grid.Column computer={16} mobile={16}><div className={"metadata-value"}>{value}</div></Grid.Column>
    </Grid.Row>
  )
}

export default EditBeatmapModal
import React, {useState} from "react"
import {useMutation, useQuery} from "react-fetching-library"
import Api from "../../../resources/Api"
import {Button, Form, Grid, Header, Icon, Image, Label, Modal} from "semantic-ui-react"
import {getNominatorOptions, getReadableStatus} from "../../../util/BeatmapUtil"
import BeatmapEventList from "../BeatmapEventList"
import {useCookies} from "react-cookie"
import DeleteBeatmapModal from "./DeleteBeatmapModal"
import EditStatusBeatmapModal from "./EditStatusBeatmapModal"
import {BEATMAP_STATUS} from "../../../Constants"

const EditBeatmapModal = ({id, open, query, setOpen, users, setSelectedBeatmap, canEdit, userId}) => {
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
              backgroundImage: "linear-gradient(to top, #2b2b2b, transparent, rgba(0,0,0,.8)), url(https://assets.ppy.sh/beatmaps/" + payload.osuId + "/covers/cover.jpg)"
            }}>
              <div className={"modal-header-image"} />
              <Header content={"Editing Beatmap : " + showingArtist + " - " + payload.title}/>
            </div>

            <Modal.Content>
              <Grid>
                <Grid.Row>
                  <Grid.Column width={"10"} textAlign={"center"} verticalAlign={"middle"  }>
                    <Button.Group fluid>
                      <Button
                        disabled={payload.status === BEATMAP_STATUS.Ranked.id || payload.nominators[0] !== 0 || payload.nominators[1] !== 0}
                        color='green'
                        onClick={() => {
                          setNewStatus(BEATMAP_STATUS.Ranked.id)
                          setEditStatusModalOpen(true)
                        }}>
                        <Icon name='heart' /> Rank
                      </Button>
                      <Button
                        disabled={payload.status === BEATMAP_STATUS.Popped.id}
                        color='orange'
                        onClick={() => {
                          setNewStatus(BEATMAP_STATUS.Popped.id)
                          setEditStatusModalOpen(true)
                        }}>
                        <Icon name='warning' /> Pop
                      </Button>
                      <Button
                        disabled={payload.status === BEATMAP_STATUS.Disqualified.id}
                        color='red'
                        onClick={() => {
                          setNewStatus(BEATMAP_STATUS.Disqualified.id)
                          setEditStatusModalOpen(true)
                        }}>
                        <Icon name='close' /> Disqualify
                      </Button>
                    </Button.Group>
                  </Grid.Column>
                  <Grid.Column width={"6"}>
                    <Button.Group fluid>
                      <Button disabled={payload.status === BEATMAP_STATUS.Graved.id} color='grey' onClick={() => {
                        setNewStatus(BEATMAP_STATUS.Graved.id)
                        setEditStatusModalOpen(true)
                      }}>
                        <Icon name='archive' /> Grave
                      </Button>
                      <Button color='red' onClick={() => setDeleteModalOpen(true)}>
                        <Icon name='trash' /> Delete
                      </Button>
                    </Button.Group>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column width={8}>
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

                      <h3>Metadata</h3>
                      <Form.Input
                        disabled={!canEdit}
                        label={"Artist"}
                        placeholder='Artist'
                        value={formValues.artist}
                        onChange={event => setFormValue("artist", event.target.value)}
                      />
                      <Form.Input
                        disabled={!canEdit}
                        label={"Title"}
                        placeholder='Title'
                        value={formValues.title}
                        onChange={event => setFormValue("title", event.target.value)}
                      />
                      <Form.Input
                        disabled={!canEdit}
                        label={"Mapper"}
                        placeholder='Mapper'
                        value={formValues.mapper}
                        onChange={event => setFormValue("mapper", event.target.value)}
                      />
                      <Form.TextArea
                        disabled={!canEdit}
                        style={{ minHeight: 145, maxHeight: 145 }}
                        label={"Notes"}
                        placeholder='Notes'
                        value={formValues.note}
                        onChange={event => setFormValue("note", event.target.value)} />
                    </Form>
                  </Grid.Column>
                  <Grid.Column width={8}>
                    <h3>Status Events</h3>
                    <BeatmapEventList events={formValues.osuEvents} users={users} />
                    <h3>Planner Events</h3>
                    <BeatmapEventList events={formValues.plannerEvents} users={users} />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Modal.Content>

            {canEdit === true &&
            <Modal.Actions>
              <Button color='red' onClick={() => onModalReset()} inverted>
                <Icon name='close' /> Close
              </Button>
              <Button color='green' disabled={showSameNominatorWarning} onClick={verifyData} inverted>
                <Icon name='checkmark' /> Save
              </Button>
            </Modal.Actions>
            }
            {canEdit === false &&
            <Modal.Actions>
              <Button color='green' onClick={() => onModalReset()} inverted>
                <Icon name='close' /> Close
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

export default EditBeatmapModal
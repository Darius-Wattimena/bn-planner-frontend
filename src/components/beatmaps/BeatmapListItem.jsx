import React from "react"
import {Button, Grid, Icon, Image, Label, Popup} from "semantic-ui-react"
import UserAvatar from "../user/UserAvatar"
import {getUserWithId} from "../../util/UserUtil"
import {useHistory} from "react-router-dom"

const BeatmapListItem = ({users, displayStatus, beatmap, canEdit, setSelectedBeatmap, setEditModalOpen, location}) => {
  const history = useHistory()

  function getNominator(nominators, nominator) {
    if (nominators.length === 2) {
      return nominators[nominator - 1]
    } else if (nominators.length === 1) {
      if (nominator === 1) {
        return nominators[nominator - 1]
      }

      return null
    }
  }

  function NominatorDetails({users, nominated, nominators, nominatorNumber}) {
    const nominatorId = getNominator(nominators, nominatorNumber)
    const nominatorDetails = getUserWithId(users, nominatorId)
    if (nominatorDetails && nominatorDetails !== 0) {
      return (<UserAvatar nominated={nominated} userDetails={nominatorDetails}/>)
    } else if (nominators.length === 1) {
      if (nominatorNumber === 1) {
        return (<UserAvatar nominated={nominated} userDetails={nominatorDetails}/>)
      }
    }

    return (<div/>)
  }

  return (
    <Grid.Row className={"table-row"}>
      <Grid.Column mobile={16} tablet={16} computer={2} >
        <Image fluid label={
          <Label ribbon horizontal className={displayStatus.className}>
            {displayStatus.name}
          </Label>
        } src={"https://assets.ppy.sh/beatmaps/" + beatmap.osuId + "/covers/cover.jpg"}/>
      </Grid.Column>
      <Grid.Column mobile={8} tablet={8} computer={2}>{beatmap.artist}</Grid.Column>
      <Grid.Column mobile={8} tablet={8} computer={3}>{beatmap.title}</Grid.Column>
      <Grid.Column computer={2} only={"computer"}>{beatmap.mapper}</Grid.Column>
      <Grid.Column textAlign={"left"} mobile={8} tablet={8} computer={2}>
        <NominatorDetails users={users} nominated={beatmap.nominatedByBNOne} nominators={beatmap.nominators} nominatorNumber={1} />
      </Grid.Column>
      <Grid.Column textAlign={"left"} mobile={8} tablet={8} computer={2}>
        <NominatorDetails users={users} nominated={beatmap.nominatedByBNTwo} nominators={beatmap.nominators} nominatorNumber={2} />
      </Grid.Column>
      <Grid.Column only={"computer"} computer={1}>
        {beatmap.note &&
          <Popup trigger={
            <Icon size={"large"} name={"sticky note"} />
          }>
            <Popup.Content>
              {beatmap.note}
            </Popup.Content>
          </Popup>
        }
      </Grid.Column>
      <Grid.Column mobile={16} tablet={16} computer={2}>
        <Button.Group fluid>
          <Button color={"green"} onClick={() => {
            history.push({
              pathname: '/' + location + '/' + beatmap.osuId
            })
            setSelectedBeatmap(beatmap.osuId)
            setEditModalOpen(true)
          }}>
            <Icon fitted name={canEdit ? "pencil" : "eye"}/>
          </Button>
          <Button
            primary
            onClick={() => window.open("https://osu.ppy.sh/beatmapsets/" + beatmap.osuId, "_blank")}
          >
            <Icon fitted name={"linkify"}/>
          </Button>
        </Button.Group>
      </Grid.Column>
    </Grid.Row>
  )
}

export default BeatmapListItem
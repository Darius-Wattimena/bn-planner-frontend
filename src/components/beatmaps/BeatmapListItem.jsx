import React from "react"
import {Button, Grid, Icon, Image, Label, Popup, Table} from "semantic-ui-react"
import UserAvatar from "../user/UserAvatar"

const BeatmapListItem = ({displayStatus, beatmap, canEdit, setSelectedBeatmap, setEditModalOpen}) => {
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

  function NominatorDetails({nominated, nominators, nominatorNumber}) {
    const nominatorDetails = getNominator(nominators, nominatorNumber)
    if (nominatorDetails && nominatorDetails !== 0) {
      return (<UserAvatar nominated={nominated} userDetails={nominatorDetails}/>)
    } else if (nominators.length === 1) {
      if (nominatorNumber === 1) {
        return (<UserAvatar nominated={nominated} userDetails={nominatorDetails}/>)
      }
    }

    return (<p>none</p>)
  }

  return (
    <Table.Row className={"beatmap-row"}>
      <Table.Cell className={"beatmap-banner"} width={"2"}>
        <Image fluid label={
          <Label ribbon horizontal className={displayStatus.className}>
            {displayStatus.name}
          </Label>
        } src={"https://assets.ppy.sh/beatmaps/" + beatmap.osuId + "/covers/cover.jpg"}/>
      </Table.Cell>
      <Table.Cell width={"2"} textAlign={"center"}>{beatmap.artist}</Table.Cell>
      <Table.Cell width={"2"} textAlign={"center"}>{beatmap.title}</Table.Cell>
      <Table.Cell width={"2"} textAlign={"center"}>{beatmap.mapper}</Table.Cell>
      <Table.Cell className={"beatmap-nominator"} width={"2"}>
        <NominatorDetails nominated={beatmap.nominatedByBNOne} nominators={beatmap.nominators} nominatorNumber={1} />
      </Table.Cell>
      <Table.Cell className={"beatmap-nominator"} width={"2"}>
        <NominatorDetails nominated={beatmap.nominatedByBNTwo} nominators={beatmap.nominators} nominatorNumber={2} />
      </Table.Cell>
      <Table.Cell width={"1"} textAlign={"center"}>
        {beatmap.note &&
          <Popup trigger={
            <Icon size={"large"} name={"sticky note"} />
          }>
            <Popup.Content>
              {beatmap.note}
            </Popup.Content>
          </Popup>
        }
      </Table.Cell>
      <Table.Cell width={"2"} textAlign={"center"}>
        <Grid>
          <Grid.Row columns={"equal"}>
            <Grid.Column>
              <Button fluid color={"green"} onClick={() => {
                setSelectedBeatmap(beatmap.osuId)
                setEditModalOpen(true)
              }}>
                <Icon fitted name={canEdit ? "pencil" : "eye"}/>
                {/*{canEdit ? "Edit" : "View"}*/}
              </Button>
            </Grid.Column>
            <Grid.Column>
              <Button
                fluid
                primary
                onClick={() => window.open("https://osu.ppy.sh/beatmapsets/" + beatmap.osuId, "_blank")}
              >
                <Icon fitted name={"linkify"}/>
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Table.Cell>
    </Table.Row>
  )
}

export default BeatmapListItem
import React, {useState} from "react";
import {Button, Icon, Image, Label, Menu, MenuItem, Table} from "semantic-ui-react";
import {BEATMAP_STATUS} from "../../Constants";
import UserAvatar from "../user/UserAvatar";
import {useResource} from "rest-hooks";
import BeatmapByFilterResource from "../../resources/beatmap/BeatmapByFilterResource";

const BeatmapsList = (props) => {
  const [page, setPage] = useState(1);
  const beatmaps = useResource(BeatmapByFilterResource.detailShape(), props.filter);

  const from  = (props.filter.limit * (page - 1)) + 1;
  const to = from + beatmaps.count - 1;

  console.log({filter: props.filter, beatmaps});

  function getNominatorDetails(nominators, nominator) {
    const nominatorDetails = getNominator(nominators, nominator);
    if (nominatorDetails) {
      return (<UserAvatar userDetails={nominatorDetails} />)
    } else if(nominators.length === 1) {
      if (nominator === 1) {
        return (<UserAvatar userDetails={nominatorDetails} />)
      }
    }

    return (<p>none</p>);
  }

  return (
    <Table inverted selectable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>#</Table.HeaderCell>
          <Table.HeaderCell>Artist</Table.HeaderCell>
          <Table.HeaderCell>Title</Table.HeaderCell>
          <Table.HeaderCell>Mapper</Table.HeaderCell>
          <Table.HeaderCell>Nominator #1</Table.HeaderCell>
          <Table.HeaderCell>Nominator #2</Table.HeaderCell>
          <Table.HeaderCell>Actions</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {beatmaps.response.map(beatmap => {
          let displayStatus = getReadableStatus(beatmap.status);
          return (
            <Table.Row>
              <Table.Cell className={"beatmap-banner"} width={"2"}>
                <Image
                  fluid
                  label={
                    <Label ribbon horizontal className={displayStatus.className}>
                      {displayStatus.full}
                    </Label>
                  }
                  src={"https://assets.ppy.sh/beatmaps/" + beatmap.osuId + "/covers/cover.jpg"} />
              </Table.Cell>
              <Table.Cell width={"2"}>{beatmap.artist}</Table.Cell>
              <Table.Cell width={"3"}>{beatmap.title}</Table.Cell>
              <Table.Cell width={"2"}>{beatmap.mapper}</Table.Cell>
              <Table.Cell width={"2"}>{getNominatorDetails(beatmap.nominators, 1)}</Table.Cell>
              <Table.Cell width={"2"}>{getNominatorDetails(beatmap.nominators, 2)}</Table.Cell>
              <Table.Cell width={"3"}>
                <Button.Group fluid>
                  <NominatorButton isNominator={false} />
                  <NominateButton isNominated={false} />
                  <Button inverted secondary>
                    <Icon name={"eye"} />
                  </Button>
                  <Button inverted secondary>
                    <Icon name={"pencil"} />
                  </Button>
                  <Button inverted secondary onClick={()=> window.open("https://osu.ppy.sh/beatmapsets/" + beatmap.osuId, "_blank")}>
                    <Icon name={"linkify"} />
                  </Button>
                </Button.Group>
              </Table.Cell>
            </Table.Row>
          )
        })}
      </Table.Body>
      <Table.Footer>
        <Table.Row>
          <Table.HeaderCell width={"2"}>
            Total Beatmaps: {beatmaps.count}
          </Table.HeaderCell>
          <Table.HeaderCell width={"2"}>
            Showing: {from} Until: {to}
          </Table.HeaderCell>
          <Table.HeaderCell width={"12"} colSpan={"5"}>
            <Menu inverted floated='right' pagination>
              {page !== 1 &&
              <MenuItem as='a' icon onClick={setPage(page - 1)}>
                <Icon name='chevron left' />
              </MenuItem>
              }
              <MenuItem as='a' icon>{page}</MenuItem>
              <MenuItem as='a' icon onClick={() => setPage(page + 1)}>
                <Icon name='chevron right' />
              </MenuItem>
            </Menu>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
  )
};

function getNominator(nominators, nominator) {
  if (nominators.length === 2) {
    return nominators[nominator - 1]
  } else if(nominators.length === 1) {
    if (nominator === 1) {
      return nominators[nominator - 1]
    }

    return null
  }
}

const NominateButton = ({isNominated}) => {
  if (isNominated) {
    return (
      <Button inverted color={"red"}>
        <Icon name={"stop"} />
      </Button>
    )
  } else {
    return (
      <Button inverted color={"green"}>
        <Icon name={"cloud"} />
      </Button>
    )
  }
};

const NominatorButton = ({nominators}) => {
  let isNominator = true;

  if (isNominator) {
    return (
      <Button inverted color={"red"}>
        <Icon name={"minus"} />
      </Button>
    )
  } else {
    return (
      <Button inverted color={"green"}>
        <Icon name={"user plus"} />
      </Button>
    )
  }
};

function getReadableStatus(unreadableStatus) {
  if (unreadableStatus) {
    const keys = Object.keys(BEATMAP_STATUS);
    for (const key of keys) {
      let status = BEATMAP_STATUS[key];
      if (status.name === unreadableStatus) {
        return status
      }
    }
  } else {
    return BEATMAP_STATUS["Unknown"];
  }
}

export default BeatmapsList
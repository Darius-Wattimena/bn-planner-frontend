import React from "react";
import {Button, Icon, Image, Label, Table} from "semantic-ui-react";
import {BEATMAP_STATUS} from "../../Constants";
import UserAvatar from "../user/UserAvatar";
import {useQuery} from "react-fetching-library";
import Api from "../../resources/Api";
import {OSU_ID} from "../../Settings";
import BasicPagination from "../generic/BasicPagination";

const BeatmapsList = (props) => {
  let request = Api.fetchBeatmapsByFilter(props.filter);
  const {loading, payload, error} = useQuery(request);

  let possibleLastPage = 0;

  if (!loading && !error) {
    possibleLastPage = payload.total / props.filter.limit
  }

  function handleFilterSetPage(value) {
    let newFilter = props.filter;
    newFilter["page"] = value;
    props.setFilter({
      ...newFilter
    })
  }

  function getNominatorDetails(nominators, nominator) {
    const nominatorDetails = getNominator(nominators, nominator);
    if (nominatorDetails) {
      return (<UserAvatar userDetails={nominatorDetails}/>)
    } else if (nominators.length === 1) {
      if (nominator === 1) {
        return (<UserAvatar userDetails={nominatorDetails}/>)
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
        {payload && payload.response.map(beatmap => {
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
                  src={"https://assets.ppy.sh/beatmaps/" + beatmap.osuId + "/covers/cover.jpg"}/>
              </Table.Cell>
              <Table.Cell width={"2"}>{beatmap.artist}</Table.Cell>
              <Table.Cell width={"3"}>{beatmap.title}</Table.Cell>
              <Table.Cell width={"2"}>{beatmap.mapper}</Table.Cell>
              <Table.Cell width={"2"}>{getNominatorDetails(beatmap.nominators, 1)}</Table.Cell>
              <Table.Cell width={"2"}>{getNominatorDetails(beatmap.nominators, 2)}</Table.Cell>
              <Table.Cell width={"3"}>
                <Button.Group fluid>
                  <NominatorButton nominators={beatmap.nominators} userId={OSU_ID}/>
                  <Button inverted color={"blue"} onClick={() => {
                    props.setSelectedBeatmap(beatmap.osuId);
                    props.setViewModalOpen(true)
                  }}>
                    <Icon name={"eye"}/>
                  </Button>
                  <Button inverted secondary>
                    <Icon name={"pencil"}/>
                  </Button>
                  <Button inverted secondary
                          onClick={() => window.open("https://osu.ppy.sh/beatmapsets/" + beatmap.osuId, "_blank")}>
                    <Icon name={"linkify"}/>
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
            {payload &&
            <p>Total found beatmaps {payload.total}</p>
            }
          </Table.HeaderCell>
          <Table.HeaderCell width={"14"} colSpan={"6"}>
            <BasicPagination currentPage={props.filter.page} lastPage={possibleLastPage} setPage={handleFilterSetPage}/>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
  )
};

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

const NominateButton = ({status}) => {
  if (status === BEATMAP_STATUS.Bubbled.name) {
    return (
      <Button inverted color={"red"}>
        <Icon name={"cloud"}/>
      </Button>
    )
  }

  if (status === BEATMAP_STATUS.Qualified.name) {
    return (
      <Button inverted color={"red"}>
        <Icon name={"erase"}/>
      </Button>
    )
  } else {
    return (
      <Button inverted color={"green"}>
        <Icon name={"cloud"}/>
      </Button>
    )
  }
};

const NominatorButton = ({nominators}) => {
  let isNominator = false;

  if (isNominator) {
    return (
      <Button inverted color={"red"}>
        <Icon name={"minus"}/>
      </Button>
    )
  } else {
    return (
      <Button inverted color={"green"}>
        <Icon name={"user plus"}/>
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
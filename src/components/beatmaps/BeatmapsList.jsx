import React from "react";
import {Button, Icon, Image, Label, Table} from "semantic-ui-react";
import {BEATMAP_STATUS} from "../../Constants";
import UserAvatar from "../user/UserAvatar";
import BasicPagination from "../generic/BasicPagination";

const BeatmapsList = ({loading, error, payload, filter, setFilter, setEditModalOpen, setSelectedBeatmap}) => {
  let possibleLastPage = 0;

  if (!loading && !error) {
    possibleLastPage = Math.ceil(payload.total / filter.limit)
  }

  function handleFilterSetPage(value) {
    let newFilter = filter;
    newFilter["page"] = value;
    setFilter({
      ...newFilter
    })
  }

  function getNominatorDetails(nominators, nominatorNumber) {
    const nominatorDetails = getNominator(nominators, nominatorNumber);
    if (nominatorDetails && nominatorDetails !== 0) {
      return (<UserAvatar userDetails={nominatorDetails}/>)
    } else if (nominators.length === 1) {
      if (nominatorNumber === 1) {
        return (<UserAvatar userDetails={nominatorDetails}/>)
      }
    }

    return (<p>none</p>);
  }

  return (
    <Table inverted selectable>
      <Table.Header>
        <Table.Row textAlign={"center"}>
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
        {payload && payload.response && payload.response.map(beatmap => {
          let displayStatus = getReadableStatus(beatmap.status);
          return (
            <Table.Row>
              <Table.Cell className={"beatmap-banner"} width={"2"}>
                <Image fluid label={
                    <Label ribbon horizontal className={displayStatus.className}>
                      {displayStatus.full}
                    </Label>
                  } src={"https://assets.ppy.sh/beatmaps/" + beatmap.osuId + "/covers/cover.jpg"}/>
              </Table.Cell>
              <Table.Cell width={"2"} textAlign={"center"}>{beatmap.artist}</Table.Cell>
              <Table.Cell width={"3"} textAlign={"center"}>{beatmap.title}</Table.Cell>
              <Table.Cell width={"2"} textAlign={"center"}>{beatmap.mapper}</Table.Cell>
              <Table.Cell width={"2"}>{getNominatorDetails(beatmap.nominators, 1)}</Table.Cell>
              <Table.Cell width={"2"}>{getNominatorDetails(beatmap.nominators, 2)}</Table.Cell>
              <Table.Cell width={"2"}>
                <Button.Group fluid>
                  setEditStatusModalOpen
                  <Button inverted color={"green"} onClick={() => {
                    setSelectedBeatmap(beatmap.osuId);
                    setEditModalOpen(true)
                  }}>
                    <Icon name={"pencil"}/>
                  </Button>
                  <Button inverted color={"blue"}
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
          <Table.HeaderCell textAlign={"center"}>
            {payload &&
            <p>{payload.total} Beatmap(s) Found</p>
            }
          </Table.HeaderCell>
          <Table.HeaderCell colSpan={"6"}>
            <BasicPagination currentPage={filter.page} lastPage={possibleLastPage} setPage={handleFilterSetPage}/>
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
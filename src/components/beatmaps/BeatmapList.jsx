import React from "react";
import {Table} from "semantic-ui-react";
import {BEATMAP_STATUS} from "../../Constants";
import BasicPagination from "../generic/BasicPagination";
import BeatmapListItem from "./BeatmapListItem";

const BeatmapList = ({loading, error, payload, filter, setEditModalOpen, setSelectedBeatmap, canEdit, setPage}) => {
  let possibleLastPage = 0;

  if (!loading && !error) {
    possibleLastPage = Math.ceil(payload.total / filter.limit)
  }

  return (
    <Table inverted selectable>
      <Table.Header>
        <Table.Row key={"beatmap-list-header"} textAlign={"center"}>
          <Table.HeaderCell>#</Table.HeaderCell>
          <Table.HeaderCell>Artist</Table.HeaderCell>
          <Table.HeaderCell>Title</Table.HeaderCell>
          <Table.HeaderCell>Mapper</Table.HeaderCell>
          <Table.HeaderCell>Nominator #1</Table.HeaderCell>
          <Table.HeaderCell>Nominator #2</Table.HeaderCell>
          <Table.HeaderCell>Note</Table.HeaderCell>
          <Table.HeaderCell>Actions</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {payload && payload.response && payload.response.map((beatmap, index) => {
          let displayStatus = getReadableStatus(beatmap.status);
          return <BeatmapListItem
            key={"beatmap-list-item-" + index}
            beatmap={beatmap}
            displayStatus={displayStatus}
            canEdit={canEdit}
            setEditModalOpen={setEditModalOpen}
            setSelectedBeatmap={setSelectedBeatmap}
          />;
        })}
      </Table.Body>
      <Table.Footer>
        <Table.Row key={"beatmap-list-footer"}>
          <Table.HeaderCell textAlign={"center"}>
            {payload &&
            <p>{payload.total} Beatmap(s) Found</p>
            }
          </Table.HeaderCell>
          <Table.HeaderCell colSpan={"8"}>
            <BasicPagination currentPage={filter.page} lastPage={possibleLastPage} setPage={setPage}/>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
  )
};

function getReadableStatus(unreadableStatus) {
  if (unreadableStatus) {
    const keys = Object.keys(BEATMAP_STATUS);
    for (const key of keys) {
      let status = BEATMAP_STATUS[key];
      if (status.id === unreadableStatus) {
        return status
      }
    }
  } else {
    return BEATMAP_STATUS["Pending"];
  }
}

export default BeatmapList
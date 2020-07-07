import React, {useState} from "react";
import Api from "../../resources/Api";
import {useQuery} from "react-fetching-library";
import {Container, Icon} from "semantic-ui-react";
import BeatmapList from "./BeatmapList";
import AddBeatmapModal from "./modals/AddBeatmapModal";
import EditBeatmapModal from "./modals/EditBeatmapModal";
import {BEATMAP_STATUS} from "../../Constants";
import BeatmapFilter from "./BeatmapFilter";

const filterDefaultState = {
  "artist": null,
  "title": null,
  "mapper": null,
  "status": [BEATMAP_STATUS.Graved.id],
  "limit": 10,
  "page": 1,
  "countTotal": true,
  "hideRanked": true,
  "hideGraved": false,
  "hideWithTwoNominators": false,
  "nominator": null
}

const GravedBeatmaps = ({canEdit, isAdmin, userId, users}) => {
  const [filter, setFilter] = useState(filterDefaultState)
  const [selectedBeatmap, setSelectedBeatmap] = useState(0)
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)

  let request = Api.fetchBeatmapsByFilter(filter)
  const {loading, payload, error, query} = useQuery(request)

  function handleFilterSetPage(value) {
    let newFilter = filter
    newFilter["page"] = value
    setFilter({
      ...newFilter
    })
  }

  return (
    <div className={"base-container-large"}>
      <Container fluid>
        <h1><Icon name={"archive"} />Graved Beatmaps</h1>
        <BeatmapFilter
          users={users}
          filter={filter}
          setFilter={setFilter}
          canEdit={canEdit}
          setPage={handleFilterSetPage}
          onGravedPage={true}
          userId={userId}
          setAddModalOpen={setAddModalOpen}
        />
        <BeatmapList
          loading={loading}
          payload={payload}
          error={error}
          filter={filter}
          setEditModalOpen={setEditModalOpen}
          setSelectedBeatmap={setSelectedBeatmap}
          canEdit={canEdit}
          setPage={handleFilterSetPage}
        />
        <AddBeatmapModal query={query} open={addModalOpen} setOpen={setAddModalOpen} userId={userId} />
        {selectedBeatmap !== 0 &&
        <EditBeatmapModal
          id={selectedBeatmap}
          userId={userId}
          canEdit={canEdit}
          query={query}
          open={editModalOpen}
          setOpen={setEditModalOpen}
          users={users}
          setSelectedBeatmap={setSelectedBeatmap}
        />
        }
      </Container>
    </div>
  )
}

export default GravedBeatmaps
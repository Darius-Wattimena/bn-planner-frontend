import React, {useState} from "react";
import Api from "../../resources/Api";
import {useQuery} from "react-fetching-library";
import {Container} from "semantic-ui-react";
import BeatmapList from "./BeatmapList";
import AddBeatmapModal from "./modals/AddBeatmapModal";
import EditBeatmapModal from "./modals/EditBeatmapModal";
import {BEATMAP_STATUS} from "../../Constants";
import BeatmapFilter from "./BeatmapFilter";

const filterDefaultState = {
  "artist": null,
  "title": null,
  "mapper": null,
  "status": [BEATMAP_STATUS.Ranked.id],
  "limit": "Ten",
  "page": 1,
  "countTotal": true,
  "hideRanked": false,
  "hideGraved": true,
  "hideWithTwoNominators": false,
  "nominator": null
}

const RankedBeatmaps = ({canEdit, isAdmin, userId, users}) => {
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
    <div className={"base-container base-container-large"}>
      <Container fluid>
        <h2>Ranked Beatmaps</h2>
        <BeatmapFilter
          users={users}
          filter={filter}
          setFilter={setFilter}
          canEdit={canEdit}
          setPage={handleFilterSetPage}
          onRankedPage={true}
          userId={userId}
          setAddModalOpen={setAddModalOpen}
        />
        <BeatmapList
          users={users}
          loading={loading}
          payload={payload}
          error={error}
          filter={filter}
          setEditModalOpen={setEditModalOpen}
          setSelectedBeatmap={setSelectedBeatmap}
          canEdit={canEdit}
          setPage={handleFilterSetPage}
        />
        <AddBeatmapModal query={query} open={addModalOpen} setOpen={setAddModalOpen} userId={userId}/>
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

export default RankedBeatmaps
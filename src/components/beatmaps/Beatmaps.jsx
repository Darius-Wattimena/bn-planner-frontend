import React, {useState} from "react"
import BeatmapFilter from "./BeatmapFilter"
import BeatmapList from "./BeatmapList"
import "./Beatmaps.scss"
import AddBeatmapModal from "./modals/AddBeatmapModal"
import EditBeatmapModal from "./modals/EditBeatmapModal"
import {Container} from "semantic-ui-react"
import Api from "../../resources/Api"
import {useQuery} from "react-fetching-library"
import {useParams} from "react-router-dom"

const filterDefaultState = {
  "artist": null,
  "title": null,
  "mapper": null,
  "status": [],
  "limit": "Ten",
  "page": 1,
  "countTotal": true,
  "hideRanked": true,
  "hideGraved": true,
  "hideWithTwoNominators": false,
  "nominator": null
}

const Beatmaps = ({canEdit, isAdmin, userId, users}) => {
  const [filter, setFilter] = useState(filterDefaultState)
  const [selectedBeatmap, setSelectedBeatmap] = useState(0)
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const {beatmapId} = useParams();

  // Check if a beatmap id is provided so we can already open the modal with the provided map
  if (beatmapId && !isNaN(beatmapId) && selectedBeatmap === 0) {
    setSelectedBeatmap(beatmapId)
    setEditModalOpen(true)
  }

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
        <div className={"section"}>
          <div className={"section-title"}>Icons In Progress</div>
          <div className={"section-container"}>
            <BeatmapFilter
              users={users}
              filter={filter}
              setFilter={setFilter}
              setAddModalOpen={setAddModalOpen}
              canEdit={canEdit}
              userId={userId}
              setPage={handleFilterSetPage}/>
          </div>
        </div>

        <div className={"table-section"}>
          <div className={"table-list-container"}>
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
              location={"beatmaps"}
            />
          </div>
        </div>

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
          location={"beatmaps"}
        />
        }
      </Container>
    </div>
  )
}

export default Beatmaps
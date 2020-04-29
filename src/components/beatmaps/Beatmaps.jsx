import React, {useState} from "react";
import BeatmapFilter from "./BeatmapFilter";
import BeatmapList from "./BeatmapList";
import "./Beatmaps.css"
import AddBeatmapModal from "./modals/AddBeatmapModal";
import EditBeatmapModal from "./modals/EditBeatmapModal";
import {Container} from "semantic-ui-react";
import Api from "../../resources/Api";
import {useQuery} from "react-fetching-library";

const filterDefaultState = {
  "artist": null,
  "title": null,
  "mapper": null,
  "status": [],
  "limit": 10,
  "page": 1,
  "countTotal": true,
  "hideRanked": true,
  "hideGraved": true,
  "nominator": []
};

const Beatmaps = ({canEdit, isAdmin}) => {
  const userQuery = useQuery(Api.getUsers());
  const [filter, setFilter] = useState(filterDefaultState);
  const [selectedBeatmap, setSelectedBeatmap] = useState(0);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  let request = Api.fetchBeatmapsByFilter(filter);
  const {loading, payload, error, query} = useQuery(request);

  function handleFilterSetPage(value) {
    let newFilter = filter;
    newFilter["page"] = value;
    setFilter({
      ...newFilter
    })
  }

  return (
    <div className={"base-container-large"}>
      <Container fluid>
        <h1>Beatmaps</h1>
        <BeatmapFilter filter={filter} setFilter={setFilter} setAddModalOpen={setAddModalOpen} canEdit={canEdit} setPage={handleFilterSetPage}/>
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
        <AddBeatmapModal query={query} open={addModalOpen} setOpen={setAddModalOpen} />
        {selectedBeatmap !== 0 &&
          <EditBeatmapModal query={query} open={editModalOpen} setOpen={setEditModalOpen} id={selectedBeatmap} users={userQuery.payload} setSelectedBeatmap={setSelectedBeatmap} canEdit={canEdit}/>
        }
      </Container>
    </div>
  )
};

export default Beatmaps
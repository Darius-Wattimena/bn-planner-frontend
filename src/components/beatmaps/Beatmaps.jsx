import React, {useState} from "react";
import BeatmapFilter from "./BeatmapFilter";
import BeatmapsList from "./BeatmapsList";
import "./Beatmaps.css"
import AddBeatmapModal from "./modals/AddBeatmapModal";
import EditBeatmapModal from "./modals/EditBeatmapModal";
import {Container} from "semantic-ui-react";
import Api from "../../resources/Api";
import {useQuery} from "react-fetching-library";
import EditBeatmapStatusModal from "./modals/EditBeatmapStatusModal";

const filterDefaultState = {
  "artist": null,
  "title": null,
  "mapper": null,
  "status": [],
  "limit": 10,
  "page": 1,
  "countTotal": true,
  "nominator": []
};

const Beatmaps = () => {
  const [filter, setFilter] = useState(filterDefaultState);
  const [selectedBeatmap, setSelectedBeatmap] = useState(0);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editStatusModalOpen, setEditStatusModalOpen] = useState(false);

  let request = Api.fetchBeatmapsByFilter(filter);
  const {loading, payload, error, query} = useQuery(request);

  return (
    <div className={"base-container-large"}>
      <Container fluid>
        <h1>Beatmaps</h1>
        <BeatmapFilter filter={filter} setFilter={setFilter} setAddModalOpen={setAddModalOpen}/>
        <BeatmapsList
          loading={loading}
          payload={payload}
          error={error}
          filter={filter}
          setFilter={setFilter}
          setEditModalOpen={setEditModalOpen}
          setEditStatusModalOpen={setEditStatusModalOpen}
          setSelectedBeatmap={setSelectedBeatmap}
        />
        <EditBeatmapStatusModal query={query} open={editStatusModalOpen} setOpen={setEditStatusModalOpen} id={selectedBeatmap} />
        <EditBeatmapModal query={query} open={editModalOpen} setOpen={setEditModalOpen} id={selectedBeatmap} />
        <AddBeatmapModal query={query} open={addModalOpen} setOpen={setAddModalOpen}/>
      </Container>
    </div>
  )
};

export default Beatmaps
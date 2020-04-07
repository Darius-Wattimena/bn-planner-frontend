import React, {useState} from "react";
import BeatmapFilter from "./BeatmapFilter";
import BeatmapsList from "./BeatmapsList";
import "./Beatmaps.css"
import AddBeatmapModal from "./modals/AddBeatmapModal";
import ViewBeatmapModal from "./modals/ViewBeatmapModal";
import {Container} from "semantic-ui-react";

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
  const [viewModalOpen, setViewModalOpen] = useState(false);

  return (
    <div className={"base-container-large"}>
      <Container fluid>
        <h1>Beatmaps</h1>
        <ViewBeatmapModal open={viewModalOpen} setOpen={setViewModalOpen} id={selectedBeatmap} />
        <AddBeatmapModal open={addModalOpen} setOpen={setAddModalOpen}/>
        <BeatmapFilter filter={filter} setFilter={setFilter} setAddModalOpen={setAddModalOpen}/>
        <BeatmapsList filter={filter} setFilter={setFilter} setViewModalOpen={setViewModalOpen} setSelectedBeatmap={setSelectedBeatmap}/>
      </Container>
    </div>
  )
};

export default Beatmaps
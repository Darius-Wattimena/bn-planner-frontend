import React, {useState} from "react";
import BeatmapFilter from "./BeatmapFilter";
import BeatmapsList from "./BeatmapsList";
import "./Beatmaps.css"
import AddBeatmapModal from "./modals/AddBeatmapModal";

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
  const [openModalOpen, setOpenModalOpen] = useState(false);

  return (
    <div>
      <h1>Beatmaps</h1>
      <AddBeatmapModal open={openModalOpen} setOpen={setOpenModalOpen} />
      <BeatmapFilter filter={filter} setFilter={setFilter} setOpenModalOpen={setOpenModalOpen} />
      <BeatmapsList filter={filter} setFilter={setFilter} />
    </div>
  )
};

export default Beatmaps
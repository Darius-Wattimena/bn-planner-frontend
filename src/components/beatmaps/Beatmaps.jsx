import React, {useState} from "react";
import BeatmapFilter from "./BeatmapFilter";
import BeatmapsList from "./BeatmapsList";
import "./Beatmaps.css"

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

  return (
    <div>
      <h1>Beatmaps</h1>
      <BeatmapFilter filter={filter} setFilter={setFilter} />
      <BeatmapsList filter={filter} setFilter={setFilter} />
    </div>
  )
};

export default Beatmaps
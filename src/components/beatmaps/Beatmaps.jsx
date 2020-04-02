import React, {useState} from "react";
import BeatmapFilter from "./BeatmapFilter";
import BeatmapsList from "./BeatmapsList";
import "./Beatmaps.css"

const filterDefaultState = {
  "artist": null,
  "title": null,
  "mapper": null,
  "isPending": null,
  "isWorkInProgress": null,
  "isAwaitingResponse": null,
  "isBubbled": null,
  "isQualified": null,
  "isPopped": null,
  "isDisqualified": null,
  "isGraved": null,
  "isRanked": null,
  "limit": 1,
  "skip": 0,
  "countTotal": true,
  "nominator": []
};

const Beatmaps = () => {
  const [filter, setFilter] = useState(filterDefaultState);

  return (
    <div>
      <h1>Beatmaps</h1>
      <BeatmapFilter filter={filter} setFilter={setFilter} />
      <BeatmapsList filter={filter} />
    </div>
  )
};

export default Beatmaps
import {BEATMAP_STATUS} from "../Constants";

export function getBeatmapStatusOptions() {
  return [
    getOption(BEATMAP_STATUS.Pending),
    getOption(BEATMAP_STATUS.WorkInProgress),
    getOption(BEATMAP_STATUS.AwaitingResponse),
    getOption(BEATMAP_STATUS.Bubbled),
    getOption(BEATMAP_STATUS.Qualified),
    getOption(BEATMAP_STATUS.Ranked),
    getOption(BEATMAP_STATUS.Popped),
    getOption(BEATMAP_STATUS.Disqualified),
    getOption(BEATMAP_STATUS.Graved)
  ]
}

function getOption(status) {
  return {
    key: status.name,
    text: status.full,
    value: status.name,
    className: status.className
  }
}
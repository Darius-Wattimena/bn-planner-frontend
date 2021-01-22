import {BEATMAP_STATUS} from "../Constants"
import {getReadableRole} from "./UserUtil"

let nominatorOptions = []

export function getNominatorOptions(users) {
  if (nominatorOptions.length > 0) {
    return nominatorOptions
  }

  if (users && Array.isArray(users)) {
    let preparedUsers = users.filter(user => (
      user.role !== "GST" && user.role !== "OBS"
    )).map(user => ({
      key: user.osuId,
      text: user.osuName,
      value: user.osuId,
      className: getReadableRole(user.role).className
    }))

    nominatorOptions = [
      ...preparedUsers
    ]
    return nominatorOptions
  }
}

export function getReadableStatus(statusId) {
  if (statusId) {
    const keys = Object.keys(BEATMAP_STATUS)
    for (const key of keys) {
      let status = BEATMAP_STATUS[key]
      if (status.id === statusId) {
        return status
      }
    }
  }

  return BEATMAP_STATUS.Pending
}

export function getBeatmapStatusOptions() {
  return [
    getOption(BEATMAP_STATUS.Qualified),
    getOption(BEATMAP_STATUS.Bubbled),
    getOption(BEATMAP_STATUS.Disqualified),
    getOption(BEATMAP_STATUS.Popped),
    getOption(BEATMAP_STATUS.Pending),
    getOption(BEATMAP_STATUS.Unfinished)
  ]
}

function getOption(status) {
  return {
    key: status.id,
    text: status.name,
    value: status.id,
    className: "beatmap-status-item " + status.className
  }
}
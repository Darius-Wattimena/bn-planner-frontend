import {BEATMAP_STATUS, USER_ROLES} from "../Constants"
import {getReadableRole} from "./UserUtil"

export function getNominatorOptions(users) {
  if (users && Array.isArray(users)) {
    let preparedUsers = users.map(user => ({
      key: user.osuId,
      text: user.osuName,
      value: user.osuId,
      className: getReadableRole(user.role).className
    }))

    return [
      {key: 0, text: 'none', value: 0},
      ...preparedUsers
    ]
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
    getOption(BEATMAP_STATUS.Ranked),
    getOption(BEATMAP_STATUS.Graved)
  ]
}

function getOption(status) {
  return {
    key: status.id,
    text: status.name,
    value: status.id,
    className: status.className
  }
}
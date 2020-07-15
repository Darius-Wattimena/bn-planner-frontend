import {BEATMAP_STATUS} from "../Constants"
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
      {key: 0, text: 'None', value: 0},
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
    {key: 0, text: 'None', value: 0},
    getOption(BEATMAP_STATUS.Qualified, "star"),
    getOption(BEATMAP_STATUS.Bubbled, "cloud"),
    getOption(BEATMAP_STATUS.Disqualified, "close"),
    getOption(BEATMAP_STATUS.Popped, "warning"),
    getOption(BEATMAP_STATUS.Pending, "meh")
  ]
}

function getOption(status, icon) {
  return {
    key: status.id,
    text: status.name,
    value: status.id,
    className: status.className,
    icon: icon
  }
}
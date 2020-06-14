import {BEATMAP_STATUS} from "../Constants";
import {getReadableRole} from "./UserUtil";

export function getNominatorOptions(users) {
  if (users && Array.isArray(users)) {
    let preparedUsers = users.map(user => ({
      key: user.osuId,
      text: user.osuName,
      value: user.osuId,
      className: getReadableRole(user.role).className
    }));

    return [
      {key: 0, text: 'none', value: 0},
      ...preparedUsers
    ]
  }
}

export function getBeatmapStatusOptions() {
  return [
    getOption(BEATMAP_STATUS.Qualified),
    getOption(BEATMAP_STATUS.Bubbled),
    getOption(BEATMAP_STATUS.Pending),
    getOption(BEATMAP_STATUS.Disqualified),
    getOption(BEATMAP_STATUS.Popped),
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
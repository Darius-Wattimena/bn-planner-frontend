import {BEATMAP_STATUS, USER_ROLES} from "../Constants";

export function getReadableRole(unreadableRole) {
  if (unreadableRole) {
    const keys = Object.keys(USER_ROLES);
    for (const key of keys) {
      let role = USER_ROLES[key];
      if (role.name === unreadableRole) {
        return role
      }
    }
  } else {
    return USER_ROLES["Observer"];
  }
}

export function getUserRoles() {
  return [
    getOption(USER_ROLES.BeatmapNominator),
    getOption(USER_ROLES.ProbationBeatmapNominator),
    getOption(USER_ROLES.NominationAssessmentTeam),
    getOption(USER_ROLES.RetiredCatch),
    getOption(USER_ROLES.Observer)
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
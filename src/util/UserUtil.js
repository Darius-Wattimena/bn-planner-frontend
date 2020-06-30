import {USER_ROLES} from "../Constants";

export function getUserWithId(users, userId) {
  if (users && userId && Array.isArray(users)) {
    return users.find(user => user.osuId === userId)
  }
}

export function getReadableRole(unreadableRole) {
  if (unreadableRole) {
    const keys = Object.keys(USER_ROLES);
    for (const key of keys) {
      let role = USER_ROLES[key];
      if (role.id === unreadableRole) {
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
    key: status.id,
    text: status.name,
    value: status.id,
    className: status.className
  }
}
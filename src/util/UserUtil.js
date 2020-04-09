import {USER_ROLES} from "../Constants";

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
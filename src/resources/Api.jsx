function filterToUrlParams(filter) {
  let result = ""
  let first = true

  for (let item in filter) {
    if (filter.hasOwnProperty(item)) {
      if (filter[item] === null || (Array.isArray(filter[item]) && filter[item].length === 0)) {
        continue
      }

      if (first) {
        result += "?" + item + "=" + filter[item]
        first = false
      } else {
        result += "&" + item + "=" + filter[item]
      }
    }
  }

  return result
}

const Api = {
  fetchBeatmapsByFilter: (filter) => {
    return {
      method: 'GET',
      endpoint: 'v1/beatmap/searchByFilter' + filterToUrlParams(filter)
    }
  },
  fetchUsersByFilter: (filter) => {
    return {
      method: 'GET',
      endpoint: 'v1/user/searchByFilter' + filterToUrlParams(filter)
    }
  },
  fetchContests: (token, userId) => {
    return {
      method: 'GET',
      endpoint: 'v1/contest/findAll',
      headers: {
        "Authorization": "Bearer " + token,
        "Osu-Id": userId
      }
    }
  },
  addContest: (contest, token, userId) => {
    return {
      method: 'POST',
      endpoint: 'v1/contest/add',
      body: contest,
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
        "Osu-Id": userId
      }
    }
  },
  fetchModdingMaps: (token, userId) => {
    return {
      method: 'GET',
      endpoint: 'v1/modding/map/findAll',
      headers: {
        "Authorization": "Bearer " + token,
        "Osu-Id": userId
      }
    }
  },
  fetchModdingMapDiscussion: (mapId, token, userId) => {
    return {
      method: 'GET',
      endpoint: `v1/modding/map/${mapId}/findDiscussion`,
      headers: {
        "Authorization": "Bearer " + token,
        "Osu-Id": userId
      }
    }
  },
  addModdingMap: (moddingMap, token, userId) => {
    return {
      method: 'POST',
      endpoint: 'v1/modding/map/add',
      body: moddingMap,
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
        "Osu-Id": userId
      }
    }
  },
  addModdingComment: (moddingComment, token, userId) => {
    return {
      method: 'POST',
      endpoint: 'v1/modding/comment/add',
      body: moddingComment,
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
        "Osu-Id": userId
      }
    }
  },
  resolveModdingComment: (commentId, status, token, userId) => {
    return {
      method: 'PUT',
      endpoint: `v1/modding/comment/${commentId}/resolve`,
      body: status,
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
        "Osu-Id": userId
      }
    }
  },
  addModdingResponse: (moddingResponse, token, userId) => {
    return {
      method: 'POST',
      endpoint: 'v1/modding/response/add',
      body: moddingResponse,
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
        "Osu-Id": userId
      }
    }
  },
  addBeatmap: (beatmap, token, userId) => {
    return {
      method: 'POST',
      endpoint: 'v1/beatmap/add',
      body: beatmap,
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
        "Osu-Id": userId
      }
    }
  },
  updateBeatmap: (beatmap, token, userId) => {
    return {
      method: 'PUT',
      endpoint: 'v1/beatmap/' + beatmap.osuId + "/update",
      body: beatmap,
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
        "Osu-Id": userId
      }
    }
  },
  updateBeatmapStatus: (beatmapId, statusFormValues, token, userId) => {
    return {
      method: 'PUT',
      endpoint: 'v1/beatmap/' + beatmapId + "/updateStatus",
      body: statusFormValues,
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
        "Osu-Id": userId
      }
    }
  },
  deleteBeatmap: (beatmapId, token, userId) => {
    return {
      method: 'DELETE',
      endpoint: 'v1/beatmap/' + beatmapId + "/delete",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
        "Osu-Id": userId
      }
    }
  },
  updateUser: (user, token, userId) => {
    return {
      method: 'PUT',
      endpoint: 'v1/user/' + user.osuId + "/update",
      body: user,
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
        "Osu-Id": userId
      }
    }
  },
  addUser: (user, token, userId) => {
    return {
      method: 'POST',
      endpoint: 'v1/user/add',
      body: user,
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
        "Osu-Id": userId
      }
    }
  },
  getUsers: () => {
    return {
      method: 'GET',
      endpoint: 'v1/user/findAll'
    }
  },
  getDetailedUser: (id) => {
    return {
      method: 'GET',
      endpoint: 'v1/user/' + id + '/detailed'
    }
  },
  getDetailedBeatmap: (id) => {
    return {
      method: 'GET',
      endpoint: 'v1/beatmap/' + id + '/detailed'
    }
  },
  getUserInfo: (token) => {
    return {
      method: 'GET',
      endpoint: 'v1/osu/userInfo',
      headers: {
        "Authorization": "Bearer " + token
      }
    }
}
}

export default Api
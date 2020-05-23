function filterToUrlParams(filter) {
  let result = "";
  let first = true;

  for (let item in filter) {
    if (filter.hasOwnProperty(item)) {
      if (filter[item] === null || (Array.isArray(filter[item]) && filter[item].length === 0)) {
        continue
      }

      if (first) {
        result += "?" + item + "=" + filter[item];
        first = false
      } else {
        result += "&" + item + "=" + filter[item];
      }
    }
  }

  return result;
}

const Api = {
  login: (login) => {
    return {
      method: 'POST',
      endpoint: 'v1/auth/login',
      body: login,
      headers: {"Content-Type": "application/json"}
    }
  },
  register: (login) => {
    return {
      method: 'POST',
      endpoint: 'v1/auth/register',
      body: login,
      headers: {"Content-Type": "application/json"}
    }
  },
  fetchBeatmapsByFilter: (filter) => {
    return {
      method: 'GET',
      endpoint: 'v1/beatmap/searchByFilter' + filterToUrlParams(filter)
    };
  },
  fetchUsersByFilter: (filter) => {
    return {
      method: 'GET',
      endpoint: 'v1/user/searchByFilter' + filterToUrlParams(filter)
    };
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
};

export default Api
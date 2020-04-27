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
    console.log(login);
    return {
      method: 'POST',
      endpoint: 'v1/auth/login',
      body: login,
      header: {"Content-Type": "application/json"}
    }
  },
  register: (login) => {
    return {
      method: 'POST',
      endpoint: 'v1/auth/register',
      body: login,
      header: {"Content-Type": "application/json"}
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
  addBeatmap: (beatmap) => {
    return {
      method: 'POST',
      endpoint: 'v1/beatmap/add',
      body: beatmap,
      header: {"Content-Type": "application/json"}
    }
  },
  updateBeatmap: (beatmap) => {
    return {
      method: 'PUT',
      endpoint: 'v1/beatmap/' + beatmap.osuId + "/update",
      body: beatmap,
      header: {"Content-Type": "application/json"}
    }
  },
  updateUser: (user) => {
    return {
      method: 'PUT',
      endpoint: 'v1/user/' + user.osuId + "/update",
      body: user,
      header: {"Content-Type": "application/json"}
    }
  },
  addUser: (user) => {
    return {
      method: 'POST',
      endpoint: 'v1/user/add',
      body: user,
      header: {"Content-Type": "application/json"}
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
  }
};

export default Api
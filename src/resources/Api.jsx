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
  getBeatmap: (id) => {
    return {
      method: 'GET',
      endpoint: 'v1/beatmap/' + id
    }
  }
};

export default Api
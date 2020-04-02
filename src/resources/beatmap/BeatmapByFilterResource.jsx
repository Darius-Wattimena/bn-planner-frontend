import {BASE_URL} from "../../Settings";
import BeatmapResource from "./BeatmapResource";
import {Resource} from "rest-hooks";

export default class BeatmapByFilterResource extends Resource {
  uuid = undefined;
  response = [];
  count = 0;
  total = 0;

  pk() {
    return this.uuid?.toString();
  }

  static urlRoot = BASE_URL + '/v1/beatmap/searchByFilter';

  /*getFetchKey(params) {
    return "GET " + this.urlRoot
  }

  fetch(params) {
    return BeatmapByFilterResource.fetch('get', this.urlRoot, params)
  }*/

  static searchShape() {
    return {
      ...this(),
      getFetchKey(params) {
        return "GET " + this.urlRoot
      },
      fetch(params) {
        return BeatmapByFilterResource.fetch('get', this.urlRoot, params)
      }
    }
  }

  static getEntitySchema() {
    const schema = super.getEntitySchema();
    schema.define({
      response: [BeatmapResource.asSchema()]
    })
  }
}
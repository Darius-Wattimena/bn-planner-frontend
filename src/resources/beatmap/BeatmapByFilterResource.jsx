import {Resource} from 'rest-hooks';
import {BASE_URL} from "../../Settings";
import BeatmapResource from "./BeatmapResource";

export default class BeatmapByFilterResource extends Resource {
  uuid = undefined;
  response = [];
  count = 0;
  total = 0;

  pk() {
    return this.uuid?.toString();
  }

  static urlRoot = BASE_URL + '/v1/beatmap/searchByFilter';

  static searchShape(body) {
    return {
      ...this.detailShape(),
      fetch(params) {
        return BeatmapByFilterResource.fetch('post', BASE_URL + '/v1/beatmap/searchByFilter', body)
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
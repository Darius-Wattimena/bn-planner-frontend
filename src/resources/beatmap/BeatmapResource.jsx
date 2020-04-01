import { Resource } from 'rest-hooks';
import {BASE_URL} from "../../Settings";

export default class BeatmapResource extends Resource {
  osuId = undefined;
  artist = '';
  title = '';
  note = '';
  mapper = '';
  status = '';
  nominators = [];
  interested = [];

  pk() {
    return this.osuId?.toString();
  }

  static urlRoot = BASE_URL + '/v1/beatmap';
}
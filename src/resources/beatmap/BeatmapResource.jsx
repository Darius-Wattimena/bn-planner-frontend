import { Resource } from 'rest-hooks';
import {BASE_URL} from "../../Settings";
import UserResource from "../user/UserResource";

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

  static getEntitySchema() {
    const schema = super.getEntitySchema();
    schema.define({
      nominators: [UserResource.asSchema()],
      interested: [UserResource.asSchema()]
    })
  }
}
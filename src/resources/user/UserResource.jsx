import { Resource } from 'rest-hooks';
import {BASE_URL} from "../../Settings";

export default class UserResource extends Resource {
  osuId = undefined;
  osuName = null;
  profilePictureUri = null;
  authId = null;
  role = null;

  pk() {
    return this.osuId?.toString();
  }

  static urlRoot = BASE_URL + '/v1/user';
}
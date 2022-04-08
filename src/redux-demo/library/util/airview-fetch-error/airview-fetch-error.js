import { AIRVIEW_FETCH_ERROR_LABEL } from "../../constants";

export function AirviewFetchError(code, message) {
  this.name = AIRVIEW_FETCH_ERROR_LABEL;
  this.code = code;
  this.message = message;
}

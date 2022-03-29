import slugify from "slugify";
import { SLUGIFY_CONFIG } from "../../constants";

export function slugifyString(value) {
  return slugify(value, SLUGIFY_CONFIG);
}

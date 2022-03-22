import slugify from "slugify";
import { SLUGIFY_CONFIG } from "../constants";

export function useSlugify() {
  return (value) => slugify(value, SLUGIFY_CONFIG);
}

export function isLinkInternal(url) {
  return /^\/(?!\/)/.test(url);
}

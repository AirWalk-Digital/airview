export function isLinkInternal(url) {
  return !/^(?:[a-z]+:)?\/\//i.test(url);
}

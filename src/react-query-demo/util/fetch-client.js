export function fetchClient(endpoint) {
  return async () => {
    const response = await fetch(endpoint);

    const data = await response.json();

    return data;
  };
}

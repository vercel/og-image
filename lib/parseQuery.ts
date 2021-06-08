export function parseQueryArray(query: string[] | string | undefined) {
  if (query) {
    if (Array.isArray(query)) {
      return query.map((query) => decodeURIComponent(query));
    }

    return [decodeURIComponent(query)];
  }

  return [];
}

export function parseQueryString(query: string[] | string | undefined) {
  if (query) {
    if (Array.isArray(query)) {
      throw new Error('Expected a single value');
    }

    return decodeURIComponent(query);
  }

  return '';
}

export function parseQueryBoolean(query: string[] | string | undefined) {
  if (query == 'true' || query == '1') {
    return true;
  }

  return false;
}

// Keep in sync with `basePath` in next.config.mjs.
// Used to prefix client-side fetch() calls and image URLs that don't go
// through Next's <Link> / router, since basePath is not auto-applied there.
export const BASE_PATH = '/bestspot';

export const withBasePath = (path: string): string =>
  path.startsWith(BASE_PATH) ? path : `${BASE_PATH}${path.startsWith('/') ? path : `/${path}`}`;

import http from 'http';
import listen from 'test-listen';
import { RequestHandler } from 'micro';

export const listeners = new Map();

export default async function makeUrl(fn: RequestHandler) {
  const listener = listeners.get(fn);
  if (listener) {
    return listener.url;
  }

  const server = new http.Server(fn as RequestHandler);
  const url = await listen(server);
  listeners.set(fn, {
    url,
    server,
  })
  return url;
}


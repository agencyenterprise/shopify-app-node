import http from 'http';
import listen from 'test-listen';
import Koa, { ExtendableContext } from 'koa';

const app = new Koa();

export const listeners = new Map();

export default async function makeUrl(fn: (ctx: ExtendableContext) => void) {
  const listener = listeners.get(fn);
  if (listener) {
    return listener.url;
  }

  app.use(fn);
  const server = new http.Server(app.callback());
  const url = await listen(server);
  listeners.set(fn, {
    url,
    server,
  })
  return url;
}


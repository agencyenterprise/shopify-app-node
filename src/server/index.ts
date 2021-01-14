import '@babel/polyfill';
import dotenv from 'dotenv';
import 'isomorphic-fetch';
import createShopifyAuth, { verifyRequest } from '@shopify/koa-shopify-auth';
import graphQLProxy, { ApiVersion } from '@shopify/koa-shopify-graphql-proxy';
import Koa from 'koa';
import next from 'next';
import Router from 'koa-router';
import session from 'koa-session';
import {
  DeliveryMethod,
  Options,
  receiveWebhook
} from '@shopify/koa-shopify-webhooks';
import addWebhook from 'src/server/utils/addWebhook';

dotenv.config();
const port = parseInt(process.env.PORT, 10) || 8081;
const dev = process.env.NODE_ENV !== 'production';
const app = next({
  dev,
});
const handle = app.getRequestHandler();
const {
  SHOPIFY_API_SECRET,
  SHOPIFY_API_KEY,
  SCOPES,
  HOST,
} = process.env;
app.prepare().then(() => {
  const server = new Koa();
  const router = new Router();
  server.use(
    session(
      {
        sameSite: 'none',
        secure: true,
      },
      server
    )
  );
  server.keys = [SHOPIFY_API_SECRET];
  server.use(
    createShopifyAuth({
      apiKey: SHOPIFY_API_KEY,
      secret: SHOPIFY_API_SECRET,
      scopes: [SCOPES],
      async afterAuth(ctx) {
        let { shop, accessToken, scopes } = ctx.session;

        // Access token and shop available in ctx.state.shopify also??
        if (!shop) {
          shop = ctx.state.shopify.shop || new URLSearchParams(ctx.request.url).get('shop');
        }

        ctx.cookies.set('shopOrigin', shop, {
          httpOnly: false,
          secure: true,
          sameSite: 'none'
        });

        console.log('accessToken', accessToken);
        console.log('scopes', scopes);

        const productsCreateWebhookOptions: Options = {
          address: `${HOST}/webhooks/products/create`,
          topic: 'PRODUCTS_CREATE',
          accessToken,
          shop,
          apiVersion: ApiVersion.July20,
          deliveryMethod: DeliveryMethod.Http,
        }
        await addWebhook(productsCreateWebhookOptions);

        // Redirect to app with shop parameter upon auth
        ctx.redirect(`/?shop=${shop}`);
      },
    })
  );

  const webhook = receiveWebhook({ secret: SHOPIFY_API_SECRET });
  router.post('/webhooks/products/create', webhook, (ctx) => {
    console.log('received webhook: ', ctx.state.webhook);
  });

  server.use(
    graphQLProxy({
      version: ApiVersion.October19,
    })
  );
  router.get('(.*)', verifyRequest(), async (ctx) => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
    ctx.res.statusCode = 200;
  });
  server.use(router.allowedMethods());
  server.use(router.routes());
  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});

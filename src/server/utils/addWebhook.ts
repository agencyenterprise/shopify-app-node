import {
  Options,
  registerWebhook
} from '@shopify/koa-shopify-webhooks';

export default async function addWebhook(options: Options) {
  const registration = await registerWebhook(options);

  if (registration.success) {
    console.log('Successfully registered webhook!');
  }
  else {
    console.log('Failed to register webhook', JSON.stringify(registration.result, null, 2));
  }
}

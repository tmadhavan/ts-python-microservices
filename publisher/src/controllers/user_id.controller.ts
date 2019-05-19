import * as Koa from 'koa';
import * as Router from 'koa-router';
import { MessagePublisher } from '../messaging/message_publisher';

const routerOptions: Router.IRouterOptions = {
  prefix: '/userid',
};

const router = new Router(routerOptions);
const messagePublisher = new MessagePublisher();

router.get('/:userid', async (ctx: Koa.Context) => {

  // get the user id from the path name
  const userId = ctx.params.userid;

  // get the user name from the request body, or a query param, or provide a default
  const name = ctx.request.body.name || ctx.request.query.name || 'No name';

  const userDetails = { userId, name };
  let publishStatus = true;
  try {
    messagePublisher.publishMessage(userDetails);
  } catch (err) {
    console.error(`Error publishing message: ${err}`);
    publishStatus = false;
  }

  ctx.body = { ...userDetails, published: publishStatus };

});

export default router;

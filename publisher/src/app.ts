import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as HttpStatus from 'http-status-codes';
import router from './controllers/user_id.controller';

const app = new Koa();

// Add some generic error handling
// (see: https://inviqa.com/blog/how-build-basic-api-typescript-koa-and-typeorm)
app.use(async (ctx: Koa.Context, next: () => Promise<any>) => {

  try {
    await next();
  } catch (error) {
    ctx.status = error.statusCode || error.status || HttpStatus.INTERNAL_SERVER_ERROR;
    error.status = ctx.status;
    ctx.body = { error };
    ctx.app.emit('error', error, ctx);
  }
});

// Add the basic get endpoint
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

app.on('error', console.error);

export default app;

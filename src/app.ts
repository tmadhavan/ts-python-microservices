import * as Koa from 'koa';

const app = new Koa();

app.use(async (ctx) => {
  ctx.body = 'updating with overridden comman';
});

app.listen(process.env.PORT || 3000);

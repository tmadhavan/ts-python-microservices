"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const app = new Koa();
app.use(async (ctx) => {
    ctx.body = 'updating with overridden comman';
});
app.listen(process.env.PORT || 3000);

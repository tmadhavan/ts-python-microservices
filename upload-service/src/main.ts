import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// TODO Validate that all the required env vars are present (use envalidate or something)
const dotenv = require('dotenv');
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env['PORT'] || 3001);
}
bootstrap();

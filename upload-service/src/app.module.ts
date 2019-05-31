import { Module } from '@nestjs/common';
import { PdfController } from './controllers/PdfController';
import {PublisherService} from './messaging/PublisherService';

@Module({
  imports: [],
  controllers: [PdfController],
  providers: [PublisherService],
})
export class AppModule {}

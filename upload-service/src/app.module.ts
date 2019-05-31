import { Module } from '@nestjs/common';
import { PdfController } from './pdf.controller';
import {PublisherService} from './messaging/publisher.service';

@Module({
  imports: [],
  controllers: [PdfController],
  providers: [PublisherService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { PublisherService } from './services/publisher.service';

@Module({
  providers: [PublisherService],
  exports: [PublisherService],
})
export class MessagingModule {}

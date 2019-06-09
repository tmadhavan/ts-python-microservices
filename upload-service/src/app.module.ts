import { Module } from '@nestjs/common';
import {UploadsModule} from './uploads/uploads.module';
import {MessagingModule} from './messaging/messaging.module';

@Module({
  imports: [UploadsModule, MessagingModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

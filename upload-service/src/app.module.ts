import { Module, Provider } from '@nestjs/common';
import { UploadsModule } from './uploads/uploads.module';
import { MessagingModule } from './messaging/messaging.module';
import { StorageFactory } from './storage/storage.factory';
import StorageModule from './storage/storage.module';

@Module({
  imports: [UploadsModule, MessagingModule, StorageModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

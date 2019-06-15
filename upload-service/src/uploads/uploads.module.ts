import { PublisherService } from '../messaging/services/publisher.service';
import { UploadController } from './controllers/upload.controller';
import { Module, Provider } from '@nestjs/common';
import { S3StorageProvider } from '../storage/services/aws/s3.storage.service';
import { AzureStorageProvider } from '../storage/services/azure/azure.storage.service';
import { StorageFactory } from '../storage/storage.factory';
import StorageModule from '../storage/storage.module';

@Module({
  controllers: [UploadController],
  providers: [PublisherService],
})
export class UploadsModule {}

import { StorageProvider } from './services/storage.interface';
import { AzureStorageProvider } from './services/azure/azure.storage.service';
import { Injectable } from '@nestjs/common';
import { STORAGE_TYPE } from './services/storage.config';
import { S3StorageProvider } from './services/aws/s3.storage.service';

@Injectable()
export class StorageFactory {
  public static getStorageProvider(): StorageProvider {
    switch (process.env.STORAGE_PROVIDER.toUpperCase()) {
      case STORAGE_TYPE.AWS:
        console.log('Creating S3 Storage provider');
        return new S3StorageProvider();
      case STORAGE_TYPE.AZURE:
        console.log('Creating Azure Storage provider');
        return new AzureStorageProvider();
      default:
        throw new Error(
          `No storage provider configured, or the provided storage type was invalid (must be one of: ${STORAGE_TYPE.AWS}, ${STORAGE_TYPE.AZURE}`,
        );
    }
  }
}

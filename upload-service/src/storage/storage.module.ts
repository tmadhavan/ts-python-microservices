import { Module, Provider, Global } from '@nestjs/common';
import { StorageFactory } from './storage.factory';
import { STORAGE_SERVICE } from './services/storage.config';

const storageProvider: Provider = {
  provide: STORAGE_SERVICE,
  useFactory: () => StorageFactory.getStorageProvider(),
  inject: [StorageFactory],
};

@Global()
@Module({
  controllers: [],
  providers: [storageProvider, StorageFactory],
  exports: [storageProvider],
})
export default class StorageModule {}

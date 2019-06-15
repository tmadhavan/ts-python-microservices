import { StorageProvider } from '../storage.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AzureStorageProvider implements StorageProvider {
  constructor() {
    // set up azure storage config
  }

  uploadFile() {
    console.log('uploading some stuff to azure...');
  }
}

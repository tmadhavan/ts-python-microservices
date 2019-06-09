import {Injectable} from '@nestjs/common';
import {CloudStorage} from '../storage.interface';
import {S3Storage} from '../aws/s3storage';

@Injectable()
export class CloudStorageService {

  storageProvider: CloudStorage;

  // Could be configurable with different CloudStorage implementations, but for now just use S3
  constructor() {
    this.storageProvider = new S3Storage();
  }

  // get AWS config from env/secrets file



}
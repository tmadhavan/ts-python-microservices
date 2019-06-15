import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Req,
  Res,
  Inject,
} from '@nestjs/common';
import { PublisherService } from '../../messaging/services/publisher.service';
import { STORAGE_SERVICE } from '../../storage/services/storage.config';
import { StorageProvider } from '../../storage/services/storage.interface';

@Controller('/upload')
export class UploadController {
  constructor(
    private readonly publisherService: PublisherService,
    @Inject(STORAGE_SERVICE) private readonly storageService: StorageProvider,
  ) {}

  @Post()
  uploadFile(@UploadedFile() file) {
    // upload file to cloud storage provider
    this.storageService.uploadFile(file);

    // publish FileDetailsDto message to rabbitmq
  }
}

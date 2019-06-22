import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Req,
  Res,
  Inject,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { PublisherService } from '../../messaging/services/publisher.service';
import { STORAGE_SERVICE } from '../../storage/services/storage.config';
import { StorageProvider } from '../../storage/services/storage.interface';
import { CloudTransferException } from '../exceptions/upload.exceptions';
import { FileDetailsDto } from '../dto/filedetails.dto';
import { Response, Request } from 'express';

@Controller('/upload')
export class UploadController {
  constructor(
    private readonly publisherService: PublisherService,
    @Inject(STORAGE_SERVICE) private readonly storageService: StorageProvider,
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  // TODO Only allow PDF files
  async uploadFile(@Req() request: Request, @Res() response: Response, @Body() body): Promise<void> {

    console.log(`${JSON.stringify(body)}`);

    // upload file to cloud storage provider
    try {
      const fileKey = await this.storageService.uploadFile(request);
      const fileDetails: FileDetailsDto = {
        fileId: fileKey,
        email: 'test',
      };
      this.publisherService.publishMessage(fileDetails);
      response.send('fileKey');
    } catch (err) {
      console.log(`'Error uploading file: ${err}'`);
      throw new CloudTransferException();
    }
    // publish FileDetailsDto message to rabbitmq
  }
}

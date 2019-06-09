import {Body, Controller, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import {PublisherService} from '../../messaging/services/publisher.service';
import {FileDetailsDto} from '../dto/filedetails.dto';
import {FileInterceptor} from '@nestjs/platform-express';

@Controller('/pdf')
export class UploadController {

  constructor(private readonly publisherService: PublisherService) { }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadPdfFile(@UploadedFile('file') uploadedFile) {
    // do  any necessary pre-processing

    // copy to S3

    // publish message with success/failure status of S3 copy
  }

}

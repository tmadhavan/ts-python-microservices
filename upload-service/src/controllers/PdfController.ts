import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {PublisherService} from '../messaging/PublisherService';
import {PdfDetailsDto} from '../model/PdfDetailsDto';

@Controller('/pdf')
export class PdfController {

  constructor(private readonly publisherService: PublisherService) { }

  @Post()
  publishMessage(@Body() fileDetails: PdfDetailsDto) {
    console.log(`Got some file details: ${JSON.stringify(fileDetails)}`);
    this.publisherService.publishMessage(fileDetails);
  }

  @Post(':username')
  publishMessageWithUsername(@Body() fileDetails: PdfDetailsDto, @Param() params) {
    console.log(`Got some file details: ${JSON.stringify(fileDetails)}, ${params.username}`);

    this.publisherService.publishMessage(fileDetails);

    // this will take a PDF
    // transfer to S3
    // publish a rabbitmq message with S3 file ID
  }
}

import {HttpException} from '@nestjs/common';

export class FileUploadException extends HttpException {
  constructor() {
    super('File upload failed', 500);
  }
}

export class CloudTransferException extends HttpException {
  constructor() {
    super('Transfer to cloud storage failed', 500);
  }
}
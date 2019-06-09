import {PublisherService} from '../messaging/services/publisher.service';
import {UploadController} from './controllers/upload.controller';
import {Module} from '@nestjs/common';

@Module({
  controllers: [UploadController],
  providers: [PublisherService],
})
export class UploadsModule {}
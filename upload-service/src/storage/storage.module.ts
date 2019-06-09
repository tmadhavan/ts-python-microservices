import {Module} from '@nestjs/common';
import {CloudStorageService} from './services/cloudstorage.service';

@Module({
  providers: [CloudStorageService],
  exports: [CloudStorageService]
})

export class MessagingModule {}
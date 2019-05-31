import {Injectable} from '@nestjs/common';
import {MessagePublisher} from './MessagePublisher';

@Injectable()
export class PublisherService {

  // hostname is the name of the docker compose service
  private readonly brokerUrl = 'amqp://rabbitmq:rabbitmq@rabbitmq-server:5672/';
  private exchangeName = 'pdf-processor-exchange';

  // routing key dependent on file upload status
  private readonly routingKey = 'pdf.upload.details';
  private readonly messagePublisher: MessagePublisher;

  constructor() {
    this.messagePublisher = new MessagePublisher(this.brokerUrl, this.exchangeName);
  }

  publishMessage(content: {}): void {
    this.messagePublisher.publishMessage(content, this.routingKey);
  }

}
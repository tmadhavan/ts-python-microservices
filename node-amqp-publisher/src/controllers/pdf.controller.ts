import * as Koa from 'koa';
import * as Router from 'koa-router';
import { MessagePublisher } from '../messaging/message_publisher';

const routerOptions: Router.IRouterOptions = {
  prefix: '/pdf',
};

// hostname is the name of the docker compose service
const brokerUrl = 'amqp://rabbitmq:rabbitmq@rabbitmq-server:5672/';
const exchangeName = 'pdf-processor-exchange';

// routing key dependent on file upload status
const routingKey = 'pdf.upload.details';

const router = new Router(routerOptions);
const messagePublisher = new MessagePublisher(brokerUrl, exchangeName);

enum status {
  SUCCESS,
  FAILURE
}

router.post('/', async (ctx: Koa.Context) => {

  // this can be a PDF upload... let's say it's gone to S3 and we have a file ID
  // get the file data, transfer it to S3, etc., then publish a message with the filename
  // and status

  // pretend we have a file upload status
  const filename = ctx.request.body.filename || null;

  // let's assume it was successful for now, and we got a file ID
  const fileId = 'some-s3-file-uuid';

  // publish a pdf upload message to rabbit mq, to be picked up by the subscriber service
  const fileDetails = { filename, fileId, status: status.SUCCESS};
  let publishStatus = true;
  try {
    messagePublisher.publishMessage(fileDetails, routingKey);
  } catch (err) {
    console.error(`Error publishing message: ${err}`);
    publishStatus = false;
  }

  ctx.body = { ...fileDetails, published: publishStatus };

});

export default router;

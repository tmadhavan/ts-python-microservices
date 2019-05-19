import * as amqp from 'amqplib';

export class MessageSubscriber {

  // TODO change these to environment vars? Or a configmap file?
  readonly mqExchange = 'userid-exchange';
  readonly routingKey = 'user.name.update';
  readonly qName = 'userq';

  // hostname is the name of the docker compose service
  readonly mqUrl = 'amqp://rabbitmq:rabbitmq@rabbitmq-server:5672/';
  mqChannel: amqp.Channel = null;
  mqConn: amqp.Connection = null;

  constructor() {

  }

  /**
   * Attempt to connect to the AMQP provider and create a channel
   */
  private async connect(): Promise<void> {

    if (this.mqConn == null) {
      console.log('Looks like we aren\'t connected. Connecting...');
      this.mqConn = await amqp.connect(this.mqUrl);
      console.log('Connected.');
    }

    if (this.mqChannel == null) {
      console.log('No channel available. Creating...');

      this.mqChannel = await this.mqConn.createChannel();
      await this.mqChannel.assertExchange(this.mqExchange, 'direct');
      console.log('Channel created.');

      this.mqChannel.on('error', (err) => {
        console.error(`Got an error from the MQ channel: ${err}`);
      });

      this.mqChannel.on('close', () => {
        console.log('MQ channel closed');
        this.mqConn = null;
      });
    }
  }

  /**
   * Subscribe to a message queue and start processing messages
   */
  public async start(): Promise<void> {
    console.log('Subscriber starting...');
    if (this.mqConn == null || this.mqChannel == null) {
      await this.connect();
      await this.mqChannel.assertQueue(this.qName, { durable: true });
      await this.mqChannel.bindQueue(this.qName, this.mqExchange, 'user.name.update');
    }

    try {
      // start waiting for messages
      this.mqChannel.consume(this.qName, msg => this.processMessage(msg), { noAck: true });
    } catch (err) {
      console.error(`Starting subscriber failed with error: ${err}`);
    }

    console.log('Subscriber started.');
  }

  private processMessage(msg: amqp.ConsumeMessage) {
    console.log(`Received message: ${msg.content.toString()}`);
  }

}

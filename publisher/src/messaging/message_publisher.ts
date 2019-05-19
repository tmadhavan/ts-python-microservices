import * as amqp from 'amqplib';

export class MessagePublisher {

  // TODO change these to environment vars? Or a configmap file?
  readonly mqExchange = 'userid-exchange';
  readonly routingKey = 'user.name.update';

  // hostname is the name of the docker compose service
  readonly mqUrl = 'amqp://rabbitmq:rabbitmq@rabbitmq-server:5672/';
  mqChannel: amqp.Channel = null;
  mqConn: amqp.Connection = null;

  private async connect(): Promise<void> {

    if (this.mqConn == null) {
      console.log('Looks like we aren\'t connected. Connecting...');
      this.mqConn = await amqp.connect(this.mqUrl);
      console.log('Connected to AMQP provider.');
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

  async publishMessage(content: {}): Promise<void> {

    if (this.mqConn == null || this.mqChannel == null) {
      await this.connect();
    }

    console.log(`Publishing message. Exchange: [${this.mqExchange}], routing key: [${this.routingKey}],
                  content: [${JSON.stringify(content)}]`);

    try {
      this.mqChannel.publish(this.mqExchange, this.routingKey, Buffer.from(JSON.stringify(content)));
    } catch (err) {
      console.error(`Error publishing message: ${err}`);
      this.mqConn.close();
    }


  }

}

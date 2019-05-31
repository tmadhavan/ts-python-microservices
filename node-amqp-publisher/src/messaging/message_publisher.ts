import * as amqp from 'amqplib';

export class MessagePublisher {

  exchangeName: string;
  messageBrokerUrl: string;
  channel: amqp.Channel = null;
  connection: amqp.Connection = null;

  constructor(url: string, exchangeName: string) {
    this.exchangeName = exchangeName;
    this.messageBrokerUrl = url;
  }

  private async connect(): Promise<void> {
    if (this.connection == null) {
      console.log('Looks like we aren\'t connected. Connecting...');
      this.connection = await amqp.connect(this.messageBrokerUrl);
      console.log('Connected to message broker.');
    }

    if (this.channel == null) {
      console.log('No channel available. Creating...');

      this.channel = await this.connection.createChannel();
      await this.channel.assertExchange(this.exchangeName, 'direct');
      console.log('Channel created.');

      this.channel.on('error', (err) => {
        console.error(`Got an error from the MQ channel: ${err}`);
      });

      this.channel.on('close', async () => {
        console.log('Channel closed; closing connection');
        await this.connection.close();
        this.connection = null;
      });
    }
  }

  async publishMessage(content: {}, routingKey: string, exchangeName = this.exchangeName): Promise<void> {

    if (this.connection == null || this.channel == null) {
      try {
        await this.connect();
      } catch (err) {
        console.error(`Failed to connect to message broker. Error was: ${err}`);
        return;
      }
    }

    console.log(`Publishing message. Exchange: [${exchangeName}], routing key: [${routingKey}],
                  content: [${JSON.stringify(content)}]`);

    try {
      this.channel.publish(exchangeName, routingKey, Buffer.from(JSON.stringify(content)));
    } catch (err) {
      console.error(`Error publishing message: ${err}`);
      await this.connection.close();
      this.connection = null;
    }
  }

}

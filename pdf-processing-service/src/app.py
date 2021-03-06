from queue import Queue

from messaging.pika.message_publisher import Publisher
from messaging.pika.publisher_thread import PublisherThread
from messaging.pika.message_subscriber import Subscriber

# RabbitMQ config
mq_url = "amqp://rabbitmq:rabbitmq@rabbitmq-server:5672/"
mq_exchange = "pdf-processor-exchange"
subscriber_routing_key = "pdf.upload.details"
subscriber_queue_name = "pdf-upload-queue"
publisher_routing_key = "pdf.email.details"


def main():

    # Queue for the subscriber thread and processor thread to communicate
    processing_queue = Queue()

    # Queue for the processor thread and publisher thread to communicate
    publishing_queue = Queue()

    print("Starting consumer thread...")
    consumer = Subscriber(mq_url, subscriber_queue_name, mq_exchange, subscriber_routing_key, processing_queue)
    consumer.start()

    print("Starting publisher thread...")
    publisher = Publisher(mq_url, mq_exchange)
    publisher_thread = PublisherThread(publishing_queue, publisher, publisher_routing_key)
    publisher_thread.start()

    print("Starting processing thread...")
    processor = Processor(processing_queue, publishing_queue)


if __name__ == "__main__":
    # For now, just exit if there are any connection issues
    # noinspection PyBroadException
    try:
        main()
    except:
        print('Error starting PDF processing service')


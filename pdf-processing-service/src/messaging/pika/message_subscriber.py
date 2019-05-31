import queue
import threading
import json

import pika
import functools
import time

class Subscriber(threading.Thread):
    """
    Listens for messages on a rabbitMQ exchange, processes them, and adds a new message to a Python queue. The queue
    is used to communicate with another publisher thread, which in turn publishes messages to rabbitMQ
    """

    def __init__(self, url: str, broker_queue_name: str, exchange_name: str, routing_key: str,
                 publisher_queue: queue.Queue = None):
        """

        :param url: The AMQP url to connect to (rabbitmq)
        :param broker_queue_name: The name of the rabbitMQ queue to consume from
        :param exchange_name: The name of the rabbitMQ exchange to use
        :param routing_key: The routing key to which to bind the rabbitMQ queue (i.e. subscribe to)
        :param publisher_queue: A (Python) queue to which messages are added in order to be published by another
               publisher thread
        """
        super().__init__()
        self._url = url
        self._queue_name = broker_queue_name
        self._exchange_name = exchange_name
        self._routing_key = routing_key
        self._publisher_queue = publisher_queue

    def on_message(self, chan, method_frame, _header_frame, body):
        print(f"Received message data: {body}")

        # Get the file id, do our 'processing', then send off a new message
        time.sleep(3)

        # Pretend we have the file, put it on S3 or whatever
        filename = json.loads(body)['filename']
        s3_file_id = 'the-processed-s3-id'
        email = 'test@email.com'

        if self._publisher_queue is not None:
            msg = json.dumps({
                'filename': filename,
                'fileId': s3_file_id,
                'email': email
            })
            print(f"Adding message to publisher queue: {msg}")
            self._publisher_queue.put(msg)

    def run(self) -> None:
        self.start_consuming()

    def start_consuming(self):
        print("Subscriber starting to consume messages")
        parameters = pika.URLParameters(self._url)
        connection = pika.BlockingConnection(parameters)

        channel = connection.channel()
        channel.exchange_declare(
            exchange=self._exchange_name,
            exchange_type="direct",
            passive=False,
            durable=True,
            auto_delete=False
        )

        channel.queue_declare(queue=self._queue_name, auto_delete=True)
        channel.queue_bind(queue=self._queue_name, exchange=self._exchange_name, routing_key=self._routing_key)
        channel.basic_qos(prefetch_count=1)

        # Use functools to create a callable function object that we can pass parameters
        on_message_callback = functools.partial(self.on_message)

        # Without a partial function that takes parameters, we could just pass in
        # on_message_callback = on_message
        channel.basic_consume(self._queue_name, on_message_callback, auto_ack=True)

        channel.start_consuming()


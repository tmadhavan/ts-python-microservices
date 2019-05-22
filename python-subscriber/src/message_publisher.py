import time

import pika
import json

# A basic, synchronous rabbitmq publisher

mqUrl = "amqp://rabbitmq:rabbitmq@rabbitmq-server:5672/"
mqExchange = "userid-exchange"
mqRoutingkey = "user.update.complete"
qName = "user-update-completed-queue"


def publish_message(content):

    # Create a new connection (this should ideally be stored for later use, but this is the simplest way to get things
    # working for now
    connection_params = pika.URLParameters(mqUrl)
    connection = pika.BlockingConnection(connection_params)

    channel = connection.channel()

    channel.exchange_declare(
        exchange=mqExchange,
        exchange_type="direct",
        durable=True,
        passive=False,
        auto_delete=False
    )

    print(f"Sending message [{content}] to exchange")
    channel.basic_publish(exchange=mqExchange,
                          routing_key=mqRoutingkey,
                          body=content)

    connection.close()


def publish_message_test():
    print("Starting to publish messages...")
    while True:
        print("Publishing message...")
        publish_message("Python message")
        time.sleep(4)

import pika
import functools
import time

# Basic subscriber

mqUrl = "amqp://rabbitmq:rabbitmq@rabbitmq-server:5672/"
mq_exchange = "userid-exchange"
mq_routing_key = "user.update.complete"
q_name = "user-update-completed-queue"


# see: https://github.com/pika/pika/blob/master/examples/consume.py
def on_message(chan, method_frame, _header_frame, body, userdata=None):
    print(f"Received message: Userdata: {userdata}, data: {body}")


def start_consuming():
    print("Subscriber starting to consume messages")
    parameters = pika.URLParameters(mqUrl)
    connection = pika.BlockingConnection(parameters)

    channel = connection.channel()
    channel.exchange_declare(
        exchange=mq_exchange,
        exchange_type="direct",
        passive=False,
        durable=True,
        auto_delete=False
    )

    channel.queue_declare(queue=q_name, auto_delete=True)
    channel.queue_bind(queue=q_name, exchange=mq_exchange, routing_key=mq_routing_key)
    channel.basic_qos(prefetch_count=1)

    # Use functools to create a callable function object that we can pass parameters
    on_message_callback = functools.partial(
        on_message, userdata='on_message_userdata'
    )

    # Without a partial function that takes parameters, we could just pass in
    # on_message_callback = on_message
    channel.basic_consume(q_name, on_message_callback, auto_ack=True)

    channel.start_consuming()


def start_consuming_test():

    while True:
        print("Consuming...")
        time.sleep(3)



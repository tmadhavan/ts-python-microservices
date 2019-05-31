import threading
from queue import Queue
from messaging.pika.message_publisher import Publisher


class PublisherThread(threading.Thread):

    def __init__(self, msg_queue: Queue, publisher: Publisher, routing_key: str):
        super().__init__()
        self._publisher = publisher
        self._routing_key = routing_key
        self._msg_queue = msg_queue

    def run(self) -> None:
        self.listen_for_publish_messages()

    def listen_for_publish_messages(self):
        # watch the publish queue for new messages that need to be published
        while True:
            msg = self._msg_queue.get()
            print("PublisherThread got message from internal queue. Publishing")
            self._publisher.publish_message(msg, self._routing_key)
            self._msg_queue.task_done()
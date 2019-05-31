import pika

class Publisher:

    def __init__(self, url: str, exchange_name: str):
        self._url = url
        self._connection = None
        self._channel = None
        self._exchange_name = exchange_name

        self.open_connection()

    def open_connection(self) -> None:
        if self._connection is None:
            connection_params = pika.URLParameters(self._url)
            self._connection = pika.BlockingConnection(connection_params)
            self._channel = self._connection.channel()

            # Make sure the Exchange exists; create it if not
            self._channel.exchange_declare(
                exchange=self._exchange_name,
                exchange_type="direct",
                durable=True,
                passive=False,
                auto_delete=False
            )

    def publish_message(self, content, routing_key):
        print(f"Sending message [{content}] to exchange")
        self._channel.basic_publish(exchange=self._exchange_name,
                                    routing_key=routing_key,
                                    body=content)

    def close_connection(self):
        if self._connection is not None:
            self._connection.close()
            self._connection = None
            self._channel = None

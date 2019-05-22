import pika
import json

class MessageSubscriber:

    def __init__(self):
        self.mqUrl = ""
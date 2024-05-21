from django.urls import path
from channels.generic.websocket import JsonWebsocketConsumer


class Consumer(JsonWebsocketConsumer):

    def __init__(self, *args, **kwargs):
        super().__init__(args, kwargs)
        self.user = None

    def connect(self):
        self.accept()
        self.send_json(
            {
                "type": "hello_message",
                "message": "Hello World!",
            }
        )


websocket_urlpatterns = [
    path("", Consumer.as_asgi()),
]

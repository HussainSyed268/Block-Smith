from django.urls import path
# from .blocksmith import consumers
from . import consumers

websocket_urlpatterns = [
    path('ws/central-server/', consumers.CentralServerConsumer.as_asgi()),
]

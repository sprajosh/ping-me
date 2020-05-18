import json
from django.contrib.auth import get_user_model
from chat.models import Message
from channels.generic.websocket import AsyncWebsocketConsumer
from .views import last_10_messages, get_user_contact, get_current_chat
from channels.db import database_sync_to_async

User = get_user_model()


class ChatConsumer(AsyncWebsocketConsumer):

    async def fetch_messages(self, data):
        messages = await last_10_messages(data['from'])
        content = {
            'command': 'messages',
            'messages': self.messages_to_json(messages)
        }
        self.send_message(content)

    async def new_message(self, data):
        user_contact = await get_user_contact(data['from'])
        message = Message.objects.create(
            contact=user_contact,
            content=data['message'])
        current_chat = await get_current_chat(data['chatId'])
        current_chat.messages.add(message)
        current_chat.save()
        content = {
            'command': 'new_message',
            'message': self.message_to_json(message)
        }
        return self.send_chat_message(content)

    commands = {
        'fetch_messages': fetch_messages,
        'new_message': new_message
    }

    def messages_to_json(self, messages):
        result = []
        for message in messages:
            result.append(self.message_to_json(message))
        return result

    def message_to_json(self, message):
        return {
            'id': message.id,
            'author': message.contact.user.username,
            'content': message.content,
            'timestamp': str(message.timestamp)
        }

    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f'chat_{self.room_name}' 

        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    async def receive(self, text_data):
        data = json.loads(text_data)
        print(f"GOT DATA: {data}")
        await self.commands[data['command']](self, data)

    # Receive message from room group
    async def chat_message(self, event):
        message = event['message']
        await self.send(text_data=json.dumps(message))

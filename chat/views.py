from django.shortcuts import render, get_object_or_404
from django.contrib.auth import get_user_model
from .models import Message, ChatRoom
from channels.db import database_sync_to_async


User = get_user_model()


def index(request):
    return render(request, 'chat/index.html')


def room(request, room_name):
    return render(request, 'chat/room.html', {
        'room_name': room_name
    })


@database_sync_to_async
def last_10_messages(chatId):
    chat = get_object_or_404(ChatRoom, id=chatId)
    return chat.messages.order_by('-timestamp').all()[:10]

@database_sync_to_async
def get_current_chat(chatId):
    return get_object_or_404(ChatRoom, id=chatId)


@database_sync_to_async
def get_user_contact(username):
    user = get_object_or_404(User, username=username)
    return get_object_or_404(Contact, user=user)

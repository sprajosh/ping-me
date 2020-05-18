from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from .models import Message, ChatRoom, Contact
from channels.db import database_sync_to_async
from django.http import JsonResponse

User = get_user_model()


def get_conversations(request):
    user_id = request.GET.get('userId')
    chat_rooms = ChatRoom.objects.filter(participants__in=Contact.objects.filter(id=user_id))
    chats = []

    for chat in chat_rooms:
        msg_ids = ChatRoom.objects.filter(id=chat.id).values_list('messages', flat=True)
        try:
            text = Message.objects.filter(id__in=msg_ids).order_by('-timestamp').first().content
        except AttributeError:
            text = ''
        conversation = {
            'id': chat.id,
            'name': chat.room,
            'text': text,
        }
        chats.append(conversation)

    return JsonResponse({'messages': chats}, status=200)


def get_messages(request):
    chat_id = request.GET.get('chatRoom')
    last_10_messages(chat_id)


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

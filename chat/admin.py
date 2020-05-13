from django.contrib import admin

from .models import Contact, ChatRoom, Message

admin.site.register(ChatRoom)
admin.site.register(Contact)
admin.site.register(Message)

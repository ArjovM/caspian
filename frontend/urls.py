from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('notifications', index),
    path('ebooks', index),
    path('reportpage', index)
    
]



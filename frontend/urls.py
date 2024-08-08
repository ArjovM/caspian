from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('notifications', index),
    path('bookresources', index),
    path('reportpage', index),
    path('profile', index),
    path('login', index),
    path('register', index),
    path('science/grade', index),
    path('management/grade', index),
    path('11/subjects', index),
    path('12/subjects', index)
]



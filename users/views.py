from django.shortcuts import render
from.models import User
from rest_framework import generics
from .serializers import UserSerializer
from .models import Subject
from .serializers import SubjectSerializer
from .models import Physics
from .serializers import PhysicsSerializer
from .models import Notifications
from .serializers import NotificationSerializer
from .models import Books
from .serializers import BooksSerializer
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user:
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key})
        return Response({'error': 'Invalid Credentials'}, status=400)


class NotificationList(generics.ListCreateAPIView):
    queryset = Notifications.objects.all()
    serializer_class = NotificationSerializer

class PhysicsList(generics.ListCreateAPIView):
    queryset = Physics.objects.all()    
    serializer_class = PhysicsSerializer

class PhysicsDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Physics.objects.all()
    serializer_class = PhysicsSerializer


class SubjectList(generics.ListCreateAPIView):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer

class SubjectDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer

# def index(request):

#     User = User.objects.all()

#     return render(request, "index.html",{'User': User})

class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class BooksList(generics.ListCreateAPIView):
    queryset = Books.objects.all()
    serializer_class = BooksSerializer


class BooksDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Books.objects.all()
    serializer_class = BooksSerializer


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
from .models import BookResources
from .serializers import BookResourcesSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSerializer, LoginSerializer
from django.contrib.auth import login

class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data
            login(request, user)
            return Response({"message": "Logged in successfully"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



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

class BookResourcesList(generics.ListCreateAPIView):
    queryset = BookResources.objects.all()
    serializer_class = BookResourcesSerializer

class BookResourcesDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = BookResources.objects.all()
    serializer_class = BookResourcesSerializer


from django.shortcuts import render
from.models import Admin, Student, Teacher, CustomUser
from rest_framework import generics
from .models import Subject
from .serializers import SubjectSerializer
from .models import StudyResource
from .serializers import StudyResourceSerializer
from .models import Notifications
from .serializers import NotificationSerializer
from .models import BookResources
from .serializers import BookResourcesSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import login
from django.contrib.auth.decorators import login_required
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
import logging

logger = logging.getLogger(__name__)


@ensure_csrf_cookie
def get_csrf_token(request):
    return JsonResponse({'token': request.COOKIES['csrftoken']})


class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate( username=username, password=password)

        if user is not None:
            login(request, user)
            print(user.first_name, user.user_type)
            refresh = RefreshToken.for_user(user)
            return Response({
                'user':{
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,
                    'first_name': user.first_name,
                    'last_name': user.last_name,
                    'user_type': user.user_type,
                },
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            })
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)
    


class RegisterView(APIView): 
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        email = request.data.get('email')
        first_name = request.data.get('first_name')
        last_name = request.data.get('last_name')
        user_type = request.data.get('user_type')

        try:
            user = CustomUser.objects.create_user(
                username=username,
                password=password,
                email=email,
                first_name=first_name,
                last_name=last_name,
                user_type=user_type
            )
            user.save()

            if(user_type == '2'):
                teacher = Teacher.objects.create(name=username, email=email, teacher_id=user.id)
                teacher.save()

            if(user_type == '3'):
                student = Student.objects.create(name=username, email=email, student_id=user.id)
                student.save()


            return Response({'message': 'User registered successfully.'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            print(f"Error during registration: {e}")
            return Response({'error': 'Something went wrong during registration.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class NotificationView(APIView):
    def post(self, request):
        description = request.data.get('Description')
        notifier = request.data.get('Notifier')
        role = request.data.get('Role')

        try:
            notice = Notifications.objects.create(
                Description = description,
                Notifier = notifier,
                Role = role
            )

            notice.save()

            return Response({'message': 'Notice has been posted.'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            print(f"Error during registration: {e}")
            return Response({'error': 'Something went wrong during posting notice.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class BookResourcesView(APIView):
    def post(self, request):
        title = request.data.get('title')
        author = request.data.get('author')
        file = request.data.get('file')
        teacherName = request.data.get('teacherName')
        try:
            ebook = BookResources.objects.create(
                title = title,
                author = author,
                file = file,
                teacherName = teacherName
            )

            ebook.save()

            return Response({'message': 'Ebook has been added.'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            print(f"Error during registration: {e}")
            return Response({'error': 'Something went wrong during adding the ebook.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class StudyResourceView(APIView):
    def post(self, request):
        resourceInfo = request.data.get('resourceInfo')
        subjectID = request.data.get('subjectID')
        resource = request.data.get('resource')
        
        subject_item = Subject.objects.get(SubjectID=subjectID)

        try:
            resource = StudyResource.objects.create(
                resourceInfo = resourceInfo,
                subjectID = subject_item,
                resource = resource
            )
            resource.save()

            return Response({'message': 'Notice has been posted.'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            print(f"Error during registration: {e}")
            return Response({'error': 'Something went wrong during posting notice.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ProtectedView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({'message': 'This is a protected view accessible only to authenticated users.'})


class NotificationList(generics.ListCreateAPIView):
    queryset = Notifications.objects.all()
    serializer_class = NotificationSerializer

class StudyResourceList(generics.ListCreateAPIView):
    queryset = StudyResource.objects.all()    
    serializer_class = StudyResourceSerializer

class StudyResourceDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = StudyResource.objects.all()
    serializer_class = StudyResourceSerializer

class SubjectList(generics.ListCreateAPIView):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer

class SubjectDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer

class BookResourcesList(generics.ListCreateAPIView):
    queryset = BookResources.objects.all()
    serializer_class = BookResourcesSerializer

class BookResourcesDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = BookResources.objects.all()
    serializer_class = BookResourcesSerializer


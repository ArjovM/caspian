from django.shortcuts import render
from.models import Admin, Student, Teacher, CustomUser
from rest_framework import generics
from .serializers import UserSerializer
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
from .serializers import UserSerializer
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



# class RegisterView(APIView):
#     def post(self, request):
#         serializer = UserSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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
    

    

# class RegisterView(APIView):
#     def post(self, request):
#         username = request.data.get('username')
#         email = request.data.get('email')
#         password = request.data.get('password')
#         first_name = request.data.get('first_name')
#         last_name = request.data.get('last_name')
#         user_type = request.data.get('user_type')

#         try:
#             user = CustomUser.objects.create(
#                 username=username,
#                 email=email,
#                 first_name=first_name,
#                 last_name=last_name,
#                 user_type=user_type
#             )
#             user.set_password(password)  # Securely set the user's password
#             user.save()

#             # If you have a related model based on user_type
#             if user_type == '2':  # Assuming '2' is for Teacher
#                 Teacher.objects.create_(teacher=user, name=username, email=email)
#             elif user_type == '3':  # Assuming '3' is for Student
#                 Student.objects.create(student=user, name=username, email=email)
#             elif user_type == '1':  # Assuming '1' is for Admin
#                 Admin.objects.create(admin=user, name=username, email=email)

#             return JsonResponse({'message': 'User registered successfully'}, status=201)
#         except Exception as e:
#             logger.error(f"Error during registration: {str(e)}")
#             return JsonResponse({'error': 'Something went wrong during registration.'}, status=500)


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

            print("regis------3_________________")           

            return Response({'message': 'User registered successfully.'}, status=status.HTTP_201_CREATED)
        except Exception as e:
            # Log the exception (you can log to a file, console, or monitoring system)
            print(f"Error during registration: {e}")
            return Response({'error': 'Something went wrong during registration.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



# class RegisterView(APIView):
#     def post(self, request):
#         username = request.data.get('username')
#         password = request.data.get('password')
#         email = request.data.get('email')
#         first_name = request.data.get('first_name')
#         last_name = request.data.get('last_name')
#         user_type = request.data.get('user_type')
#         user = CustomUser.objects.create(username=username, password=password, email=email, first_name=first_name, last_name=last_name, user_type=user_type)
#         user.teacher.name = username
#         user.teacher.email = email

#         user.save()

#         return Response({'message': 'User registered successfully.'})
#         # if user is not None:
#         #     refresh = RefreshToken.for_user(user)
#         #     return Response({
#         #         'refresh': str(refresh),
#         #         'access': str(refresh.access_token),
#         #     })
#         # return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

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

# def index(request):

#     User = User.objects.all()

#     return render(request, "index.html",{'User': User})

# class UserList(generics.ListAPIView):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer

# class UserDetail(generics.RetrieveAPIView):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer

class BookResourcesList(generics.ListCreateAPIView):
    queryset = BookResources.objects.all()
    serializer_class = BookResourcesSerializer

class BookResourcesDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = BookResources.objects.all()
    serializer_class = BookResourcesSerializer


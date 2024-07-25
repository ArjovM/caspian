from .models import User
from rest_framework import serializers
from .models import Subject
from .models import StudyResource
from .models import Notifications
from .models import BookResources
from django.contrib.auth import authenticate

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'role')

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            role=validated_data.get('role', 'user')
        )
        return user

# class LoginSerializer(serializers.Serializer):
#     username = serializers.CharField()
#     password = serializers.CharField()

#     def validate(self, data):
#         user = authenticate(**data)
#         if user and user.is_active:
#             return user
#         raise serializers.ValidationError("Invalid credentials")

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notifications
        fields = ['NotificationID', 'Description', 'TeacherID']

class StudyResourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudyResource
        fields = ['studyResourceId', 'resourceInfo', 'resource', 'subjectID']

class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = '__all__'

class BookResourcesSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookResources
        fields = ['ebooksID', 'title', 'author', 'file', 'teacherName']



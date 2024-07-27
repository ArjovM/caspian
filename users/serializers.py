from .models import User
from rest_framework import serializers
from .models import Subject
from .models import StudyResource
from .models import Notifications
from .models import BookResources

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



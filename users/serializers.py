from .models import User
from rest_framework import serializers
from .models import Subject
from .models import Physics
from .models import Notifications
from .models import BookResources

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notifications
        fields = ['NotificationID', 'Description', 'TeacherID']

class PhysicsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Physics
        fields = ['PhysicsID', 'Description', 'File', 'SubjectID']

class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['UserID', 'Username', 'Role', 'Password']

class BookResourcesSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookResources
        fields = ['ebooksID', 'title', 'author', 'file', 'teacherName']



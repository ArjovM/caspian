from .models import User
from rest_framework import serializers
from .models import Subject
from .models import Physics
from .models import Notifications
from .models import Books

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

class BooksSerializer(serializers.ModelSerializer):
    class Meta:
        model = Books
        fields = ['booksID', 'authors', 'file', 'teacherName']



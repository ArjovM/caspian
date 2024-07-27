from rest_framework import serializers
from .models import Subject
from .models import StudyResource
from .models import Notifications
from .models import BookResources


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



from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save
from django.dispatch import receiver

class CustomUser(AbstractUser):
    user_type_data=((1, "Admin"),(2,"Teacher"),(3,"Student"))
    user_type= models.CharField(default=1, choices=user_type_data, max_length=20)

class User(models.Model):
    UserID = models.AutoField(primary_key=True)
    Username = models.CharField(max_length=50, unique=True)
    Password = models.CharField(max_length=50)
    Role = models.CharField(max_length=10)

class Admin(models.Model):
    id = models.AutoField(primary_key=True)
    admin = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    name = models.CharField(max_length=100, unique=True)
    email = models.EmailField(max_length=100, unique=True)
    password = models.CharField(max_length=50)  

class Grade(models.Model):
    id = models.AutoField(primary_key=True)
    grade = models.CharField(max_length=100)

class Term(models.Model):
    id = models.AutoField(primary_key=True)
    Term = models.CharField(max_length=100)

class Course(models.Model):
    id = models.AutoField(primary_key=True)
    course_name = models.CharField(max_length=255)

class Student(models.Model):
    id = models.AutoField(primary_key=True)
    student = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    name = models.CharField(max_length=100, unique=True)
    email = models.EmailField(max_length=100, unique=True)
    password = models.CharField(max_length=50)
    grade = models.ForeignKey(Grade, on_delete=models.CASCADE, default=1)   
    course = models.ForeignKey(Course, on_delete=models.CASCADE, default=1)

class Teacher(models.Model):
    id = models.AutoField(primary_key=True)
    teacher = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    name = models.CharField(max_length=100, unique=True)
    email = models.EmailField(max_length=100, unique=True)
    password = models.CharField(max_length=50)
    course = models.ForeignKey(Course, on_delete=models.CASCADE, default=1)

class Classes(models.Model):
    ClassID = models.AutoField(primary_key=True)
    ClassName = models.CharField(max_length=100, unique=True)
    ClassTeacherID = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    ClassStudentID = models.ForeignKey(Student, on_delete=models.CASCADE)

class Subject(models.Model):
    SubjectID = models.AutoField(primary_key=True)
    SubjectName = models.CharField(max_length=100, unique=True)
    grade = models.ForeignKey(Grade, on_delete=models.CASCADE, default=1)   
    course = models.ForeignKey(Course, on_delete=models.CASCADE, default=1)

class StudyResource(models.Model):
    studyResourceId = models.AutoField(primary_key=True)
    subjectID = models.ForeignKey(Subject, on_delete=models.CASCADE)
    resourceInfo = models.CharField(max_length=255)
    resource = models.FileField(upload_to='course_resources/')

class Notifications(models.Model):
    NotificationID = models.AutoField(primary_key=True)
    Description = models.TextField()
    Notifier = models.CharField(default="admin", max_length=255)
    Role= models.CharField(default=1, max_length=20)

class BookResources(models.Model):
    ebooksID = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    file = models.FileField(upload_to='files/')
    teacherName = models.CharField(max_length=255)

class ReportCard(models.Model):
    report_id = models.AutoField(primary_key=True)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    grade = models.ForeignKey(Grade, on_delete=models.CASCADE, default=1)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, default=1)
    term = models.ForeignKey(Term, on_delete=models.CASCADE, default=1)
    marks = models.IntegerField(default=0)

@receiver(post_save,sender=CustomUser)
def create_user_profile(sender,instance,created,**kwargs):
    if created:
        if instance.user_type==1:
            Admin.objects.create(admin=instance)
        if instance.user_type==2:
            Teacher.objects.create(teacher=instance)
        if instance.user_type==3:
            Student.objects.create(student=instance)

@receiver(post_save,sender=CustomUser)
def save_user_profile(sender,instance,**kwargs):
    if instance.user_type==1:
        instance.admin.save()
    if instance.user_type==2:
        instance.teacher.save()
    if instance.user_type==3:
        instance.student.save()

    
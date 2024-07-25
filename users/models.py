from django.db import models

class User(models.Model):
    UserID = models.AutoField(primary_key=True)
    Username = models.CharField(max_length=50, unique=True)
    Password = models.CharField(max_length=50)
    Role = models.CharField(max_length=10)

class Teacher(models.Model):
    TeacherID = models.AutoField(primary_key=True)
    UserID = models.ForeignKey(User, on_delete=models.CASCADE)
    TeacherName = models.CharField(max_length=100, unique=True)
    TeacherEmail = models.EmailField(max_length=100, unique=True)
    TeacherPassword = models.CharField(max_length=50)

class Student(models.Model):
    StudentID = models.AutoField(primary_key=True)
    UserID = models.ForeignKey(User, on_delete=models.CASCADE)
    StudentName = models.CharField(max_length=100, unique=True)
    StudentEmail = models.EmailField(max_length=100, unique=True)
    StudentPassword = models.CharField(max_length=50)

class Classes(models.Model):
    ClassID = models.AutoField(primary_key=True)
    ClassName = models.CharField(max_length=100, unique=True)
    ClassTeacherID = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    ClassStudentID = models.ForeignKey(Student, on_delete=models.CASCADE)

class Grade(models.Model):
    GradeID = models.AutoField(primary_key=True)
    GradeValue = models.CharField(max_length=100)
    Description = models.CharField(max_length=100)

class Enrollment(models.Model):
    EnrollmentID = models.AutoField(primary_key=True)
    ClassID = models.ForeignKey(Classes, on_delete=models.CASCADE)
    StudentID = models.ForeignKey(Student, on_delete=models.CASCADE)
    GradeID = models.ForeignKey(Grade, on_delete=models.CASCADE)
    EnrollmentDate = models.DateField()

class Subject(models.Model):
    SubjectID = models.AutoField(primary_key=True)
    SubjectName = models.CharField(max_length=100, unique=True)
    GradeID = models.ForeignKey(Grade, on_delete=models.CASCADE)

class StudyResource(models.Model):
    studyResourceId = models.AutoField(primary_key=True)
    subjectID = models.ForeignKey(Subject, on_delete=models.CASCADE)
    resourceInfo = models.CharField(max_length=255)
    resource = models.FileField(upload_to='course_resources/')

class Notifications(models.Model):
    NotificationID = models.AutoField(primary_key=True)
    Description = models.TextField()
    TeacherID = models.ForeignKey(Teacher, on_delete=models.CASCADE)

class BookResources(models.Model):
    ebooksID = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    file = models.FileField(upload_to='files/')
    teacherName = models.CharField(max_length=255)



    
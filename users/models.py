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

class Physics(models.Model):
    PhysicsID = models.AutoField(primary_key=True)
    SubjectID = models.ForeignKey(Subject, on_delete=models.CASCADE)
    Description = models.CharField(max_length=100)
    File = models.FileField(upload_to='physics/')

class Notifications(models.Model):
    NotificationID = models.AutoField(primary_key=True)
    Description = models.TextField()
    TeacherID = models.ForeignKey(Teacher, on_delete=models.CASCADE)

class Books(models.Model):
    booksID = models.AutoField(primary_key=True)
    author = models.CharField(max_length=255)
    file = models.FileField(upload_to='files/')
    teacherName = models.CharField(max_length=255)



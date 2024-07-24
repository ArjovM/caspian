from django.contrib import admin
from .models import User, Teacher, Student, Classes, Grade, Enrollment, Subject, Physics, Notifications, BookResources

# Register your models here.

admin.site.register(User)
admin.site.register(Teacher)
admin.site.register(Student)
admin.site.register(Classes)
admin.site.register(Grade)
admin.site.register(Enrollment)
admin.site.register(Subject)
admin.site.register(Physics)
admin.site.register(Notifications)
admin.site.register(BookResources)
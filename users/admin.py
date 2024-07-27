from django.contrib import admin
from .models import Teacher, Student, Classes, Grade, Enrollment, Subject, Notifications, Admin, BookResources, StudyResource

# Register your models here.

admin.site.register(Teacher)
admin.site.register(Student)
admin.site.register(Admin)
admin.site.register(Classes)
admin.site.register(Grade)
admin.site.register(Enrollment)
admin.site.register(Subject)
admin.site.register(StudyResource)
admin.site.register(Notifications)
admin.site.register(BookResources)
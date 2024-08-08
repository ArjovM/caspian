from django.contrib import admin
from .models import Teacher, Student, Classes, Subject, Admin, BookResources, StudyResource, Notifications, Course, Grade
from .models import ReportCard, Term
# Register your models here.

admin.site.register(Teacher)
admin.site.register(Student)
admin.site.register(Admin)
admin.site.register(Classes)
admin.site.register(Grade)
admin.site.register(Subject)
admin.site.register(StudyResource)
admin.site.register(Notifications)
admin.site.register(BookResources)
admin.site.register(Course)
admin.site.register(ReportCard)
admin.site.register(Term)
from django.urls import path
from .views import SubjectList, SubjectDetail
from .views import StudyResourceList, StudyResourceDetail, StudyResourceView
from django.urls import path
from .views import NotificationList,  NotificationView
from .views import BookResourcesList, BookResourcesDetail, BookResourcesView
from .views import LoginView, RegisterView

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('register/', RegisterView.as_view(), name='register'),
    path('anotifications/', NotificationList.as_view(), name='notification-list'),
    path('anotifications/<int:pk>/', NotificationList.as_view(), name='notification-detail'),
    path('addnotification', NotificationView.as_view(), name='notification-create'),
    path('subjecta/', SubjectList.as_view(), name='subject-list'),
    path('subjecta/<int:pk>/', SubjectDetail.as_view(), name='subject-detail'),
    path('subject/', StudyResourceList.as_view(), name='subject-physica-list'),
    path('subject/<int:pk>/', StudyResourceDetail.as_view(), name='subject-physica-detail'),
    path('bookresources/', BookResourcesList.as_view(), name='ebooks-list'),
    path('bookresources/<int:pk>/', BookResourcesDetail.as_view(), name='ebooks-detail'),
    path('addebooks/', BookResourcesView.as_view(), name='ebooks-add'),
    path('addresource/', StudyResourceView.as_view(), name='resource-add'),
]

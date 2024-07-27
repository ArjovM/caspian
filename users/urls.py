from django.urls import path
# from .views import UserList, UserDetail
from .views import SubjectList, SubjectDetail
from .views import StudyResourceList, StudyResourceDetail
from django.urls import path
from .views import NotificationList
from .views import BookResourcesList, BookResourcesDetail
from .views import LoginView, RegisterView
# from .views import RegisterView

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('register/', RegisterView.as_view(), name='register'),
    path('anotifications/', NotificationList.as_view(), name='notification-list'),
    path('anotifications/<int:pk>/', NotificationList.as_view(), name='notification-detail'),
    # path('physica/', StudyResourceList.as_view(), name='physics-list'),
    # path('physica/<int:pk>/', StudyResourceDetail.as_view(), name='physics-detail'),
    path('subjecta/', SubjectList.as_view(), name='subject-list'),
    path('subjecta/<int:pk>/', SubjectDetail.as_view(), name='subject-detail'),
    # path('usera/', UserList.as_view(), name='user-list'),
    # path('usera/<int:pk>/', UserDetail.as_view(), name='user-detail'),
    path('subject/', StudyResourceList.as_view(), name='subject-physica-list'),
    path('subject/<int:pk>/', StudyResourceDetail.as_view(), name='subject-physica-detail'),
    path('bookresources/', BookResourcesList.as_view(), name='ebooks-list'),
    path('bookresources/<int:pk>/', BookResourcesDetail.as_view(), name='ebooks-detail'),
]

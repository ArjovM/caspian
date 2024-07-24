from django.urls import path
from .views import UserList, UserDetail
from .views import SubjectList, SubjectDetail
from .views import PhysicsList, PhysicsDetail
from django.urls import path
from .views import NotificationList
from .views import BooksList, BooksDetail
from .views import LoginView

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('anotifications/', NotificationList.as_view(), name='notification-list'),
    path('anotifications/<int:pk>/', NotificationList.as_view(), name='notification-detail'),
    path('physica/', PhysicsList.as_view(), name='physics-list'),
    path('physica/<int:pk>/', PhysicsDetail.as_view(), name='physics-detail'),
    path('subjecta/', SubjectList.as_view(), name='subject-list'),
    path('subjecta/<int:pk>/', SubjectDetail.as_view(), name='subject-detail'),
    path('usera/', UserList.as_view(), name='user-list'),
    path('usera/<int:pk>/', UserDetail.as_view(), name='user-detail'),
    path('subject/1', PhysicsList.as_view(), name='subject-physica-list'),
    path('ebooks/', BooksList.as_view(), name='ebooks-list'),
    path('ebooks/<int:pk>/', BooksDetail.as_view(), name='ebooks-detail'),
]

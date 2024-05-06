from django.urls import path
from .views import Register,GetUser

urlpatterns = [
    path('register',Register.as_view()),
    path('me',GetUser.as_view())
]
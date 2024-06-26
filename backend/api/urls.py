from rest_framework_simplejwt.views import TokenRefreshView
from django.urls import path
from api import views 

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)


urlpatterns = [
    path("token/", views.MyTokenObtainPairView.as_view()),
    path("token/refresh/", TokenRefreshView.as_view()),
    path("register/", views.RegisterView.as_view()),
    path("test/", views.testEndPoint, name='test'),
    path('csv_file/', views.ProfileView.as_view(), name='csv_file'),
    path('list/', views.ProfileView.as_view(), name='list'),
    path('', views.getRoutes),
]

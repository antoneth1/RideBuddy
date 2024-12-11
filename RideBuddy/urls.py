from django.contrib import admin
from playground import views
from playground.views import RegistrationView
from playground.views import ProtectedView
from playground.views import HomeView
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('admin/', admin.site.urls),
    path('register/', RegistrationView.as_view(), name='register'), # Registration endpoint
    path('protected/', ProtectedView.as_view(), name='protected'),  
    path('home/', HomeView.as_view(), name='home')
]

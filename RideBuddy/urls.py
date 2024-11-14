from django.contrib import admin
from playground import views
from playground.views import RegistrationView
from playground.views import ProtectedView
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('admin/', admin.site.urls),
    path('register/', RegistrationView.as_view(), name='register'),
    path('protected/', ProtectedView.as_view(), name='protected')  # Registration endpoint
]

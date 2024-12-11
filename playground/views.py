from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import RegistrationSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from.models import Location

class ProtectedView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"message": "This is a protected view"})
    
class RegistrationView(APIView):   
    def post(self, request):
        serializer = RegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User registered successfully."}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class HomeView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        x_coordinate = request.data.get("x_coordinate")
        y_coordinate = request.data.get("y_coordinate")
        
        if x_coordinate and y_coordinate: 
            Location.objects.create(
                
                x_coordinate=x_coordinate,
                y_coordinate=y_coordinate,
                email=user
            )
            return Response({'status': 'Location saved'}, status=status.HTTP_201_CREATED)

        return Response({'error': 'Invalid data'}, status=status.HTTP_400_BAD_REQUEST)


# Create your views here.
# request -> response
# request handler

from rest_framework import serializers
from django.contrib.auth.models import User


class RegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

        # Test for .edu email
    def validate_email(self, value):
        if not value.endswith('villanova.edu'):
            raise serializers.ValidationError("You must use a .edu email address.")
        return value

    def create(self, validated_data):
        # Create a new user with validated data, including password hashing
        user = User(
            username=validated_data['username'],
            email=validated_data['email']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
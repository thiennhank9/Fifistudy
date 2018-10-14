from rest_framework import serializers

from ..models import FifiUser


class BaseFifiUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = FifiUser
        fields = '__all__'


class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = FifiUser
        fields = ('username', 'password')


class FifiUserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = FifiUser
        exclude = ('created_at', 'updated_at', 'password')
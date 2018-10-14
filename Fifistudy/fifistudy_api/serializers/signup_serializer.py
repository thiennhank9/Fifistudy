from rest_framework import serializers

from ..models import FifiUser


class SignupStepOneSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(max_length=150)

    class Meta:
        model = FifiUser
        fields = ('username', 'password', 'confirm_password', 'email')


class AcitveUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = FifiUser
        fields = ('pin',)


class SignupStepTwoSerializer(serializers.ModelSerializer):
    class Meta:
        model = FifiUser
        fields = ('first_name', 'last_name', 'gender', 'address', 'birthday', 'phone')


class BaseUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = FifiUser
        exclude = ('password', 'created_at', 'updated_at', 'last_login', 'pin', 'role')


class UpdateAvatarSerializer(serializers.ModelSerializer):
    class Meta:
        model = FifiUser
        fields = ('avatar',)

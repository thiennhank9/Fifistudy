from rest_framework import serializers

from ..models import UserSaveFilm


class BaseUserSaveFilmSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserSaveFilm
        fields = '__all__'


class UserSaveFilmSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserSaveFilm
        fields = ('film_id',)

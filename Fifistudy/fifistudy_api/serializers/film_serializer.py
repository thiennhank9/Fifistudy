from rest_framework import serializers

from ..models import Film, UserSaveFilm
from .episode_serializer import BaseEpisodeSerializer


class BaseFilmSerializer(serializers.ModelSerializer):
    class Meta:
        model = Film
        fields = '__all__'


class HomepageListFilmSerializer(serializers.ModelSerializer):
    is_saved = serializers.BooleanField()

    class Meta:
        model = Film
        fields = '__all__'


class FilmDetailSerializer(serializers.ModelSerializer):
    is_saved = serializers.BooleanField()
    episodes = BaseEpisodeSerializer(many=True)

    class Meta:
        model = Film
        fields = '__all__'


class ListUserSaveFilm(serializers.ModelSerializer):
    film_detail = BaseFilmSerializer(many=False)

    class Meta:
        model = UserSaveFilm
        exclude = ('created_at', 'updated_at')


class SearchListFilmSerializer(serializers.ModelSerializer):
    films = HomepageListFilmSerializer(many=True)
    has_more = serializers.BooleanField()
    page = serializers.IntegerField(allow_null=True)
    page_size = serializers.IntegerField(allow_null=True)
    record_number = serializers.IntegerField(allow_null=True)

    class Meta:
        model = Film
        fields = ('films', 'has_more', 'page', 'page_size', 'record_number')





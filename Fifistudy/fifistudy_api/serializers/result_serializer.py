from rest_framework import serializers

from ..models import Result, Episode, Film


class BaseResult(serializers.ModelSerializer):
    class Meta:
        model = Result
        fields = '__all__'


class BaseEpisodeForResult(serializers.ModelSerializer):
    class Meta:
        model = Episode
        fields = '__all__'


class BaseFilmForResult(serializers.ModelSerializer):
    class Meta:
        model = Film
        fields = '__all__'


class ResultList(serializers.ModelSerializer):
    episode_detail = BaseEpisodeForResult()
    film_detail = BaseFilmForResult()

    class Meta:
        model = Result
        fields = '__all__'


class SaveResult(serializers.ModelSerializer):
    class Meta:
        model = Result
        fields = ['result', 'episode_id']

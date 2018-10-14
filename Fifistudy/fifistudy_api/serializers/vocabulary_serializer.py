from rest_framework import serializers

from ..models import UserSaveVocabulary, Vocabulary
from .film_serializer import BaseFilmSerializer
from .episode_serializer import BaseEpisodeSerializer


class BaseVocabularySerializer(serializers.ModelSerializer):
    class Meta:
        model = Vocabulary
        fields = '__all__'


class BaseUserSaveVocabularySerializer(serializers.ModelSerializer):
    class Meta:
        model = UserSaveVocabulary
        fields = '__all__'


class ListUserSaveVocabularySerializer(serializers.ModelSerializer):
    vocabulary = BaseVocabularySerializer(many=False)
    episode = BaseEpisodeSerializer(many=False)
    film = BaseFilmSerializer(many=False)

    class Meta:
        model = UserSaveVocabulary
        fields = '__all__'


class SaveVocabularySerializer(serializers.ModelSerializer):
    vocabulary = serializers.CharField(max_length=250, allow_blank=False, allow_null=False)
    meaning = serializers.CharField(max_length=500, allow_null=True, allow_blank=True)

    class Meta:
        model = UserSaveVocabulary
        fields = ('vocabulary', 'meaning', 'episode_id', 'current_time')


class UpdateVocabularySerializer(serializers.ModelSerializer):
    class Meta:
        model = Vocabulary
        fields = ('vocabulary', 'meaning')


from rest_framework import serializers

from ..models import Episode, UserWatchEpisode


class BaseEpisodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Episode
        # fields = '__all__'
        exclude = ('created_at', 'updated_at')


class BaseUserWatchEpisodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserWatchEpisode
        exclude = ('created_at', 'updated_at')


class EpisodeDetailSerializer(serializers.ModelSerializer):
    user_watch_episode = BaseUserWatchEpisodeSerializer(many=False)

    class Meta:
        model = Episode
        exclude = ('created_at', 'updated_at')


class SaveUserWatchEpisodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserWatchEpisode
        fields = ('current_time', 'episode_id')

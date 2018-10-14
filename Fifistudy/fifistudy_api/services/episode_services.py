from ..adapter import EpisodeAdapter
from ..serializers import BaseEpisodeSerializer, BaseUserWatchEpisodeSerializer, EpisodeDetailSerializer
from ..infrastructures import ApiCustomException
from ..constant import ErrorDefine


class EpisodeServices:
    def __init__(self):
        self.episode_adapter = EpisodeAdapter()

    def increase_view_number(self, episode):
        episode.film_id.increase_view_number()

    def get_by_id(self, episode_id, slug, user=None):
        episode = self.episode_adapter.get_by_id(episode_id, user)

        if episode.film_id.slug != slug:
            raise ApiCustomException(ErrorDefine.EPISODE_NOT_EXIST)

        serializer = EpisodeDetailSerializer(episode)

        self.increase_view_number(episode)

        return serializer.data

    def get_by_episode_number(self, episode_number, slug, user=None):
        episode = self.episode_adapter.get_by_episode_number(episode_number, slug, user)

        serializer = EpisodeDetailSerializer(episode)

        self.increase_view_number(episode)

        return serializer.data

    def save_current_time(self, user, current_time, episode_id):
        user_watch_episode = self.episode_adapter.save_current_watch_time(user, current_time, episode_id)

        serializer = BaseUserWatchEpisodeSerializer(user_watch_episode, many=False)

        return serializer.data

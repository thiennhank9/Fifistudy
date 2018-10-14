from ..models import Episode, UserWatchEpisode
from ..infrastructures import ApiCustomException
from ..constant import ErrorDefine


class EpisodeAdapter:
    def __init__(self):
        pass

    def save_current_watch_time(self, user, current_time, episode_id):
        try:
            episode = Episode.objects.get(id=episode_id)
            user_watch_episode = UserWatchEpisode.objects.filter(user_id=user, episode_id_id=episode_id)

            if user_watch_episode.exists():
                user_watch_episode = user_watch_episode.first()
                user_watch_episode.current_time = current_time
                user_watch_episode.save()

                return user_watch_episode

            user_watch_episode = UserWatchEpisode(user_id=user, episode_id=episode, current_time=current_time)
            user_watch_episode.save()

            return user_watch_episode
        except Episode.DoesNotExist:
            raise ApiCustomException(ErrorDefine.EPISODE_NOT_EXIST)

    def get_user_watch_episode_by_user_and_epsiode_id(self, episode, user=None):
        if user is None:
            return None

        user_watch_episode = UserWatchEpisode.objects.filter(user_id=user, episode_id=episode)

        if user_watch_episode.exists():
            return user_watch_episode.first()

        return None

    def get_by_id(self, episode_id, user=None):
        try:
            episode = Episode.objects.get(id=episode_id)

            episode.user_watch_episode = self.get_user_watch_episode_by_user_and_epsiode_id(episode, user)

            return episode
        except Episode.DoesNotExist:
            raise ApiCustomException(ErrorDefine.EPISODE_NOT_EXIST)

    def get_by_episode_number(self, episode_number, slug, user=None):
        try:
            episode = Episode.objects.filter(number=episode_number, film_id__slug=slug)
            print(episode_number)
            if not episode.exists():
                raise ApiCustomException(ErrorDefine.EPISODE_NOT_FOUND)

            episode = episode.first()
            episode.user_watch_episode = self.get_user_watch_episode_by_user_and_epsiode_id(episode, user)

            return episode
        except Episode.DoesNotExist:
            raise ApiCustomException(ErrorDefine.EPISODE_NOT_EXIST)

    def get_base_by_id(self, episode_id):
        try:
            episode = Episode.objects.get(id=episode_id)

            return episode
        except Episode.DoesNotExist:
            raise ApiCustomException(ErrorDefine.EPISODE_NOT_EXIST)
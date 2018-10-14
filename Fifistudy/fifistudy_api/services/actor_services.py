from ..adapter import ActorAdapter
from ..serializers import BaseActorSerializer, ListFilmHasActorSerializer, BaseFilmHasActorSerializer
from ..infrastructures import ApiCustomException
from ..constant import ErrorDefine


class ActorServices:
    def __init__(self):
        self.actor_adapter = ActorAdapter()

    def get_list_by_film_id(self, film_id):
        film_has_actors = self.actor_adapter.get_list_actor_by_film_id(film_id)

        serializer = ListFilmHasActorSerializer(film_has_actors, many=True)

        return serializer.data

    def get_list_by_slug(self, slug):
        film_has_actors = self.actor_adapter.get_list_actor_by_slug(slug)

        serializer = ListFilmHasActorSerializer(film_has_actors, many=True)

        return serializer.data

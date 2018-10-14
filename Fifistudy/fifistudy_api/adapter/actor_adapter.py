from django.db.models import Case, When, Value, Count, BooleanField

from ..models import Actor, FilmHasActor, Film
from ..infrastructures import ApiCustomException
from ..constant import ErrorDefine


class ActorAdapter:
    def __init__(self):
        pass

    def get_list_actor_by_film_id(self, film_id):
        try:
            film = Film.objects.get(id=film_id)
            film_has_actors = FilmHasActor.objects.filter(film_id=film)

            for film_has_actor in film_has_actors:
                film_has_actor.actor_detail = film_has_actor.actor_id

            return film_has_actors

        except Film.DoesNotExist:
            raise ApiCustomException(ErrorDefine.FILM_NOT_FOUND)

    def get_list_actor_by_slug(self, slug):
        try:
            film = Film.objects.get(slug=slug)
            film_has_actors = FilmHasActor.objects.filter(film_id=film)

            for film_has_actor in film_has_actors:
                film_has_actor.actor_detail = film_has_actor.actor_id

            return film_has_actors

        except Film.DoesNotExist:
            raise ApiCustomException(ErrorDefine.FILM_NOT_FOUND)
from django.db import models

from .film import Film
from .actor import Actor


class FilmHasActor(models.Model):
    objects = models.Manager()

    role = models.CharField(max_length=150, blank=False, null=False)

    film_id = models.ForeignKey(Film, on_delete=models.CASCADE)
    actor_id = models.ForeignKey(Actor, on_delete=models.CASCADE)

    created_at = models.DateTimeField(auto_now_add=True, auto_now=False, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=True)

    def __str__(self):
        return '{}/{} - {}: {}'.format(self.id, self.film_id.english_name, self.actor_id.name, self.role)

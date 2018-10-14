from django.db import models

from .type import Type
from .film import Film


class FilmBelongToType(models.Model):
    objects = models.Manager()

    film_id = models.ForeignKey(Film, on_delete=models.CASCADE)
    type_id = models.ForeignKey(Type, on_delete=models.CASCADE)

    created_at = models.DateTimeField(auto_now_add=True, auto_now=False, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=True)
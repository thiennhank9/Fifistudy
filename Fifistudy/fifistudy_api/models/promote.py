from django.db import models

from .film import Film


class Promote(models.Model):
    objects = models.Manager()

    quote = models.CharField(max_length=254, null=False, blank=False)

    film_id = models.ForeignKey(Film)

    created_at = models.DateTimeField(auto_now_add=True, auto_now=False, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=True)

    def __str__(self):
        return str(self.id)
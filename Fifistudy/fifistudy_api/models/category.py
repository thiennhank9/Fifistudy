from django.db import models


class Category(models.Model):
    objects = models.Manager()

    name = models.CharField(max_length=254)
    description = models.TextField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True, auto_now=False, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=True)

    def __str__(self):
        return '{} - {}'.format(self.id, self.name)
from django.db import models


class Type(models.Model):
    objects = models.Manager()

    name = models.CharField(max_length=254, null=False, blank=False)
    description = models.CharField(max_length=511, null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True, auto_now=False, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=True)

    def __str__(self):
        return '{}/{}'.format(self.id, self.name)
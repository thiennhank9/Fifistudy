from django.db import models


class Vocabulary(models.Model):
    objects = models.Manager()

    vocabulary = models.CharField(max_length=500, null=False, blank=False)
    meaning = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True, auto_now=False, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=True)
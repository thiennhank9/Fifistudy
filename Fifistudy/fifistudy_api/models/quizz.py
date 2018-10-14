from django.db import models

from .episode import Episode


class Quizz(models.Model):
    objects = models.Manager()

    title = models.CharField(max_length=150, null=False, blank=False)
    content = models.TextField(null=False, blank=False)

    episode_id = models.ForeignKey(Episode, on_delete=models.CASCADE)

    created_at = models.DateTimeField(auto_now_add=True, auto_now=False, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=True)

    def __str__(self):
        return '{}/{}: {}'.format(self.id, self.episode_id.name, self.title)
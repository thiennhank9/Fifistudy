from django.db import models

from .episode import Episode
from .fifi_user import FifiUser


class Result(models.Model):
    objects = models.Manager()

    result = models.FloatField(null=True, blank=True)

    episode_id = models.ForeignKey(Episode, on_delete=models.CASCADE)
    user_id = models.ForeignKey(FifiUser, on_delete=models.CASCADE)

    created_at = models.DateTimeField(auto_now_add=True, auto_now=False, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=True)

    def __str__(self):
        return '{}:{}-{}'.format(self.user_id.first_name, self.episode_id, self.result)
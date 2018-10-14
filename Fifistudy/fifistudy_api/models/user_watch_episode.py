from django.db import models

from .episode import Episode
from .fifi_user import FifiUser


class UserWatchEpisode(models.Model):
    objects = models.Manager()

    current_time = models.CharField(max_length=50, blank=False, null=False)

    episode_id = models.ForeignKey(Episode, on_delete=models.CASCADE)
    user_id = models.ForeignKey(FifiUser, on_delete=models.CASCADE)

    created_at = models.DateTimeField(auto_now_add=True, auto_now=False, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=True)

    def __str__(self):
        return '{}/{} - {}: {}'.format(self.id, self.episode_id.id, self.user_id.id, self.current_time)

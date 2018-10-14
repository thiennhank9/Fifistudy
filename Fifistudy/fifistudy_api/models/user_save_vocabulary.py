from django.db import models

from .episode import Episode
from .vocabulary import Vocabulary
from .fifi_user import FifiUser


class UserSaveVocabulary(models.Model):
    objects = models.Manager()

    current_time = models.CharField(max_length=50, blank=True, null=True)

    episode_id = models.ForeignKey(Episode, on_delete=models.CASCADE)
    vocabulary_id = models.ForeignKey(Vocabulary, on_delete=models.CASCADE)
    user_id = models.ForeignKey(FifiUser, on_delete=models.CASCADE)

    created_at = models.DateTimeField(auto_now_add=True, auto_now=False, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=True)

    def __str__(self):
        return '{}/{} - {} - {}'.format(self.id, self.episode_id.name, self.vocabulary_id.vocabulary, self.user_id.id)

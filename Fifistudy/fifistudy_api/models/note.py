from django.db import models

from .fifi_user import FifiUser


class Note(models.Model):
    objects = models.Manager()

    title = models.CharField(max_length=250, null=False, blank=False)
    content = models.TextField(null=True, blank=True)

    user_id = models.ForeignKey(FifiUser, on_delete=models.CASCADE)

    created_at = models.DateTimeField(auto_now_add=True, auto_now=False, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=True)

    def __str__(self):
        return '{}.{} - {}'.format(self.user_id.id, self.user_id.username, self.title)
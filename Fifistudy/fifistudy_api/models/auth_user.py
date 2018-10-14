from django.db import models

from .fifi_user import FifiUser


class AuthUser(models.Model):
    objects = models.Manager()

    token = models.CharField(max_length=254)

    user_id = models.OneToOneField(FifiUser, on_delete=models.CASCADE)

    created_at = models.DateTimeField(auto_now_add=True, auto_now=False, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=True)

    def __str__(self):
        return '{} - {}'.format(self.token, self.user_id.username)
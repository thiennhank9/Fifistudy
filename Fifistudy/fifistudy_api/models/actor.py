from django.db import models


class Actor(models.Model):
    objects = models.Manager()

    name = models.CharField(max_length=254, blank=False, null=False)
    profile_image = models.ImageField(upload_to='actor/profile_image')
    profile_image_240 = models.ImageField(upload_to='actor/profile_image_240/', blank=True, null=True, default=None)
    birthday = models.DateField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True, auto_now=False, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=True)

    def __str__(self):
        return '{}/{}'.format(self.id, self.name)
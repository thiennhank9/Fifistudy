from django.db import models

from .fifi_user import FifiUser
from .category import Category


class Blog(models.Model):
    objects = models.Manager()

    title = models.CharField(max_length=254, blank=False, null=False)
    content = models.TextField(null=True, blank=True)

    user_id = models.ForeignKey(FifiUser, on_delete=models.CASCADE)
    category_id = models.ForeignKey(Category, on_delete=models.CASCADE)

    created_at = models.DateTimeField(auto_now_add=True, auto_now=False, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=True)
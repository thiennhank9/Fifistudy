from django.db import models

from .blog import Blog
from .fifi_user import FifiUser


class CommentBlog(models.Model):
    objects = models.Manager()

    content = models.TextField(blank=False, null=False)

    blog_id = models.ForeignKey(Blog, on_delete=models.CASCADE)
    user_id = models.ForeignKey(FifiUser, on_delete=models.CASCADE)

    created_at = models.DateTimeField(auto_now_add=True, auto_now=False, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=True)

    def __str__(self):
        return '{}/{} - {}'.format(self.id, self.blog_id.title, self.user_id.id)
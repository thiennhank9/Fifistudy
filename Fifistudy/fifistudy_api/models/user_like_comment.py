from django.db import models
from django.db.models import signals

from .comment import Comment
from .fifi_user import FifiUser


class UserLikeComment(models.Model):
    objects = models.Manager()

    user_id = models.ForeignKey(FifiUser, on_delete=models.CASCADE)
    comment_id = models.ForeignKey(Comment, on_delete=models.CASCADE)

    created_at = models.DateTimeField(auto_now_add=True, auto_now=False, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=True)

    def __str__(self):
        return '{}/{} - {}'.format(self.id, self.comment_id.id, self.user_id.username)


def increase_like_number(sender, instance, created, raw, **kwargs):
    if created:
        instance.comment_id.like_number += 1
        instance.comment_id.save()


def decrease_like_number(sender, instance, **kwargs):
    instance.comment_id.like_number -= 1

    if instance.comment_id.like_number < 0:
        instance.comment_id.like_number = 0
    instance.comment_id.save()


signals.post_save.connect(increase_like_number, sender=UserLikeComment)
signals.post_delete.connect(decrease_like_number, sender=UserLikeComment)
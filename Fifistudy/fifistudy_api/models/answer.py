from django.db import models

from .quizz import Quizz


class Answer(models.Model):
    objects = models.Manager()

    content = models.CharField(max_length=254, null=False, blank=False)
    is_correct = models.BooleanField(null=False, blank=False)

    quizz_id = models.ForeignKey(Quizz, on_delete=models.CASCADE)

    created_at = models.DateTimeField(auto_now_add=True, auto_now=False, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=True)

    def __str__(self):
        return '{}/{}: {}'.format(self.id, self.quizz_id.title, self.is_correct)
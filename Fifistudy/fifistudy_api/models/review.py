from django.db import models
from django.db.models import signals

from .film import Film
from .fifi_user import FifiUser


class Review(models.Model):
    objects = models.Manager()

    score = models.FloatField(null=False, blank=False)

    user_id = models.ForeignKey(FifiUser, on_delete=models.CASCADE)
    film_id = models.ForeignKey(Film, on_delete=models.CASCADE)

    created_at = models.DateTimeField(auto_now_add=True, auto_now=False, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=True)

    def __str__(self):
        return '{}/{} - {}: {}'.format(self.id, self.film_id.english_name, self.user_id.id, self.score)


def update_film_review_score_on_created(sender, instance, created, raw, **kwargs):
    film = instance.film_id
    reviews = Review.objects.filter(film_id=film)
    total_point = 0

    review_count = reviews.count()

    for review in reviews:
        total_point += review.score

    film.average_score = round(total_point / review_count, 2)
    film.review_number = review_count
    film.save()


def update_film_review_score_on_delete(sender, instance, **kwargs):
    film = instance.film_id
    reviews = Review.objects.filter(film_id=film)
    total_point = 0

    review_count = reviews.count()

    for review in reviews:
        total_point += review.score

    if review_count != 0:
        film.average_score = round(total_point / review_count, 2)
    else:
        film.average_score = 0

    film.review_number = review_count
    film.save()


signals.post_save.connect(update_film_review_score_on_created, sender=Review)
signals.post_delete.connect(update_film_review_score_on_delete, sender=Review)

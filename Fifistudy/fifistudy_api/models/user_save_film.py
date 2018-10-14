from django.db import models
from django.db.models import signals

from .film import Film
from .fifi_user import FifiUser


class UserSaveFilm(models.Model):
    objects = models.Manager()

    film_id = models.ForeignKey(Film, on_delete=models.CASCADE)
    user_id = models.ForeignKey(FifiUser, on_delete=models.CASCADE)

    created_at = models.DateTimeField(auto_now_add=True, auto_now=False, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=True)

    def __str__(self):
        return '{}/{} - {}'.format(self.id, self.film_id.english_name, self.user_id.id)


def count_film_save_number_when_save(sender, instance, created, raw, **kwargs):
    if created:
        save_number = UserSaveFilm.objects.filter(film_id=instance.film_id).count()

        instance.film_id.save_number = save_number
        instance.film_id.save()


def count_film_save_number_when_delete(sender, instance, **kwargs):
    save_number = UserSaveFilm.objects.filter(film_id=instance.film_id).count()

    instance.film_id.save_number = save_number
    instance.film_id.save()


signals.post_save.connect(count_film_save_number_when_save, sender=UserSaveFilm)
signals.post_delete.connect(count_film_save_number_when_delete, sender=UserSaveFilm)
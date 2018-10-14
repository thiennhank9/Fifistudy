from django.db import models
# give save signal that film_id will recount episode count
from django.db.models import signals

from .film import Film


class Episode(models.Model):
    objects = models.Manager()

    number = models.CharField(max_length=10, blank=False, null=False)
    name = models.CharField(max_length=150, blank=True, null=True)
    # description = models.TextField(blank=True, null=True)
    video = models.FileField(upload_to='episode/video/', null=True, blank=True)
    link_video = models.CharField(max_length=255, null=True, blank=True)
    sub = models.FileField(upload_to='episode/sub/')
    eng_sub = models.FileField(blank=True, null=True, upload_to='episode/eng_sub/')
    vie_sub = models.FileField(blank=True, null=True, upload_to='episode/vie_sub/')
    # thumbnail = models.ImageField(upload_to='episode/thumbnail/')

    film_id = models.ForeignKey(Film, on_delete=models.CASCADE)

    created_at = models.DateTimeField(auto_now_add=True, auto_now=False, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=True)

    def __str__(self):
        id = self.id
        film_name = self.film_id.english_name
        number = self.number
        name = self.name
        return '{}/{}: {} - {}'.format(id, film_name, number, name)


def count_epsiode_when_add(sender, instance, created, raw, **kwargs):
    if created:
        episode_count = Episode.objects.filter(film_id=instance.film_id).count()
        instance.film_id.episode_count = episode_count
        instance.film_id.save()


def count_episode_when_delete(sender, instance, **kwargs):
    episode_count = Episode.objects.filter(film_id=instance.film_id).count()
    instance.film_id.episode_count = episode_count
    instance.film_id.save()


signals.post_save.connect(count_epsiode_when_add, sender=Episode)
signals.post_delete.connect(count_episode_when_delete, sender=Episode)







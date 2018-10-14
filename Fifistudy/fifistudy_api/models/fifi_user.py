from django.db import models

from ..constant import GENDER_CHOICES, ROLE_CHOICES, STATUS_CHOICES


class FifiUser(models.Model):
    objects = models.Manager()

    username = models.CharField(max_length=150, null=False, blank=False, unique=True)
    password = models.CharField(max_length=254, null=False, blank=False)
    avatar = models.ImageField(blank=True, null=True, upload_to='user/avatar/')
    first_name = models.CharField(max_length=150, null=True, blank=True)
    last_name = models.CharField(max_length=150, null=True, blank=True)
    gender = models.PositiveSmallIntegerField(choices=GENDER_CHOICES, null=True, blank=True)
    email = models.EmailField(unique=True)
    address = models.CharField(max_length=254, null=True, blank=True)
    birthday = models.DateField(blank=True, null=True)
    phone = models.CharField(max_length=30, blank=True, null=True)
    pin = models.CharField(max_length=8, blank=True, null=True)

    role = models.PositiveSmallIntegerField(choices=ROLE_CHOICES)
    status = models.PositiveSmallIntegerField(choices=STATUS_CHOICES, default=0)
    last_login = models.DateTimeField(null=True, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True, auto_now=False, editable=False)
    updated_at = models.DateTimeField(auto_now=True, editable=True)

    def __str__(self):
        return '{} - {}'.format(self.username, self.email)

    def is_anonymous(self):
        return False

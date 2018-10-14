from rest_framework import serializers

from ..models import Promote
from .film_serializer import BaseFilmSerializer


class BasePromoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Promote
        fields = '__all__'


class ListPromoteSerializer(serializers.ModelSerializer):
    film_detail = BaseFilmSerializer()

    class Meta:
        model = Promote
        fields = ('quote', 'film_detail', 'film_id')

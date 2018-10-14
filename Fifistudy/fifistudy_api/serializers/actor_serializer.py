from rest_framework import serializers

from ..models import Actor, FilmHasActor


class BaseActorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Actor
        fields = '__all__'


class BaseFilmHasActorSerializer(serializers.ModelSerializer):
    class Meta:
        model = FilmHasActor
        fields = '__all__'


class ListFilmHasActorSerializer(serializers.ModelSerializer):
    actor_detail = BaseActorSerializer()

    class Meta:
        model = FilmHasActor
        fields = '__all__'


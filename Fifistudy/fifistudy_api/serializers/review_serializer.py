from rest_framework import serializers

from ..models import Review


class BaseReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'


class SaveReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ('score', 'film_id')
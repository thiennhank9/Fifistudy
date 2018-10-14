from rest_framework import serializers

from ..models import Comment, UserLikeComment


class BaseCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'


class ListCommentSerializer(serializers.ModelSerializer):
    is_liked = serializers.BooleanField()
    username = serializers.CharField(max_length=254)
    avatar = serializers.CharField(max_length=254)
    first_name = serializers.CharField(max_length=150)
    last_name = serializers.CharField(max_length=150)

    class Meta:
        model = Comment
        fields = '__all__'


class SaveCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('content', 'film_id')


class LikeCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserLikeComment
        fields = ('comment_id',)

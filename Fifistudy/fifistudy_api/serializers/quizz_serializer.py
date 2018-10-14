from rest_framework import serializers

from ..models import Quizz, Answer, Film, Episode


class ListAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = '__all__'


class BaseQuizzSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quizz
        fields = '__all__'


class BaseFilmDetailForQuizz(serializers.ModelSerializer):
    class Meta:
        model = Film
        fields = '__all__'


class BaseEpisodeDetailForQuizz(serializers.ModelSerializer):
    class Meta:
        model = Episode
        fields = '__all__'


class QuizzSerializer(serializers.ModelSerializer):
    answer_list = ListAnswerSerializer(many=True)

    class Meta:
        model = Quizz
        fields = '__all__'


class QuizzCombineSerializer(serializers.ModelSerializer):
    film_detail = BaseFilmDetailForQuizz()
    episode_detail = BaseEpisodeDetailForQuizz()
    quizz_list = QuizzSerializer(many=True)

    class Meta:
        model = Quizz
        fields = ['film_detail', 'episode_detail', 'quizz_list']
from ..serializers import QuizzSerializer, QuizzCombineSerializer
from ..adapter import QuizzAdapter


class QuizzServices:
    def __init__(self):
        self.quizz_adapter = QuizzAdapter()

    def get_quizz_by_episode_id(self, episode_id):
        quizzs, episode = self.quizz_adapter.get_random_quizz(episode_id)

        result = {
            'quizz_list': quizzs,
            'episode_detail': episode,
            'film_detail': episode.film_id
        }

        # serializer = QuizzSerializer(quizzs, many=True)
        serializer = QuizzCombineSerializer(result)
        return serializer.data

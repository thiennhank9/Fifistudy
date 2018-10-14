from ..models import Quizz, Answer, Episode

from ..infrastructures import ApiCustomException
from ..constant import ErrorDefine, Constant


class QuizzAdapter:
    def __init__(self):
        pass

    def get_random_quizz(self, episode_id):
        try:
            episode = Episode.objects.get(id=int(episode_id))
            quizzs = Quizz.objects.filter(episode_id=episode).order_by('?')[:10]

            for quizz in quizzs:
                answer = Answer.objects.filter(quizz_id=quizz)
                quizz.answer_list = answer

            return quizzs, episode
        except Episode.DoesNotExist:
            raise ApiCustomException(ErrorDefine.EPISODE_NOT_FOUND)
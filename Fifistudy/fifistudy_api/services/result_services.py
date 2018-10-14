from ..models import Result, FifiUser, Episode, Film
from ..serializers import ResultList
from ..infrastructures import ApiCustomException
from ..constant import ErrorDefine, Constant


class ResultServices:
    def __init__(self):
        pass

    def save_result(self, user_id, result, episode_id):
        try:
            episode = Episode.objects.get(id=episode_id)

            result_object = Result.objects.filter(episode_id=episode, user_id=user_id)

            if result_object.exists():
                result_object = result_object.first()
                result_object.result = float(result)
                result_object.save()

                return 'Update result success'

            result_object = Result(result=result, episode_id=episode, user_id=user_id)
            result_object.save()

            return 'Save result success'

        except Episode.DoesNotExist:
            raise ApiCustomException(ErrorDefine.EPISODE_NOT_FOUND)

    def get_list_result(self, user_id):
        results = Result.objects.filter(user_id=user_id)

        for result in results:
            result.episode_detail = result.episode_id
            result.film_detail = result.episode_id.film_id

        serializer = ResultList(results, many=True)

        return serializer.data
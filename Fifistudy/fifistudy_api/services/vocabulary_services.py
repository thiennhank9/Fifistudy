from ..adapter import VocabularyAdapter, EpisodeAdapter
from ..infrastructures import ApiCustomException
from ..constant import ErrorDefine
from ..serializers import ListUserSaveVocabularySerializer


class VocabularyServices:
    def __init__(self):
        self.vocabulary_adapter = VocabularyAdapter()
        self.episode_adapter = EpisodeAdapter()

    def get_by_user(self, user):
        user_save_vocabularies = self.vocabulary_adapter.get_by_user(user)

        serializer = ListUserSaveVocabularySerializer(user_save_vocabularies, many=True)

        return serializer.data

    def save_vocabulary(self, user, vocabulary, meaning, current_time, episode_id):
        episode = self.episode_adapter.get_base_by_id(episode_id)

        user_save_vocabulary = self.vocabulary_adapter.user_save_vocabulary(user, episode, current_time, vocabulary,
                                                                            meaning)

        return 'You save vocabulary success'

    def update_vocabulary(self, vocabulary, meaning, user_save_vocabulary_id):
        user_save_vocabulary = self.vocabulary_adapter.update_vocabulary(user_save_vocabulary_id, vocabulary, meaning)

        result = 'You have updated vocabulary success'

        return result

    def delete_vocabulary(self, user, user_save_vocabulary_id):
        result = self.vocabulary_adapter.delete_user_save_vocabulary(user, user_save_vocabulary_id)

        return result




from ..models import Vocabulary, UserSaveVocabulary
from ..infrastructures import ApiCustomException
from ..constant import ErrorDefine


class VocabularyAdapter:
    def __init__(self):
        pass

    def get_by_user(self, user, page=1):
        user_save_vocabularies = UserSaveVocabulary.objects.filter(user_id=user)

        for user_save_vocabulary in user_save_vocabularies:
            user_save_vocabulary.vocabulary = user_save_vocabulary.vocabulary_id
            user_save_vocabulary.episode = user_save_vocabulary.episode_id
            user_save_vocabulary.film = user_save_vocabulary.episode.film_id

        return user_save_vocabularies

    def save_vocabulary(self, vocabulary, meaning):
        vocabulary = Vocabulary(vocabulary=vocabulary, meaning=meaning)

        vocabulary.save()
        return vocabulary

    def user_save_vocabulary(self, user, episode, current_time, vocabulary, meaning):
        vocabulary = self.save_vocabulary(vocabulary=vocabulary, meaning=meaning)

        user_save_vocabulary = UserSaveVocabulary(user_id=user, current_time=current_time, episode_id=episode,
                                                  vocabulary_id=vocabulary)

        user_save_vocabulary.save()

        return user_save_vocabulary

    def update_vocabulary(self, user_save_vocabulary_id, vocabulary, meaning):
        try:
            user_save_vocabulary = UserSaveVocabulary.objects.get(id=user_save_vocabulary_id)

            vocabulary_object = user_save_vocabulary.vocabulary_id
            vocabulary_object.vocabulary = vocabulary
            vocabulary_object.meaning = meaning

            vocabulary_object.save()
            return user_save_vocabulary
        except UserSaveVocabulary.DoesNotExist:
            raise ApiCustomException(ErrorDefine.USER_SAVE_VOCABULARY_NOT_FOUND)

    def delete_user_save_vocabulary(self, user, user_save_vocabulary_id):
        try:
            user_save_vocabulary = UserSaveVocabulary.objects.get(id=user_save_vocabulary_id)

            if user_save_vocabulary.user_id != user:
                raise ApiCustomException(ErrorDefine.YOUR_ROLE_IS_NOT_ALLOW_TO_DELETE)

            vocabulary = user_save_vocabulary.vocabulary_id

            vocabulary.delete()
            return 'You delete success'
        except UserSaveVocabulary.DoesNotExist:
            raise ApiCustomException(ErrorDefine.USER_SAVE_VOCABULARY_NOT_FOUND)
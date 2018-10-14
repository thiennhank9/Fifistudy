from rest_framework.viewsets import ModelViewSet
from django.conf.urls import url

from ..services import VocabularyServices
from ..models import UserSaveVocabulary, Vocabulary
from ..serializers import BaseUserSaveVocabularySerializer, SaveVocabularySerializer, UpdateVocabularySerializer
from .api_base import ApiBase
from ..utils import FifiUserTokenAuthentication


# Create your views here.
class VocabularyViewSet(ModelViewSet, ApiBase):
    queryset = Vocabulary.objects.all().order_by('-updated_at')
    serializer_class = BaseUserSaveVocabularySerializer
    authentication_classes = (FifiUserTokenAuthentication,)

    # services
    vocabulary_services = VocabularyServices()

    @classmethod
    def get_router(cls):
        urlpatterns = [
            url(r'list_vocabulary/$', cls.as_view({'get': 'get_by_user'})),
            url(r'save_vocabulary/$', cls.as_view({'post': 'save_vocabulary'})),
            url(r'update_vocabulary/(?P<user_save_vocabulary_id>[0-9]+)/$', cls.as_view({
                'put': 'update_vocabulary'
            })),
            url(r'delete_vocabulary/(?P<user_save_vocabulary_id>[0-9]+)/$', cls.as_view({
                'delete': 'delete_vocabulary'
            })),
        ]

        return urlpatterns

    def get_serializer_class(self):
        if self.action == 'save_vocabulary':
            return SaveVocabularySerializer

        if self.action == 'update_vocabulary':
            return UpdateVocabularySerializer

        return BaseUserSaveVocabularySerializer

    def get_by_user(self, request, *args, **kwargs):
        user = self.check_anonymous(request)

        result = self.vocabulary_services.get_by_user(user)

        return self.as_success(result)

    def save_vocabulary(self, request, *args, **kwargs):
        user = self.check_anonymous(request)

        serializer = SaveVocabularySerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        vocabulary = request.data['vocabulary']
        meaning = request.data['meaning']
        current_time = request.data['current_time']
        episode_id = request.data['episode_id']

        result = self.vocabulary_services.save_vocabulary(user, vocabulary, meaning, current_time, episode_id)

        return self.as_success(result)

    def update_vocabulary(self, request, *args, **kwargs):
        user = self.check_anonymous(request)

        serializer = UpdateVocabularySerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        vocabulary = request.data['vocabulary']
        meaning = request.data['meaning']
        user_save_vocabulary_id = kwargs['user_save_vocabulary_id']

        result = self.vocabulary_services.update_vocabulary(vocabulary, meaning, user_save_vocabulary_id)

        return self.as_success(result)

    def delete_vocabulary(self, request, *args, **kwargs):
        user = self.check_anonymous(request)

        user_save_vocabulary_id = kwargs['user_save_vocabulary_id']

        result = self.vocabulary_services.delete_vocabulary(user, user_save_vocabulary_id)

        return self.as_success(result)








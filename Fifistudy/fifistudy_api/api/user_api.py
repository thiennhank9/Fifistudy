from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny
from django.conf.urls import url

from .api_base import ApiBase
from ..models import FifiUser, Result
from ..serializers import BaseFifiUserSerializer, FifiUserProfileSerializer, ResultList, SaveResult
from ..services import UserServices, ResultServices
from ..utils import FifiUserTokenAuthentication


class UserViewSet(ModelViewSet, ApiBase):
    queryset = FifiUser.objects.all().order_by('-updated_at')
    serializer_class = FifiUserProfileSerializer
    authentication_classes = (FifiUserTokenAuthentication,)

    # services
    fifi_user_services = UserServices()
    result_services = ResultServices()

    @classmethod
    def get_router(cls):
        urlpatterns = [
            url(r'^get_current/$', cls.as_view({
                'get': 'get_current'
            })),
            url(r'^save_result/$', cls.as_view({
                'post': 'save_result'
            })),
            url(r'^get_list_results/$', cls.as_view({
                'get': 'get_list_result'
            })),
        ]

        return urlpatterns


    def get_serializer_class(self):
        if self.action == 'save_result':
            return SaveResult

        return FifiUserProfileSerializer

    def get_current(self, request, *args, **kwargs):
        fifi_user = self.check_anonymous(request)

        result = self.fifi_user_services.get_current(fifi_user)
        return self.as_success(result)

    def save_result(self, request, *args, **kwargs):
        fifi_user = self.check_anonymous(request)

        result = float(request.data['result'])
        episode_id = request.data['episode_id']

        result = self.result_services.save_result(fifi_user, result, episode_id)

        return self.as_success(result)

    def get_list_result(self, request, *args, **kwargs):
        fifi_user = self.check_anonymous(request)

        result = self.result_services.get_list_result(fifi_user)

        return self.as_success(result)

from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny
from django.conf.urls import url

from ..services import AuthServices
from ..serializers import NoneAttributeSerializer, LoginSerializer
from .api_base import ApiBase
from ..utils import FifiUserTokenAuthentication


class AuthViewSet(ModelViewSet, ApiBase):
    # authentication_classes = (AllowAny,)
    permission_classes = (AllowAny,)
    serializer_class = NoneAttributeSerializer
    authentication_classes = (FifiUserTokenAuthentication,)

    auth_services = AuthServices()

    @classmethod
    def get_router(cls):
        urlpatterns = [
            url(r'^get_token/$', cls.as_view({
                'get': 'get_token'
            })),
            url(r'^login/$', cls.as_view({
                'post': 'login'
            })),
            url(r'^logout/$', cls.as_view({
                'get': 'logout'
            })),
        ]
        return urlpatterns

    def get_token(self, request, *args, **kwargs):
        token = self.auth_services.generate_token()

        token = {
            'token': token
        }

        return self.as_success(token)

    def get_serializer_class(self):
        if self.action == 'login':
            return LoginSerializer

        return NoneAttributeSerializer

    def login(self, request, *args, **kwargs):
        username = request.data['username']
        password = request.data['password']

        result = self.auth_services.login(username, password)

        return self.as_success(result)

    def logout(self, request, *args, **kwargs):
        user = self.check_anonymous(request)

        result = self.auth_services.logout(user)

        return self.as_success(result)


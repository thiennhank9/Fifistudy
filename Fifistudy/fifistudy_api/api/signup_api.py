from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny
from django.conf.urls import url, include

from ..models import FifiUser
from ..serializers import BaseFifiUserSerializer, SignupStepOneSerializer, AcitveUserSerializer, \
    SignupStepTwoSerializer, UpdateAvatarSerializer
from ..services import SignupServices
from ..utils import FifiUserTokenAuthentication
from .api_base import ApiBase


class SignupViewSet(ModelViewSet, ApiBase):
    queryset = FifiUser.objects.all().order_by('-updated_at')
    serializer_class = BaseFifiUserSerializer
    authentication_classes = (AllowAny,)

    # services
    signup_services = SignupServices()

    @classmethod
    def get_router(cls):
        urlpatterns = [
            url(r'^signup_step_one/$', cls.as_view({
                'post': 'signup_step_one'
            })),
            url(r'^signup_step_two/$', cls.as_view({
                'post': 'signup_step_two'
            })),
            url(r'^update_avatar/$', cls.as_view({
                'post': 'update_avatar'
            })),
            url(r'^active_user/$', cls.as_view({
                'post': 'active_user'
            })),
        ]

        return urlpatterns

    def get_serializer_class(self):
        if self.action == 'signup_step_one':
            return SignupStepOneSerializer

        if self.action == 'signup_step_two':
            return SignupStepTwoSerializer

        if self.action == 'active_user':
            return AcitveUserSerializer

        if self.action == 'update_avatar':
            return UpdateAvatarSerializer

        return BaseFifiUserSerializer

    def signup_step_one(self, request, *args, **kwargs):
        username = request.data['username']
        password = request.data['password']
        confirm_password = request.data['confirm_password']
        email = request.data['email']

        token = self.signup_services.sign_up_step_one(username, password, confirm_password, email)

        result = {
            'token': token
        }

        return self.as_success(result)

    def active_user(self, request, *args, **kwargs):
        pin = request.data['pin']
        token = FifiUserTokenAuthentication.get_token(request)

        result = self.signup_services.active_user(token, pin)

        return self.as_success(result)

    def signup_step_two(self, request, *args, **kwargs):
        serializer = SignupStepTwoSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        first_name = request.data['first_name']
        last_name = request.data['last_name']
        gender = request.data['gender']
        address = request.data['address']
        birthday = request.data['birthday']
        phone = request.data['phone']

        token = FifiUserTokenAuthentication.get_token(request)

        result = self.signup_services.sign_up_step_two(token, first_name, last_name, gender, address, birthday, phone)

        return self.as_success(result)

    def update_avatar(self, request, *args, **kwargs):
        serializer = UpdateAvatarSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        token = FifiUserTokenAuthentication.get_token(request)

        avatar = request.data['avatar']

        result = self.signup_services.update_avatar(token, avatar)

        return self.as_success(result)



from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny, DjangoModelPermissions
from django.conf.urls import url, include

from .api_base import ApiBase
from ..models import Promote
from ..serializers import BasePromoteSerializer
from ..services import PromoteServices
from ..utils import ExpiringTokenAuthentication, FifiUserTokenAuthentication


class PromoteViewSet(ModelViewSet, ApiBase):
    queryset = Promote.objects.all().order_by('updated_at')
    serializer_class = BasePromoteSerializer
    authentication_classes = (ExpiringTokenAuthentication,)
    permission_classes = (DjangoModelPermissions,)

    # services
    promote_services  = PromoteServices()

    @classmethod
    def get_router(cls):
        urlpatterns = [
            url(r'get_all/$', cls.as_view({'get': 'get_list_for_homepage'})),
        ]

        return urlpatterns

    # this method to choose wherever are not using authentication
    def get_permissions(self):
        if self.action == 'get_list_for_homepage':
            self.permission_classes = (AllowAny,)

        return super(PromoteViewSet, self).get_permissions()

    def get_serializer_class(self):
        return BasePromoteSerializer

    def get_list_for_homepage(self, request, *args, **kwargs):
        result = self.promote_services.get_all_for_homepage()

        return self.as_success(result)
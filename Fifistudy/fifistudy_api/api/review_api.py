from rest_framework.viewsets import ModelViewSet
from django.conf.urls import url

from ..services import ReviewServices
from ..models import Review
from ..serializers import BaseReviewSerializer, SaveReviewSerializer
from .api_base import ApiBase
from ..utils import FifiUserTokenAuthentication


class ReviewViewSet(ModelViewSet, ApiBase):
    queryset = Review.objects.all().order_by('-updated_at')
    serializer_class = BaseReviewSerializer
    authentication_classes = (FifiUserTokenAuthentication,)

    # services
    review_services = ReviewServices()

    @classmethod
    def get_router(cls):
        urlpatterns = [
            url(r'^save/$', cls.as_view({
                'post': 'save_review'
            })),
            url(r'^film/(?P<film_id>[0-9]+)/$', cls.as_view({
                'get': 'get_by_film_id',
                'delete': 'cancel_review',
            })),
        ]

        return urlpatterns

    def get_serializer_class(self):
        if self.action == 'save_review':
            return SaveReviewSerializer

        return BaseReviewSerializer

    def save_review(self, request, *args, **kwargs):
        serializer = SaveReviewSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = self.check_anonymous(request)
        score = request.data['score']
        film_id = request.data['film_id']

        result = self.review_services.save_review(user, score, film_id)

        return self.as_success(result)

    def get_by_film_id(self, request, *args, **kwargs):
        user = self.check_anonymous(request)

        film_id = kwargs['film_id']

        result = self.review_services.get_by_film_id(user, film_id)

        return self.as_success(result)

    def cancel_review(self, request, *args, **kwargs):
        user = self.check_anonymous(request)

        film_id = kwargs['film_id']

        result = self.review_services.cancel_review(user, film_id)

        return self.as_success(result)
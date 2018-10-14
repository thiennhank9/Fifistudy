from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny
from django.conf.urls import url

from ..services import CommentServices
from ..models import Comment
from ..serializers import BaseCommentSerializer, ListCommentSerializer, SaveCommentSerializer, LikeCommentSerializer
from .api_base import ApiBase
from ..utils import FifiUserTokenAuthentication


class CommentViewSet(ModelViewSet, ApiBase):
    queryset = Comment.objects.all().order_by('-updated_at')
    serializer_class = BaseCommentSerializer
    authentication_classes = (FifiUserTokenAuthentication,)

    # services
    comment_services = CommentServices()

    @classmethod
    def get_router(cls):
        urlpatterns = [
            url(r'^film/$', cls.as_view({
                'get': 'get_paging_by_slug'
            })),
            url(r'^film_with_auth/$', cls.as_view({
                'get': 'get_paging_by_slug_with_auth'
            })),
            url(r'^save_comment/$', cls.as_view({
                'post': 'save_comment'
            })),
            url(r'^like_comment/$', cls.as_view({
                'post': 'like_comment'
            })),
        ]

        return urlpatterns

    def get_serializer_class(self):
        if self.action == 'save_comment':
            return SaveCommentSerializer

        if self.action == 'like_comment':
            return LikeCommentSerializer

        return BaseCommentSerializer

    def get_paging_by_slug(self, request, *args, **kwargs):
        slug = request.GET.get('film_slug')

        page = request.GET.get('page')

        if page is None:
            page = 1

        page = int(page)

        result = self.comment_services.get_paging_by_slug(slug, page)

        return self.as_success(result)

    def get_paging_by_slug_with_auth(self, request, *args, **kwargs):
        user = self.check_anonymous(request)
        slug = request.GET.get('film_slug')

        page = request.GET.get('page')

        if page is None:
            page = 1

        page = int(page)

        result = self.comment_services.get_paging_by_slug(slug, page, user)

        return self.as_success(result)

    def save_comment(self, request, *args, **kwargs):
        user = self.check_anonymous(request)

        serializer = SaveCommentSerializer(data=request.data)
        serializer.is_valid()

        content = request.data['content']
        film_id = request.data['film_id']

        result = self.comment_services.save_comment(user, content=content, film_id=film_id)

        return self.as_success(result)

    def like_comment(self, request, *args, **kwargs):
        user = self.check_anonymous(request)

        comment_id = request.data['comment_id']

        result = self.comment_services.like_comment(user, comment_id)

        return self.as_success(result)
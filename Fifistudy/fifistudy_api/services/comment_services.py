from ..adapter import CommentAdapter
from ..infrastructures import ApiCustomException
from ..constant import ErrorDefine
from ..serializers import BaseCommentSerializer, ListCommentSerializer


class CommentServices:
    def __init__(self):
        self.comment_adapter = CommentAdapter()

    def get_paging_by_slug(self, slug, page, user=None):
        comments = self.comment_adapter.get_paging_list_comment_by_slug(slug=slug, page=page, user=user)

        serializer = ListCommentSerializer(comments, many=True)
        return serializer.data

    def save_comment(self, user, content, film_id):
        comment = self.comment_adapter.save_comment(content, user, film_id)

        serializer = BaseCommentSerializer(comment, many=False)

        return serializer.data

    def like_comment(self, user, comment_id):
        result = self.comment_adapter.like_comment(user, comment_id)

        return result
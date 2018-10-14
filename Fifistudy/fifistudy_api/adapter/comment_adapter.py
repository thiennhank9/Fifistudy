from django.db.models import Q, Case, When, Value, Count, BooleanField

from ..models import Comment, Film, FifiUser, UserLikeComment
from ..infrastructures import ApiCustomException
from ..constant import ErrorDefine, Constant


class CommentAdapter:
    def __init__(self):
        self.constant = Constant()

    def is_liked(self, user, comment):
        user_like_comment = UserLikeComment.objects.filter(user_id=user, comment_id=comment)

        if user_like_comment.exists():
            return True

        return False

    # page begin with 1
    def get_paging_list_comment_by_slug(self, slug, page, user=None):
        if user is not None:
            try:
                film = Film.objects.get(slug=slug)

                begin_row = (page-1) * self.constant.PAGE_RECORDS_NUMBER
                end_row = page * self.constant.PAGE_RECORDS_NUMBER

                # comments = Comment.objects.filter(film_id=film).annotate(
                #     is_liked=Case(
                #         When(userlikecomment__user_id=user, then=True),
                #         default=False, output_field=BooleanField()
                #     ),
                # ).order_by('-created_at')[begin_row:end_row]

                comments = Comment.objects.filter(film_id=film).order_by('-created_at')[begin_row:end_row]

                for comment in comments:
                    comment.username = comment.user_id.username
                    comment.avatar = comment.user_id.avatar.url
                    comment.first_name = comment.user_id.first_name
                    comment.last_name = comment.user_id.last_name
                    comment.is_liked = self.is_liked(user, comment)

                return comments
            except Film.DoesNotExist:
                raise ApiCustomException(ErrorDefine.FILM_NOT_FOUND)
        else:
            try:
                film = Film.objects.get(slug=slug)

                begin_row = (page-1) * self.constant.PAGE_RECORDS_NUMBER
                end_row = page * self.constant.PAGE_RECORDS_NUMBER

                comments = Comment.objects.filter(film_id=film).annotate(
                    is_liked=Case(default=False, output_field=BooleanField()),
                ).order_by('-created_at')[begin_row:end_row]

                for comment in comments:
                    comment.username = comment.user_id.username
                    comment.avatar = comment.user_id.avatar.url
                    comment.first_name = comment.user_id.first_name
                    comment.last_name = comment.user_id.last_name

                return comments
            except Film.DoesNotExist:
                raise ApiCustomException(ErrorDefine.FILM_NOT_FOUND)

    def save_comment(self, content, user, film_id):
        try:
            film = Film.objects.get(id=film_id)

            comment = Comment(user_id=user, content=content, film_id=film)
            comment.save()

            return comment
        except Film.DoesNotExist:
            raise ApiCustomException(ErrorDefine.FILM_NOT_FOUND)

    def like_comment(self, user, comment_id):
        try:
            comment = Comment.objects.get(id=comment_id)

            user_like_comment = UserLikeComment.objects.filter(comment_id=comment, user_id=user)

            if user_like_comment.exists():
                user_like_comment.first().delete()

                return 'You unlike success'

            user_like_comment = UserLikeComment(user_id=user, comment_id=comment)
            user_like_comment.save()

            return 'You like comment success'
        except Comment.DoesNotExist:
            raise ApiCustomException(ErrorDefine.COMMENT_NOT_FOUND)

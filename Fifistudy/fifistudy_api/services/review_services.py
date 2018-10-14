from ..models import Review
from ..serializers import BaseReviewSerializer
from ..adapter import ReviewAdapter, AuthUserAdapter


class ReviewServices:
    def __init__(self):
        self.review_adapter = ReviewAdapter()
        self.auth_user_adapter = AuthUserAdapter()

    def save_review(self, user, score, film_id):
        review = self.review_adapter.save_review(user, score, film_id)

        serializer = BaseReviewSerializer(review, many=False)

        return serializer.data

    def get_by_film_id(self, user, film_id):
        review = self.review_adapter.get_by_film_id(user, film_id)

        if review is not None:
            serializer = BaseReviewSerializer(review)

            return serializer.data

        return None

    def cancel_review(self, user, film_id):
        result = self.review_adapter.cancel_review(user, film_id)

        return result

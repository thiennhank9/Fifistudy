from ..models import Review, Film
from ..infrastructures import ApiCustomException
from ..constant import ErrorDefine


class ReviewAdapter:
    def __init__(self):
        pass

    def save_review(self, user, score, film_id):
        try:
            film = Film.objects.get(id=film_id)

            review = Review.objects.filter(user_id=user, film_id=film)

            if review.exists():
                review = review.first()
                review.score = score
                review.save()

                return review

            review = Review(score=score, user_id=user, film_id=film)

            review.save()

            return review
        except Film.DoesNotExist:
            raise ApiCustomException(ErrorDefine.FILM_NOT_FOUND)

    def get_by_film_id(self, user, film_id):
        try:
            film = Film.objects.get(id=film_id)

            review = Review.objects.filter(user_id=user, film_id=film)

            if review.exists():
                return review.first()

            return None

        except Film.DoesNotExist:
            raise ApiCustomException(ErrorDefine.FILM_NOT_FOUND)

    def cancel_review(self, user, film_id):
        try:
            film = Film.objects.get(id=film_id)

            review = Review.objects.get(film_id=film, user_id=user)

            review.delete()

            return 'You cancel review success'
        except Film.DoesNotExist:
            raise ApiCustomException(ErrorDefine.FILM_NOT_FOUND)
        except Review.DoesNotExist:
            raise ApiCustomException(ErrorDefine.USER_NOT_REVIEW)

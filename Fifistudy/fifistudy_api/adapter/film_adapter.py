from django.db.models import Case, When, Value, Count, BooleanField, Q

from ..models import Film, UserSaveFilm, Episode
from ..infrastructures import ApiCustomException
from ..constant import ErrorDefine, Constant


class FilmAdapter:
    def __init__(self):
        self.constant = Constant()

    def is_saved(self, user, film):
        user_save_film = UserSaveFilm.objects.filter(user_id=user, film_id=film)

        if user_save_film.exists():
            return True

        return False

    def calculate_number_record(self, page, page_size):
        begin_record = (page - 1) * page_size
        end_record = page * page_size

        return begin_record, end_record

    def convert_order_by(self, order_by):
        list_order_by = ['updated_at', '-updated_at', 'save_number', '-save_number', 'created_at', '-created_at',
                         'average_score', '-average_score', 'review_number', '-review_number']

        if order_by in list_order_by:
            return order_by

        return '-updated_at'

    def get_list_order_by_view(self, user=None, begin_record=0, end_record=8):
        if user is not None:
            # check if user is not none, we can check that that film user have already saved or not
            # To-Do list
            # duplicate data when UserSaveFilm table has many user save 1 film
            # (if 3 people save 1 film, that film will same 3 times)
            # need to find out why (Now will fix it with easy way but not very performance

            # films = Film.objects.all().annotate(
            #     is_saved=Case(
            #         When(usersavefilm__user_id=user, then=True),
            #         default=False, output_field=BooleanField()
            #     )
            # ).order_by('-view_number', '-updated_at')[begin_record:end_record]

            films = Film.objects.all().order_by('-view_number', '-updated_at')[begin_record:end_record]

            for film in films:
                film .is_saved = self.is_saved(user, film)

            return films
        else:
            films = Film.objects.all().annotate(
                is_saved=Case(default=False, output_field=BooleanField()),
            ).order_by('-view_number', '-updated_at')[begin_record:end_record]

            return films

    def get_list_order_by_updated(self, user=None, begin_record=0, end_record=8):
        if user is not None:
            # check if user is not none, we can check that that film user have already saved or not
            # To-Do list
            # duplicate data when UserSaveFilm table has many user save 1 film
            # (if 3 people save 1 film, that film will same 3 times)
            # need to find out why (Now will fix it with easy way but not very performance

            # films = Film.objects.all().annotate(
            #     is_saved=Case(
            #         When(usersavefilm__user_id=user, then=True),
            #         default=False, output_field=BooleanField()
            #     )
            # ).order_by('-updated_at')[begin_record:end_record]

            films = Film.objects.all().order_by('-updated_at')[begin_record:end_record]

            for film in films:
                film .is_saved = self.is_saved(user, film)

            return films
        else:
            films = Film.objects.all().annotate(
                is_saved=Case(default=False, output_field=BooleanField()),
            ).order_by('-updated_at')[begin_record:end_record]

            return films

    def get_list_order_by_saved_number(self, user=None, begin_record=0, end_record=8):
        if user is not None:
            # duplicate data when UserSaveFilm table has many user save 1 film
            # (if 3 people save 1 film, that film will same 3 times)
            # need to find out why (Now will fix it with easy way but not very performance

            # films = Film.objects.all().annotate(
            #     is_saved=Case(
            #         When(usersavefilm__user_id=user, then=True),
            #         default=False, output_field=BooleanField()
            #     )
            # ).order_by('-save_number', '-updated_at')[begin_record:end_record]

            films = Film.objects.all().order_by('-save_number', '-updated_at')[begin_record:end_record]

            for film in films:
                film .is_saved = self.is_saved(user, film)

            return films
        else:
            films = Film.objects.all().annotate(
                is_saved=Case(default=False, output_field=BooleanField())
            ).order_by('-save_number', '-updated_at')[begin_record:end_record]

            return films

    def get_detail_by_id(self, film_id, user=None):
        if user is not None:
            try:
                film = Film.objects.get(id=film_id)

                episodes = Episode.objects.filter(film_id=film)
                film.episodes = episodes

                user_save_film = UserSaveFilm.objects.filter(film_id=film, user_id=user)

                if user_save_film.exists():
                    film.is_saved = True
                else:
                    film.is_saved = False

                return film
            except Film.DoesNotExist:
                raise ApiCustomException(ErrorDefine.FILM_NOT_FOUND)
        else:
            try:
                film = Film.objects.get(id=film_id)

                episodes = Episode.objects.filter(film_id=film)
                film.episodes = episodes

                film.is_saved = False

                return film
            except Film.DoesNotExist:
                raise ApiCustomException(ErrorDefine.FILM_NOT_FOUND)

    def get_detail_by_slug(self, slug, user=None):
        if user is not None:
            try:
                film = Film.objects.get(slug=slug)

                episodes = Episode.objects.filter(film_id=film)
                film.episodes = episodes

                user_save_film = UserSaveFilm.objects.filter(film_id=film, user_id=user)

                if user_save_film.exists():
                    film.is_saved = True
                else:
                    film.is_saved = False

                return film
            except Film.DoesNotExist:
                raise ApiCustomException(ErrorDefine.FILM_NOT_FOUND)
        else:
            try:
                film = Film.objects.get(slug=slug)

                episodes = Episode.objects.filter(film_id=film)
                film.episodes = episodes

                film.is_saved = False

                return film
            except Film.DoesNotExist:
                raise ApiCustomException(ErrorDefine.FILM_NOT_FOUND)

    def get_list_by_difficult_level(self, difficult_level, begin_row=0, end_row=6):
        films = Film.objects.filter(difficult_level=difficult_level)[begin_row:end_row]

        return films

    def user_save_film(self, user, film_id):
        try:
            film = Film.objects.get(id=film_id)

            user_save_film = UserSaveFilm.objects.filter(film_id=film, user_id=user)

            if user_save_film.exists():
                user_save_film.first().delete()

                return None

            user_save_film = UserSaveFilm(user_id=user, film_id=film)
            user_save_film.save()

            return user_save_film
        except Film.DoesNotExist:
            raise ApiCustomException(ErrorDefine.FILM_NOT_FOUND)

    def get_list_user_save_film(self, user):
        user_save_film = UserSaveFilm.objects.filter(user_id=user)

        for film in user_save_film:
            film.film_detail = film.film_id

        return user_save_film

    def search_film_by_key(self, user=None, search_key='', page=1, page_size=Constant.PAGE_RECORDS_NUMBER,
                           order_by='-updated_at'):
        begin_record, end_record = self.calculate_number_record(page=page, page_size=page_size)
        order_by = self.convert_order_by(order_by)

        if user is not None:
            films = Film.objects.filter(
                Q(english_name__icontains=search_key) |
                Q(vietnamese_name__icontains=search_key)
            ).order_by(order_by)

            record_number = films.count()

            films = films[begin_record:end_record]

            # Check if has_more records
            has_more = False

            if end_record < record_number:
                has_more = True
            # End check if has more records

            for film in films:
                film.is_saved = self.is_saved(user, film)

            return films, record_number, has_more
        else:
            films = Film.objects.filter(
                Q(english_name__icontains=search_key) |
                Q(vietnamese_name__icontains=search_key)
            ).annotate(
                is_saved=Case(default=False, output_field=BooleanField()),
            ).order_by(order_by)

            record_number = films.count()

            films = films[begin_record:end_record]

            # Check if has_more records
            has_more = False

            if end_record < record_number:
                has_more = True
            # End check if has more records

            return films, record_number, has_more


from ..models import Film
from ..serializers import BaseFilmSerializer, HomepageListFilmSerializer, FilmDetailSerializer, \
    BaseUserSaveFilmSerializer, ListUserSaveFilm, SearchListFilmSerializer
from ..adapter import FilmAdapter
from ..infrastructures import ApiCustomException
from ..constant import ErrorDefine, Constant


class FilmServices:
    def __init__(self):
        self.film_adapter = FilmAdapter()
        self.constant = Constant()

    def convert_valid_search_key(self, search_key):
        if search_key is None:
            return ''

        return search_key

    def check_valid_paging(self, page, page_size):
        try:
            if page is None:
                page = 1

            page = int(page)
        except ValueError:
            raise ApiCustomException(ErrorDefine.PAGE_INVALID_TYPE)

        try:
            if page_size is None:
                page_size = Constant.PAGE_RECORDS_NUMBER

            page_size = int(page_size)
        except ValueError:
            raise ApiCustomException(ErrorDefine.PAGE_SIZE_INVALID_TYPE)

        return page, page_size

    def check_valid_order_by(self, order_by):
        if order_by is None:
            return '-updated_at'

        return order_by

    def get_list_order_by_view(self, user=None):
        films = self.film_adapter.get_list_order_by_view(user=user)

        serializer = HomepageListFilmSerializer(films, many=True)

        return serializer.data

    def get_list_order_by_save_number(self, user=None):
        films = self.film_adapter.get_list_order_by_saved_number(user=user)

        serializer = HomepageListFilmSerializer(films, many=True)

        return serializer.data

    def get_list_order_by_updated(self, user=None):
        films = self.film_adapter.get_list_order_by_updated(user=user)

        serializer = HomepageListFilmSerializer(films, many=True)

        return serializer.data

    def get_detail_by_id(self, film_id, user=None):
        film = self.film_adapter.get_detail_by_id(film_id=film_id, user=user)

        serializer = FilmDetailSerializer(film, many=False)

        return serializer.data

    def get_detail_by_slug(self, slug, user=None):
        film = self.film_adapter.get_detail_by_slug(slug, user)
        serializer = FilmDetailSerializer(film, many=False)

        return serializer.data

    def get_list_by_difficult_level(self, difficult_level):
        films = self.film_adapter.get_list_by_difficult_level(difficult_level=difficult_level)

        serializer = BaseFilmSerializer(films, many=True)

        return serializer.data

    def user_save_film(self, user, film_id):
        user_save_film = self.film_adapter.user_save_film(user, film_id)

        if user_save_film is None:
            return 'You remove film from your save list success'

        serializer = BaseUserSaveFilmSerializer(user_save_film)

        return serializer.data

    def get_list_user_save_film(self, user):
        user_save_film = self.film_adapter.get_list_user_save_film(user)

        serializer = ListUserSaveFilm(user_save_film, many=True)

        return serializer.data

    def search_film_by_key(self, user=None, search_key='', page=1, page_size=10, order_by='-updated_at'):
        search_key = self.convert_valid_search_key(search_key)
        page, page_size = self.check_valid_paging(page, page_size)
        order_by = self.check_valid_order_by(order_by)

        films, record_number, has_more = self.film_adapter.search_film_by_key(user=user, search_key=search_key,
                                                                              page=page, page_size=page_size,
                                                                              order_by=order_by)

        list_films = {
            'films': films,
            'page': page,
            'page_size': page_size,
            'record_number': record_number,
            'has_more': has_more
        }

        serializer = SearchListFilmSerializer(list_films)

        return serializer.data





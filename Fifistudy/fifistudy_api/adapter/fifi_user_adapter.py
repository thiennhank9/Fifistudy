from django.db.models import Q
import datetime

from ..models import FifiUser
from ..infrastructures import ApiCustomException
from ..constant import ErrorDefine


class FifiUserAdapter:
    def __init__(self):
        pass

    def login(self, username, password):
        try:
            user = FifiUser.objects.get(Q(username=username) | Q(email=username))

            if user.password != password:
                raise ApiCustomException(ErrorDefine.LOGIN_FAIL)

            if user.status == 0:
                raise ApiCustomException(ErrorDefine.USER_INACTIVE)

            user.last_login = datetime.datetime.utcnow()
            user.save()

            return user
        except FifiUser.DoesNotExist:
            raise ApiCustomException(ErrorDefine.LOGIN_FAIL)

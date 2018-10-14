from ..infrastructures import ApiCustomException
from ..constant import ErrorDefine
from ..adapter import FifiUserAdapter
from ..serializers import FifiUserProfileSerializer


class UserServices:
    def __init__(self):
        pass

    def get_current(self, fifi_user):
        serializer = FifiUserProfileSerializer(fifi_user)

        return serializer.data

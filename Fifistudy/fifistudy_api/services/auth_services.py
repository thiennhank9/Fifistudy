from random import randint
import datetime, time

from ..utils import hash_sha256
from ..adapter import FifiUserAdapter, AuthUserAdapter


class AuthServices:
    def __init__(self):
        self.fifi_user_adapter = FifiUserAdapter()
        self.auth_user_adapter = AuthUserAdapter()

    def generate_token(self):
        ts = time.gmtime()

        base_token = '{}{}{}'.format('FIFISTUDY-', str(ts), str(randint(1000, 9999)))
        token = hash_sha256(base_token)

        return token

    def login(self, username, password):
        user = self.fifi_user_adapter.login(username=username, password=password)

        token = self.generate_token()

        auth_user = self.auth_user_adapter.create_or_update(user=user, token=token)

        result = {
            'token': auth_user.token
        }

        return result

    def logout(self, user):
        result = self.auth_user_adapter.delete_by_user(user)

        return result
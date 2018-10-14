from ..adapter import SignupAdapter, AuthUserAdapter
from ..models import FifiUser
from ..serializers import BaseFifiUserSerializer, BaseUserSerializer
from .auth_services import AuthServices
from .mail_services import EmailServices


class SignupServices:
    def __init__(self):
        self.signup_adapter = SignupAdapter()
        self.auth_services = AuthServices()
        self.auth_user_adapter = AuthUserAdapter()
        self.email_services = EmailServices()

    def sign_up_step_one(self, username, password, confirm_password, email):
        user = self.signup_adapter.signup_step_one(username, password, confirm_password, email)

        token = self.auth_services.generate_token()

        auth_user = self.auth_user_adapter.create_or_update(user, token)

        pin = self.email_services.send_pin(email)

        self.signup_adapter.add_pin_to_verify(user, pin)

        return auth_user.token

    def sign_up_step_two(self, token, first_name, last_name, gender, address, birthday, phone):
        auth_user = self.auth_user_adapter.get_by_token(token)

        user = self.signup_adapter.signup_step_two(auth_user.user_id, first_name, last_name, gender, address,
                                                   birthday, phone)

        serializer = BaseUserSerializer(user)

        return serializer.data

    def update_avatar(self, token, avatar):
        auth_user = self.auth_user_adapter.get_by_token(token)

        user = self.signup_adapter.update_avatar(auth_user.user_id, avatar)

        serializer = BaseUserSerializer(user, many=False)

        return serializer.data

    def active_user(self, token, pin):
        auth_user = self.auth_user_adapter.get_by_token(token)

        result = self.signup_adapter.active_user(auth_user.user_id, pin)

        return result

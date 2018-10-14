from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from django.db.models import Q

from ..models import FifiUser, AuthUser
from ..serializers import SignupStepTwoSerializer
from ..infrastructures import ApiCustomException, ApiErrorMessage
from ..constant import ErrorDefine


class SignupAdapter:
    def __init__(self):
        pass

    def check_unique(self, username, email):
        users = FifiUser.objects.filter(username=username)

        if users.exists():
            raise ApiCustomException(ErrorDefine.USER_USERNAME_EXIST)

        users = FifiUser.objects.filter(email=email)

        if users.exists():
            raise ApiCustomException(ErrorDefine.USER_EMAIL_EXIST)

        try:
            validate_email(email)

        except ValidationError as e:
            api_error_message = ApiErrorMessage(e.message, 9999)
            raise ApiCustomException(api_error_message)

    def check_valid_gender(self, gender):
        if gender != 1 and gender != 0:
            raise ApiCustomException(ErrorDefine.GENDER_INVALID)

    def signup_step_one(self, username, password, confirm_password, email):
        self.check_unique(username, email)

        if password != confirm_password:
            raise ApiCustomException(ErrorDefine.PASSWORD_DO_NOT_MATCH_CONFIRM_PASSWORD)

        status = 0
        # role 2 is normal user, 1 is admin user
        role = 2

        user = FifiUser(username=username, password=password, email=email, status=status, role=role)

        user.save()

        return user

    def add_pin_to_verify(self, user, pin):
        user.pin = pin
        user.save()

    def signup_step_two(self, user, first_name, last_name, gender, address, birthday, phone):
        self.check_valid_gender(gender)

        user.first_name = first_name
        user.last_name = last_name
        user.gender = gender
        user.address = address
        user.birthday = birthday
        user.phone = phone

        user.save()

        return user

    def update_avatar(self, user, avatar):
        user.avatar = avatar
        user.save()

        return user

    def active_user(self, user, pin):
        if user.pin == pin:

            if user.status == 1:
                user.pin = None
                user.save()
                raise ApiCustomException(ErrorDefine.USER_ALREADY_ACTIVE)

            user.pin = None
            user.status = 1

            user.save()

            return 'User active successful'

        raise ApiCustomException(ErrorDefine.PIN_INCORRECT)



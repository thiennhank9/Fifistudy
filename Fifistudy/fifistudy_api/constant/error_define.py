from ..infrastructures import ApiErrorMessage


class ErrorDefine:
    def __init__(self):
        pass

    # Error Default: 9999

    # Error Auth: 10xx
    LOGIN_FAIL = ApiErrorMessage('login fail', 1000)
    INVALID_TOKEN = ApiErrorMessage('Invalid token', 1001)
    USER_INACTIVE = ApiErrorMessage('User inactive or deleted', 1002)
    TOKEN_EXPIRED = ApiErrorMessage('Token has expired', 1003)
    USER_NOT_FOUND = ApiErrorMessage('User not found', 1004)
    USER_ALREADY_EXISTS = ApiErrorMessage('User have already existed', 1005)
    MISSING_TOKEN = ApiErrorMessage('Missing token', 1006)

    # Error film: 11xx
    FILM_NOT_FOUND = ApiErrorMessage('Film not found', 1100)

    # Error User: 12xx
    USER_USERNAME_EXIST = ApiErrorMessage('Username have already existed', 1200)
    USER_EMAIL_EXIST = ApiErrorMessage('Email have already existed', 1201)
    PASSWORD_DO_NOT_MATCH_CONFIRM_PASSWORD = ApiErrorMessage('Password does not match confirm password', 1202)
    PIN_INCORRECT = ApiErrorMessage('Pin incorrect', 1203)
    USER_ALREADY_ACTIVE = ApiErrorMessage('User alreay active', 1204)
    GENDER_INVALID = ApiErrorMessage('Use\'s gender invalid', 1205)

    # Error Comment: 13xx
    COMMENT_NOT_FOUND = ApiErrorMessage('Comment not found', 1300)

    # Error Review: 14xx
    USER_NOT_REVIEW = ApiErrorMessage('User haven\'t review this film', 1400)

    # Error Episode: 15xx
    EPISODE_NOT_EXIST = ApiErrorMessage('Episode does not exist', 1500)
    EPISODE_NOT_FOUND = ApiErrorMessage('Episode does not found', 1501)

    # Error Vocabulary: 16xx
    USER_SAVE_VOCABULARY_NOT_FOUND = ApiErrorMessage('User save vocabulary not found', 1600)
    YOUR_ROLE_IS_NOT_ALLOW_TO_DELETE = ApiErrorMessage('Your role is not allow to delete this vocabulary', 1601)

    # ValueError: 80xx
    PAGE_INVALID_TYPE = ApiErrorMessage('Page value must be number', 8000)
    PAGE_SIZE_INVALID_TYPE = ApiErrorMessage('Page size must be number', 8001)



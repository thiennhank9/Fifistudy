from .film_serializer import BaseFilmSerializer, HomepageListFilmSerializer, FilmDetailSerializer, ListUserSaveFilm, \
    SearchListFilmSerializer
from .promote_serializer import BasePromoteSerializer, ListPromoteSerializer

# test serializer (NoneAttribute serializer)
from .test_serializer import NoneAttributeSerializer
from .fifi_user_serializer import BaseFifiUserSerializer, LoginSerializer, FifiUserProfileSerializer
from .actor_serializer import BaseActorSerializer, BaseFilmHasActorSerializer, ListFilmHasActorSerializer
from .comment_serializer import BaseCommentSerializer, ListCommentSerializer, SaveCommentSerializer, \
    LikeCommentSerializer
from .episode_serializer import BaseEpisodeSerializer
from .signup_serializer import SignupStepOneSerializer, AcitveUserSerializer, SignupStepTwoSerializer, \
    BaseUserSerializer, UpdateAvatarSerializer
from .review_serializer import BaseReviewSerializer, SaveReviewSerializer
from .user_save_film_serializer import BaseUserSaveFilmSerializer, UserSaveFilmSerializer
from .episode_serializer import BaseEpisodeSerializer, BaseUserWatchEpisodeSerializer, EpisodeDetailSerializer, \
    SaveUserWatchEpisodeSerializer
from .vocabulary_serializer import BaseVocabularySerializer, BaseUserSaveVocabularySerializer, \
    ListUserSaveVocabularySerializer, SaveVocabularySerializer, UpdateVocabularySerializer
from .quizz_serializer import BaseQuizzSerializer, QuizzSerializer, QuizzCombineSerializer
from .result_serializer import SaveResult, ResultList





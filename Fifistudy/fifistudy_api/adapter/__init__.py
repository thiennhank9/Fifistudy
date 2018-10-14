# this adapter use for connecting with the databse and the object that we want to use for services layer
# connnect save, get, update, delete database is what this layer 's job
from .film_adapter import FilmAdapter
from .promote_adapter import PromoteAdapter
from .fifi_user_adapter import FifiUserAdapter
from .auth_user_adapter import AuthUserAdapter
from .actor_adapter import ActorAdapter
from .comment_adapter import CommentAdapter
from .signup_adapter import SignupAdapter
from .review_adapter import ReviewAdapter
from .episode_adapter import EpisodeAdapter
from .vocabulary_adapter import VocabularyAdapter
from .quizz_adapter import QuizzAdapter


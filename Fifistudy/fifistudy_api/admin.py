# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin

from .models import Actor, Answer, AuthUser, Blog, Category, Comment, CommentBlog, Episode, FifiUser, Film, FilmBelongToType,\
    FilmHasActor, Note, Promote, Quizz, Review, Type, UserLikeComment, UserSaveFilm, UserSaveVocabulary, \
    UserWatchEpisode, Vocabulary, Result

# Register your models here.
admin.site.register(Actor)
admin.site.register(Answer)
admin.site.register(AuthUser)
admin.site.register(Blog)
admin.site.register(Category)
admin.site.register(Comment)
admin.site.register(CommentBlog)
admin.site.register(Episode)
admin.site.register(FifiUser)
admin.site.register(Film)
admin.site.register(FilmBelongToType)
admin.site.register(FilmHasActor)
admin.site.register(Note)
admin.site.register(Promote)
admin.site.register(Quizz)
admin.site.register(Review)
admin.site.register(Type)
admin.site.register(UserLikeComment)
admin.site.register(UserSaveFilm)
admin.site.register(UserSaveVocabulary)
admin.site.register(UserWatchEpisode)
admin.site.register(Vocabulary)
admin.site.register(Result)

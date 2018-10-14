export const MAX_PAGE = 5

export const MAX_PAGE_LIST = 4

export const ORDER_BY = {
    updateAtIncrease: 'updated_at',
    updateAtReduce: '-updated_at',
    saveNumberIncrease: 'save_number',
    saveNumberReduce: '-save_number',
    createdAtIncrease: 'created_at',
    createdAtReduce: '-created_at',
    averageScoreIncrease: 'average_score',
    averageScoreReduce: '-average_score',
    reviewNumberIncrease: 'review_number',
    reviewNumberReduce: '-review_number'
}
export const API_PATH = {
    getPromote: `/api/promotes/get_all/`,
    getLastest: `/api/films/get_all_order_by_updated/`,
    getLastestWithAuth: `/api/films/get_all_order_by_updated_with_auth/`,
    // get
    getMostView: `/api/films/get_all_order_by_view/`,
    getMostViewWithAuth: `/api/films/get_all_order_by_view_with_auth/`,

    getFilm: (slug) => {
        return `/api/films/detail/slug/?film_slug=${slug}`
    },
    getFilmWithAuth: (slug) => {
        return `/api/films/detail_with_auth/slug/?film_slug=${slug}`
    },
    getEpisode: (filmSlug, episodeId) => {
        return `/api/episodes/detail/?film_slug=${filmSlug}&episode_number=${episodeId}`
    },
    getActor: (slug) => `/api/actor/film/?film_slug=${slug}`,
    postSignUpOne: `/api/signup/signup_step_one/`,
    postSignUpTwo: `/api/signup/active_user/`,
    postUpdateUserInfo: `/api/signup/signup_step_two/`,
    postUpdateAvatar: `/api/signup/update_avatar/`,
    getUserInfo: `/api/fifi_user/get_current/`,
    postLogin: `/api/auth/login/`,
    getLogout: `/api/auth/logout/`,
    postUserSaveFilm: `/api/films/save_film/`,
    getUserSaveFilm: `/api/films/save_film/`,
    postComment: `/api/comments/save_comment/`,

    getComment: (slug) => {
        return `/api/comments/film/?film_slug=${slug}`
    },
    getCommentWithAuth: (slug) => {
        return `/api/comments/film_with_auth/?film_slug=${slug}`
    },
    postLikeComment: `/api/comments/like_comment/`,
    getFilmByDifficult: (difficultLevel) => `/api/films/get_list_by_difficult_level/${difficultLevel}`,
    postSaveVocabulary: `/api/vocabularies/save_vocabulary/`,
    getVocabulary: `/api/vocabularies/list_vocabulary/`,
    deleteVocabulary: (vocabularyId) => `/api/vocabularies/delete_vocabulary/${vocabularyId}/`,
    putEditVocabulary: (userSaveVocabularyId) => `/api/vocabularies/update_vocabulary/${userSaveVocabularyId}/`,
    getSearch: (searchKey, orderBy, pageNumber, pageSize = MAX_PAGE) => `/api/films/search_film_by_key/?search_key=${searchKey}&order_by=${orderBy}&page_size=${pageSize}&page=${pageNumber}`,
    getSearchWithAuth: (searchKey, orderBy, pageNumber, pageSize = MAX_PAGE) => `/api/films/search_film_by_key_with_auth/?search_key=${searchKey}&order_by=${orderBy}&page_size=${pageSize}&page=${pageNumber}`,
    postReviewFilm: `/api/reviews/save/`,
    getReviewFilm: (filmId) => `/api/reviews/film/${filmId}/`,
    getQuizz:(episodeId)=>`/api/episodes/quizz/${episodeId}/`

}

// slug/?film_slug=<slug></slug>